import json
import os

SAVE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'saves')


def ensure_save_dir():
    os.makedirs(SAVE_DIR, exist_ok=True)


def save_game(player_id, data):
    ensure_save_dir()
    filepath = os.path.join(SAVE_DIR, f'{player_id}.json')
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return True


def load_game(player_id):
    filepath = os.path.join(SAVE_DIR, f'{player_id}.json')
    if not os.path.exists(filepath):
        return None
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)


def list_saves():
    ensure_save_dir()
    saves = []
    for filename in os.listdir(SAVE_DIR):
        if filename.endswith('.json'):
            filepath = os.path.join(SAVE_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                saves.append({
                    'player_id': data.get('player_id', filename.replace('.json', '')),
                    'name': data.get('name', '无名'),
                    'floor': data.get('floor', 1),
                    'level': data.get('level', 1),
                })
    return saves


def get_leaderboard():
    ensure_save_dir()
    entries = []
    for filename in os.listdir(SAVE_DIR):
        if filename.endswith('.json'):
            filepath = os.path.join(SAVE_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
                entries.append({
                    'player_id': data.get('player_id', 'unknown'),
                    'name': data.get('name', '无名'),
                    'floor': data.get('floor', 1),
                    'level': data.get('level', 1),
                    'score': data.get('floor', 1) * 100 + data.get('level', 1) * 10
                })
    entries.sort(key=lambda x: x['score'], reverse=True)
    return entries[:20]
