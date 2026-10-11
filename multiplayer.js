const Multiplayer = {
    socket: null,
    connected: false,
    roomId: null,
    isHost: false,
    players: {},
    playerName: '',
    character: 'warrior',

    init() {
        this.socket = io('http://localhost:5000', {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 10,
        });

        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.connected = true;
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.connected = false;
        });

        this.socket.on('room_created', (data) => {
            this.roomId = data.room_id;
            this.isHost = true;
            this.showRoom(data.room);
            UI.showToast('房间创建成功！', 'success');
        });

        this.socket.on('room_joined', (data) => {
            this.roomId = data.room_id;
            this.isHost = false;
            this.showRoom(data.room);
            UI.showToast('加入房间成功！', 'success');
        });

        this.socket.on('player_joined', (data) => {
            this.updatePlayers(data.players);
            UI.showToast(`${data.name} 加入了房间`, 'info');
        });

        this.socket.on('player_left', (data) => {
            this.updatePlayers(data.players);
            UI.showToast(`${data.name} 离开了房间`, 'info');
        });

        this.socket.on('new_host', (data) => {
            if (data.sid === this.socket.id) {
                this.isHost = true;
                document.getElementById('btn-start').classList.remove('hidden');
                UI.showToast('你已成为房主', 'info');
            }
        });

        this.socket.on('player_ready', (data) => {
            this.updatePlayers(data.players);
        });

        this.socket.on('game_started', (data) => {
            this.handleGameStarted(data);
        });

        this.socket.on('chat_message', (data) => {
            this.addChatMessage(data);
        });

        this.socket.on('player_updated', (data) => {
            this.players[data.sid] = data;
            if (typeof Game !== 'undefined' && Game.state === 'exploring') {
                Game.render();
            }
        });

        this.socket.on('enemy_action', (data) => {
            this.handleEnemyAction(data);
        });

        this.socket.on('boss_defeated', (data) => {
            UI.addLog(`${data.name} 击败了 ${data.boss_name}！进入第${data.floor}层`, 'loot');
        });

        this.socket.on('left_room', () => {
            this.roomId = null;
            this.isHost = false;
            this.players = {};
            document.getElementById('room-panel').classList.add('hidden');
            document.getElementById('multiplayer-panel').classList.remove('hidden');
        });

        this.socket.on('error', (data) => {
            UI.showToast(data.message, 'error');
        });
    },

    openPanel() {
        document.getElementById('multiplayer-panel').classList.remove('hidden');
        this.refreshRooms();
    },

    closePanel() {
        document.getElementById('multiplayer-panel').classList.add('hidden');
    },

    showTab(tab) {
        document.querySelectorAll('.mp-tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.mp-tab').forEach(el => el.classList.remove('active'));
        document.getElementById(`mp-content-${tab}`).classList.remove('hidden');
        event.target.classList.add('active');
    },

    async refreshRooms() {
        try {
            const resp = await fetch('/api/rooms');
            const data = await resp.json();
            if (data.success) {
                this.renderRoomList(data.rooms);
            }
        } catch (e) {
            console.error('Failed to fetch rooms:', e);
        }
    },

    renderRoomList(rooms) {
        const container = document.querySelector('.mp-room-list');
        if (rooms.length === 0) {
            container.innerHTML = '<div class="mp-no-rooms">暂无房间，创建一个吧！</div>';
            return;
        }

        container.innerHTML = rooms.map(room => `
            <div class="mp-room-item" onclick="Multiplayer.joinRoom('${room.id}')">
                <div class="room-info">
                    <div class="room-name">${room.name}</div>
                    <div class="room-host">房主: ${room.host}</div>
                </div>
                <div class="room-meta">
                    <span class="room-players">${room.players}/${room.max_players} 👥</span>
                    <span class="room-floor">第${room.floor}层</span>
                    <span class="room-status ${room.status}">${room.status === 'waiting' ? '等待中' : '游戏中'}</span>
                </div>
            </div>
        `).join('');
    },

    createRoom() {
        if (!this.connected) {
            UI.showToast('未连接到服务器', 'error');
            return;
        }

        const name = document.getElementById('mp-room-name').value || '冒险者的房间';
        const maxPlayers = parseInt(document.getElementById('mp-max-players').value) || 4;

        this.socket.emit('create_room', {
            name: name,
            max_players: maxPlayers,
            player_name: this.playerName || '玩家',
            character: this.character || 'warrior',
            player_data: typeof Game !== 'undefined' && Game.player ? Game.player : null,
        });
    },

    joinRoom(roomId) {
        if (!this.connected) {
            UI.showToast('未连接到服务器', 'error');
            return;
        }

        this.socket.emit('join_room', {
            room_id: roomId,
            player_name: this.playerName || '玩家',
            character: this.character || 'warrior',
            player_data: typeof Game !== 'undefined' && Game.player ? Game.player : null,
        });
    },

    joinRoomById() {
        const roomId = document.getElementById('mp-room-id').value.trim();
        if (!roomId) {
            UI.showToast('请输入房间ID', 'error');
            return;
        }
        this.joinRoom(roomId);
    },

    leaveRoom() {
        if (this.socket && this.roomId) {
            this.socket.emit('leave_room', { room_id: this.roomId });
        }
    },

    toggleReady() {
        if (this.socket && this.roomId) {
            this.socket.emit('player_ready', { room_id: this.roomId });
        }
    },

    startGame() {
        if (this.socket && this.isHost && this.roomId) {
            this.socket.emit('start_game', { room_id: this.roomId });
        }
    },

    sendChat() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message || !this.socket || !this.roomId) return;

        this.socket.emit('chat_message', { room_id: this.roomId, message: message });
        input.value = '';
    },

    addChatMessage(data) {
        const container = document.getElementById('chat-messages');
        const isMe = data.sid === this.socket.id;
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${isMe ? 'chat-me' : ''}`;
        msgDiv.innerHTML = `
            <span class="chat-name">${data.name}</span>
            <span class="chat-time">${data.timestamp}</span>
            <div class="chat-text">${this.escapeHtml(data.message)}</div>
        `;
        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    showRoom(room) {
        document.getElementById('multiplayer-panel').classList.add('hidden');
        document.getElementById('room-panel').classList.remove('hidden');
        document.getElementById('room-title').textContent = room.name;

        const roomIdEl = document.getElementById('room-id-display');
        if (roomIdEl) {
            roomIdEl.textContent = room.id;
        }

        const playersArray = Object.entries(room.players).map(([sid, p]) => ({...p, sid}));
        this.updatePlayers(playersArray);

        if (this.isHost) {
            document.getElementById('btn-start').classList.remove('hidden');
        } else {
            document.getElementById('btn-start').classList.add('hidden');
        }
    },

    updatePlayers(playersList) {
        const container = document.getElementById('room-players');
        if (!container) return;

        const playersArray = Array.isArray(playersList) ? playersList :
            Object.entries(playersList).map(([sid, p]) => ({...p, sid}));

        container.innerHTML = playersArray.map(p => `
            <div class="room-player ${p.ready ? 'ready' : ''}">
                <div class="player-avatar">${this.getCharacterIcon(p.character)}</div>
                <div class="player-name">${p.name}</div>
                <div class="player-status">${p.ready ? '✅ 已准备' : '⏳ 未准备'}</div>
                ${p.sid === this.socket.id ? '<span class="you-badge">你</span>' : ''}
            </div>
        `).join('');
    },

    getCharacterIcon(character) {
        const icons = {
            warrior: '⚔️', mage: '🔮', thief: '🗡️', knight: '🛡️',
            priest: '✝️', ranger: '🏹', monk: '👊', warlock: '👁️',
            assassin: '💀', paladin: '⚜️', elementalist: '🌀', berserker: '🪓',
        };
        return icons[character] || '❓';
    },

    handleGameStarted(data) {
        document.getElementById('room-panel').classList.add('hidden');
        document.getElementById('menu-screen').classList.add('hidden');
        document.getElementById('game-container').style.display = 'flex';

        this.players = {};
        const room = data.room;
        if (room && room.players) {
            Object.entries(room.players).forEach(([sid, p]) => {
                this.players[sid] = {...p, sid};
            });
        }

        if (typeof Game !== 'undefined') {
            Game.isMultiplayer = true;
            Game.multiplayerPlayers = this.players;
            if (!Game.player) {
                Game.newGame(this.playerName || '玩家', this.character || 'warrior', 'normal');
            }
        }

        UI.showToast('游戏开始！', 'success');
    },

    handleEnemyAction(data) {
        if (typeof Game === 'undefined' || Game.state !== 'battle') return;
        
        if (data.action === 'attack' && data.damage) {
            UI.addLog(`${data.name} 对敌人造成了 ${data.damage} 点伤害！`, 'damage');
        }
    },

    syncPlayer() {
        if (this.socket && this.roomId && typeof Game !== 'undefined' && Game.player) {
            this.socket.emit('player_update', {
                player_data: {
                    name: Game.player.name,
                    level: Game.player.level,
                    hp: Game.player.current_hp,
                    max_hp: Game.player.max_hp,
                    floor: Game.player.floor,
                    x: typeof Renderer !== 'undefined' ? Renderer.camera.x : 0,
                    y: typeof Renderer !== 'undefined' ? Renderer.camera.y : 0,
                }
            });
        }
    },

    syncBattleAction(action, damage, enemy) {
        if (this.socket && this.roomId) {
            this.socket.emit('enemy_action', {
                action: action,
                damage: damage,
                enemy: enemy ? enemy.name : null,
                name: typeof Game !== 'undefined' && Game.player ? Game.player.name : '玩家',
            });
        }
    },

    syncBossDefeated(bossName, floor) {
        if (this.socket && this.roomId) {
            this.socket.emit('boss_defeated', {
                boss_name: bossName,
                floor: floor,
            });
        }
    }
};
