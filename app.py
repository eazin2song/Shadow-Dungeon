import json
import random
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from game_config import ENEMIES, BOSSES, ITEMS, PLAYER_BASE_STATS, RARITY_NAMES
from models import save_game, load_game, list_saves, get_leaderboard

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

rooms = {}

def calc_damage(atk, defender_def):
    base = max(1, atk - defender_def // 2)
    variance = 0.8 + random.random() * 0.4
    return max(1, int(base * variance))

def exp_for_level(level):
    return 20 * level * level + 10

def create_new_player(name):
    return {
        'player_id': name.lower().replace(' ', '_'),
        'name': name,
        'level': 1,
        'exp': 0,
        'exp_to_next': exp_for_level(1),
        'current_hp': PLAYER_BASE_STATS['hp'],
        'max_hp': PLAYER_BASE_STATS['hp'],
        'atk': PLAYER_BASE_STATS['atk'],
        'def': PLAYER_BASE_STATS['def'],
        'spd': PLAYER_BASE_STATS['spd'],
        'floor': 1,
        'gold': 0,
        'equipment': {'weapon': None, 'armor': None, 'accessory': None},
        'inventory': [
            {'item_id': 'potion_small', 'name': '小治疗药水', 'type': 'consumable', 'heal': 30},
            {'item_id': 'potion_small', 'name': '小治疗药水', 'type': 'consumable', 'heal': 30},
        ],
    }

@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('../frontend', path)

@app.route('/api/new_game', methods=['POST'])
def new_game():
    data = request.get_json()
    name = data.get('name', '勇者')
    player = create_new_player(name)
    save_game(player['player_id'], player)
    return jsonify({'success': True, 'player': player})

@app.route('/api/save', methods=['POST'])
def save():
    data = request.get_json()
    player_id = data.get('player_id')
    if not player_id:
        return jsonify({'success': False, 'error': '缺少player_id'}), 400
    save_game(player_id, data)
    return jsonify({'success': True})

@app.route('/api/load/<player_id>', methods=['GET'])
def load(player_id):
    data = load_game(player_id)
    if data is None:
        return jsonify({'success': False, 'error': '存档不存在'}), 404
    return jsonify({'success': True, 'player': data})

@app.route('/api/saves', methods=['GET'])
def saves_list():
    return jsonify({'success': True, 'saves': list_saves()})

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    return jsonify({'success': True, 'leaderboard': get_leaderboard()})

@app.route('/api/config', methods=['GET'])
def get_config():
    return jsonify({
        'enemies': ENEMIES,
        'bosses': BOSSES,
        'items': ITEMS,
        'base_stats': PLAYER_BASE_STATS,
        'rarity_names': RARITY_NAMES,
    })

@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    return jsonify({'success': True, 'rooms': []})

@app.route('/api/battle', methods=['POST'])
def battle():
    data = request.get_json()
    player = data.get('player')
    enemy_data = data.get('enemy')
    action = data.get('action', 'attack')
    item_slot = data.get('item_slot', -1)

    if not player or not enemy_data:
        return jsonify({'success': False, 'error': '缺少战斗数据'}), 400

    result = {
        'player': dict(player),
        'enemy': dict(enemy_data),
        'log': [],
        'battle_over': False,
        'player_win': False,
    }

    p = result['player']
    e = result['enemy']

    if action == 'flee':
        flee_chance = 40 + int((p['spd'] - e['spd']) * 5)
        flee_chance = max(10, min(90, flee_chance))
        if random.randint(1, 100) <= flee_chance:
            result['log'].append('你成功逃跑了！')
            result['battle_over'] = True
            result['player_fled'] = True
            return jsonify({'success': True, 'result': result})
        else:
            result['log'].append('逃跑失败！')

    if action == 'use_item' and 0 <= item_slot < len(p.get('inventory', [])):
        item = p['inventory'][item_slot]
        if item.get('type') == 'consumable' and 'heal' in item:
            heal = item['heal']
            p['current_hp'] = min(p['max_hp'], p['current_hp'] + heal)
            p['inventory'].pop(item_slot)
            result['log'].append(f'使用了{item["name"]}，恢复{heal}HP！')
        else:
            result['log'].append('无法使用该道具！')

    player_defending = (action == 'defend')
    if player_defending:
        result['log'].append('你摆出防御姿态！')

    player_first = p['spd'] >= e['spd']

    def enemy_attack():
        dmg = calc_damage(e['atk'], p['def'])
        if player_defending:
            dmg = dmg // 2
        p['current_hp'] = max(0, p['current_hp'] - dmg)
        result['log'].append(f'{e["name"]}造成{dmg}点伤害！')

    def player_attack():
        dmg = calc_damage(p['atk'], e['def'])
        e['current_hp'] = max(0, e['current_hp'] - dmg)
        result['log'].append(f'你造成{dmg}点伤害！')

    if player_first:
        if action == 'attack':
            player_attack()
        if e['current_hp'] > 0:
            enemy_attack()
    else:
        enemy_attack()
        if p['current_hp'] > 0 and action == 'attack':
            player_attack()

    if p['current_hp'] <= 0:
        result['battle_over'] = True
        result['player_win'] = False
        result['log'].append('你被击败了...')
    elif e['current_hp'] <= 0:
        result['battle_over'] = True
        result['player_win'] = True
        exp_gain = e.get('exp_reward', 10)
        gold_gain = e.get('gold_reward', 5)
        p['exp'] += exp_gain
        p['gold'] += gold_gain
        result['log'].append(f'胜利！获得{exp_gain}经验，{gold_gain}金币！')

        while p['exp'] >= p['exp_to_next']:
            p['exp'] -= p['exp_to_next']
            p['level'] += 1
            p['max_hp'] += PLAYER_BASE_STATS['hp_growth']
            p['current_hp'] = p['max_hp']
            p['atk'] += PLAYER_BASE_STATS['atk_growth']
            p['def'] += PLAYER_BASE_STATS['def_growth']
            p['spd'] += PLAYER_BASE_STATS['spd_growth']
            p['exp_to_next'] = exp_for_level(p['level'])
            result['log'].append(f'升级了！当前等级{p["level"]}！')

    return jsonify({'success': True, 'result': result})

@app.route('/api/shop/buy', methods=['POST'])
def shop_buy():
    data = request.get_json()
    player = data.get('player')
    item_id = data.get('item_id')

    if not player or not item_id:
        return jsonify({'success': False, 'error': '缺少数据'}), 400

    item_template = ITEMS.get(item_id)
    if not item_template:
        return jsonify({'success': False, 'error': '物品不存在'}), 404

    price = item_template['price']
    if player['gold'] < price:
        return jsonify({'success': False, 'error': '金币不足'}), 400

    player['gold'] -= price
    new_item = {
        'item_id': item_id,
        'name': item_template['name'],
        'type': item_template['type'],
    }
    for k, v in item_template.items():
        if k not in ('name', 'type', 'price', 'rarity'):
            new_item[k] = v
    new_item['rarity'] = item_template.get('rarity', 1)
    player['inventory'].append(new_item)

    return jsonify({'success': True, 'player': player})

@app.route('/api/shop/sell', methods=['POST'])
def shop_sell():
    data = request.get_json()
    player = data.get('player')
    slot = data.get('slot', -1)

    if not player or slot < 0 or slot >= len(player.get('inventory', [])):
        return jsonify({'success': False, 'error': '无效的物品栏位'}), 400

    item = player['inventory'][slot]
    item_template = ITEMS.get(item.get('item_id'), {})
    sell_price = item_template.get('price', 10) // 2

    player['gold'] += sell_price
    player['inventory'].pop(slot)

    return jsonify({'success': True, 'player': player, 'gold_earned': sell_price})

@socketio.on('connect')
def handle_connect():
    print(f'Client connected: {request.sid}')

@socketio.on('disconnect')
def handle_disconnect():
    sid = request.sid
    for room_id, room in list(rooms.items()):
        if sid in room['players']:
            player_name = room['players'][sid]['name']
            del room['players'][sid]
            leave_room(room_id)
            emit('player_left', {'name': player_name, 'players': get_room_players(room_id)}, room=room_id)
            if not room['players']:
                del rooms[room_id]
            elif room['host'] == sid:
                new_host = list(room['players'].keys())[0]
                room['host'] = new_host
                emit('new_host', {'sid': new_host}, room=room_id)
            break

@socketio.on('create_room')
def handle_create_room(data):
    room_id = str(uuid.uuid4())[:8]
    room_name = data.get('name', '冒险者的房间')
    max_players = min(max(data.get('max_players', 4), 2), 8)
    player_name = data.get('player_name', '玩家')
    character = data.get('character', 'warrior')

    rooms[room_id] = {
        'id': room_id,
        'name': room_name,
        'host': request.sid,
        'max_players': max_players,
        'floor': 1,
        'status': 'waiting',
        'players': {
            request.sid: {
                'name': player_name,
                'character': character,
                'ready': False,
                'x': 0,
                'y': 0,
                'hp': 100,
                'max_hp': 100,
            }
        }
    }

    join_room(room_id)
    emit('room_created', {'room_id': room_id, 'room': get_room_info(room_id)})

@socketio.on('join_room')
def handle_join_room(data):
    room_id = data.get('room_id')
    player_name = data.get('player_name', '玩家')
    character = data.get('character', 'warrior')

    if room_id not in rooms:
        emit('error', {'message': '房间不存在'})
        return

    room = rooms[room_id]
    if len(room['players']) >= room['max_players']:
        emit('error', {'message': '房间已满'})
        return

    if room['status'] != 'waiting':
        emit('error', {'message': '游戏已开始'})
        return

    room['players'][request.sid] = {
        'name': player_name,
        'character': character,
        'ready': False,
        'x': 0,
        'y': 0,
        'hp': 100,
        'max_hp': 100,
    }

    join_room(room_id)
    emit('room_joined', {'room_id': room_id, 'room': get_room_info(room_id)})
    emit('player_joined', {'name': player_name, 'players': get_room_players(room_id)}, room=room_id)

@socketio.on('leave_room')
def handle_leave_room(data):
    room_id = data.get('room_id')
    if room_id not in rooms:
        return

    room = rooms[room_id]
    if request.sid in room['players']:
        player_name = room['players'][request.sid]['name']
        del room['players'][request.sid]
        leave_room(room_id)
        emit('left_room')
        emit('player_left', {'name': player_name, 'players': get_room_players(room_id)}, room=room_id)

        if not room['players']:
            del rooms[room_id]
        elif room['host'] == request.sid:
            new_host = list(room['players'].keys())[0]
            room['host'] = new_host
            emit('new_host', {'sid': new_host}, room=room_id)

@socketio.on('player_ready')
def handle_player_ready(data):
    room_id = data.get('room_id')
    if room_id not in rooms:
        return

    room = rooms[room_id]
    if request.sid in room['players']:
        room['players'][request.sid]['ready'] = True
        emit('player_ready', {'players': get_room_players(room_id)}, room=room_id)

@socketio.on('start_game')
def handle_start_game(data):
    room_id = data.get('room_id')
    if room_id not in rooms:
        return

    room = rooms[room_id]
    if room['host'] != request.sid:
        emit('error', {'message': '只有房主可以开始游戏'})
        return

    all_ready = all(p['ready'] for p in room['players'].values())
    if not all_ready and len(room['players']) > 1:
        emit('error', {'message': '还有玩家未准备'})
        return

    room['status'] = 'playing'
    emit('game_started', {'room': get_room_info(room_id)}, room=room_id)

@socketio.on('player_update')
def handle_player_update(data):
    room_id = data.get('room_id')
    if room_id not in rooms:
        return

    room = rooms[room_id]
    if request.sid in room['players']:
        player = room['players'][request.sid]
        for key in ['x', 'y', 'hp', 'max_hp']:
            if key in data:
                player[key] = data[key]
        emit('player_updated', {'sid': request.sid, **player}, room=room_id, include_self=False)

@socketio.on('chat_message')
def handle_chat_message(data):
    room_id = data.get('room_id')
    message = data.get('message', '')
    if room_id not in rooms:
        return

    room = rooms[room_id]
    if request.sid in room['players']:
        player_name = room['players'][request.sid]['name']
        emit('chat_message', {'name': player_name, 'message': message}, room=room_id)

def get_room_info(room_id):
    room = rooms.get(room_id)
    if not room:
        return None
    return {
        'id': room['id'],
        'name': room['name'],
        'host': room['host'],
        'max_players': room['max_players'],
        'floor': room['floor'],
        'status': room['status'],
        'players': get_room_players(room_id),
    }

def get_room_players(room_id):
    room = rooms.get(room_id)
    if not room:
        return {}
    return {sid: {k: v for k, v in p.items()} for sid, p in room['players'].items()}

if __name__ == '__main__':
    print('========================================')
    print('  暗影地牢 - Shadow Dungeon Server')
    print('  http://localhost:5000')
    print('========================================')
    socketio.run(app, host='0.0.0.0', port=5000, debug=False, allow_unsafe_werkzeug=True)
