const UI = {
    init() {
        this.bindKeyboard();
        this.bindButtons();
    },

    bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (Game.state === 'menu') return;

            if (e.key === 'Escape') {
                e.preventDefault();
                const overlay = document.getElementById('overlay');
                if (overlay.classList.contains('hidden')) {
                    if (Game.state === 'exploring' || Game.state === 'battle' || Game.state === 'shop') {
                        this.showPauseMenu();
                    }
                } else {
                    if (Game.state === 'paused') {
                        this.resumeGame('exploring');
                    } else {
                        this.hideOverlay();
                    }
                }
                return;
            }

            if (Game.state === 'paused') return;

            if (document.getElementById('overlay').classList.contains('hidden')) {
                const keyMap = {
                    'ArrowUp': [0, -1], 'w': [0, -1], 'W': [0, -1],
                    'ArrowDown': [0, 1], 's': [0, 1], 'S': [0, 1],
                    'ArrowLeft': [-1, 0], 'a': [-1, 0], 'A': [-1, 0],
                    'ArrowRight': [1, 0], 'd': [1, 0], 'D': [1, 0],
                };

                if (e.key in keyMap) {
                    e.preventDefault();
                    const [dx, dy] = keyMap[e.key];
                    Game.movePlayer(dx, dy);
                    return;
                } else if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    Game.interact();
                    return;
                }
            }

            if (Game.state === 'battle') {
                if (e.key === '1') {
                    e.preventDefault();
                    Game.battleAction('attack');
                } else if (e.key === '2') {
                    e.preventDefault();
                    Game.battleAction('defend');
                } else if (e.key === '3') {
                    e.preventDefault();
                    this.showInventory();
                } else if (e.key === '4') {
                    e.preventDefault();
                    Game.battleAction('flee');
                }
            }

            if (e.key === 'i' || e.key === 'I') {
                this.showInventory();
            } else if (e.key === 'k' || e.key === 'K') {
                this.showSkillTree();
            } else if (e.key === 'n' || e.key === 'N') {
                this.showEnhanceEquipment();
            } else if (e.key === 'j' || e.key === 'J') {
                this.showAchievements();
            }
        });
    },

    bindButtons() {
        document.getElementById('btn-attack').addEventListener('click', () => Game.battleAction('attack'));
        document.getElementById('btn-defend').addEventListener('click', () => Game.battleAction('defend'));
        document.getElementById('btn-item').addEventListener('click', () => this.showInventory());
        document.getElementById('btn-flee').addEventListener('click', () => Game.battleAction('flee'));
        document.getElementById('btn-shop').addEventListener('click', () => {
            if (Game.state === 'exploring' || Game.state === 'shop') {
                Game.state = 'shop';
                this.showShop();
            }
        });
        document.getElementById('btn-inventory').addEventListener('click', () => this.showInventory());
        document.getElementById('btn-equipment').addEventListener('click', () => this.showEquipment());
        document.getElementById('btn-skill').addEventListener('click', () => this.showSkillTree());
        document.getElementById('btn-enhance').addEventListener('click', () => this.showEnhanceEquipment());
        document.getElementById('btn-achievements').addEventListener('click', () => this.showAchievements());
        document.getElementById('btn-pause').addEventListener('click', () => this.showPauseMenu());
    },

    updateStatsPanel(player) {
        const expPct = player.exp_to_next > 0 ? Math.floor((player.exp / player.exp_to_next) * 100) : 0;
        document.getElementById('stats-content').innerHTML = `
            <div class="stat-row"><span class="stat-label">等级</span><span class="stat-value stat-hp">Lv.${player.level}</span></div>
            <div class="stat-row"><span class="stat-label">生命</span><span class="stat-value stat-hp">${player.current_hp}/${player.max_hp}</span></div>
            <div class="stat-row"><span class="stat-label">攻击</span><span class="stat-value stat-atk">${player.atk}</span></div>
            <div class="stat-row"><span class="stat-label">防御</span><span class="stat-value stat-def">${player.def}</span></div>
            <div class="stat-row"><span class="stat-label">速度</span><span class="stat-value stat-spd">${player.spd.toFixed(1)}</span></div>
            <div class="stat-row"><span class="stat-label">经验</span><span class="stat-value stat-exp">${player.exp}/${player.exp_to_next} (${expPct}%)</span></div>
            <div class="stat-row"><span class="stat-label">金币</span><span class="stat-value" style="color:#ffcc00">${player.gold}</span></div>
            <div class="stat-row"><span class="stat-label">层数</span><span class="stat-value" style="color:#888">${player.floor}</span></div>
        `;
    },

    showEnemyPanel(enemy) {
        const panel = document.getElementById('enemy-panel');
        const content = document.getElementById('enemy-content');
        panel.classList.remove('hidden');

        const hpPct = Math.max(0, (enemy.current_hp / enemy.max_hp) * 100);
        const elementColors = {
            none: '#888', fire: '#ff4444', ice: '#44ccff', earth: '#88aa44',
            lightning: '#ffcc44', water: '#4488cc', dark: '#8844cc', light: '#ffffaa'
        };
        const elementNames = {
            none: '无', fire: '🔥火', ice: '❄️冰', earth: '🌍土',
            lightning: '⚡雷', water: '💧水', dark: '🌑暗', light: '✨光'
        };
        const elemColor = elementColors[enemy.element] || '#888';
        const elemName = elementNames[enemy.element] || '无';

        let skillsHtml = '';
        if (enemy.skills && enemy.skills.length > 0) {
            const skillNames = {
                poison_bite: '毒咬', fire_breath: '烈焰吐息', ice_fang: '冰牙',
                thunder_strike: '雷击', shadow_strike: '暗影突袭', heal: '治愈',
                summon: '召唤', enrage: '狂暴'
            };
            skillsHtml = '<div class="enemy-skills">';
            enemy.skills.forEach(skill => {
                skillsHtml += `<span class="enemy-skill-tag">${skillNames[skill] || skill}</span>`;
            });
            skillsHtml += '</div>';
        }

        let statusHtml = '';
        if (enemy.statusEffects && enemy.statusEffects.length > 0) {
            const statusNames = {
                poison: '☠️中毒', burn: '🔥燃烧', freeze: '❄️冰冻',
                bleed: '🩸流血', stun: '💫眩晕', weakness: '⬇️虚弱'
            };
            statusHtml = '<div class="enemy-status-effects">';
            enemy.statusEffects.forEach(eff => {
                statusHtml += `<span class="status-tag status-${eff.type}">${statusNames[eff.type] || eff.type}(${eff.remaining})</span>`;
            });
            statusHtml += '</div>';
        }

        const isElite = enemy.isElite ? '💎 ' : '';
        const isBoss = enemy.type === 'boss' ? '👑 ' : '';

        content.innerHTML = `
            <div class="enemy-header">
                <div class="enemy-icon">${this.getEnemyIcon(enemy.type)}</div>
                <div>
                    <div class="enemy-name">${isElite}${isBoss}${enemy.name}</div>
                    <div class="enemy-element" style="color:${elemColor}">${elemName}</div>
                </div>
            </div>
            <div class="enemy-hp-bar-container">
                <div class="enemy-hp-bar" id="enemy-hp-bar" style="width:${hpPct}%"></div>
                <span class="enemy-hp-text">${enemy.current_hp}/${enemy.max_hp}</span>
            </div>
            <div class="enemy-stats">
                <span>⚔️${enemy.atk}</span>
                <span>🛡️${enemy.def}</span>
                <span>💨${enemy.spd}</span>
            </div>
            ${skillsHtml}
            ${statusHtml}
        `;
    },

    hideEnemyPanel() {
        document.getElementById('enemy-panel').classList.add('hidden');
    },

    updateEnemyHP(enemy) {
        const hpBar = document.getElementById('enemy-hp-bar');
        const hpText = document.querySelector('.enemy-hp-text');
        if (!hpBar || !hpText) return;

        const hpPct = Math.max(0, (enemy.current_hp / enemy.max_hp) * 100);
        hpBar.style.width = hpPct + '%';
        hpText.textContent = `${enemy.current_hp}/${enemy.max_hp}`;

        if (hpPct > 50) hpBar.style.background = 'linear-gradient(90deg, #cc4444, #ee6666)';
        else if (hpPct > 25) hpBar.style.background = 'linear-gradient(90deg, #cc8844, #eeaa66)';
        else hpBar.style.background = 'linear-gradient(90deg, #cc2222, #ee4444)';
    },

    getEnemyIcon(type) {
        const icons = {
            slime: '🟢', bat: '🦇', skeleton: '💀', goblin: '👺',
            ghost: '👻', scorpion: '🦂', lizard: '🦎', assassin: '🗡️',
            golem: '🗿', elemental: '⚡', vampire: '🧛', demon: '😈',
            death_knight: '⚔️', dragon: '🐲', giant: '🗿',
            boss: '👹', elite: '💎'
        };
        if (type && type.startsWith('elite_')) return '💎';
        return icons[type] || '❓';
    },

    showDamagePopup(x, y, damage, type) {
        const popup = document.createElement('div');
        popup.className = `damage-popup ${type}`;
        popup.textContent = type === 'heal' ? `+${damage}` : `-${damage}`;
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
        document.body.appendChild(popup);

        setTimeout(() => popup.remove(), 1000);
    },

    updateHPBar(player) {
        const pct = Math.max(0, (player.current_hp / player.max_hp) * 100);
        const hpBar = document.getElementById('hp-bar');
        hpBar.style.width = pct + '%';
        if (pct > 50) hpBar.style.background = 'linear-gradient(90deg, #44cc44, #66ee66)';
        else if (pct > 25) hpBar.style.background = 'linear-gradient(90deg, #cccc44, #eeee66)';
        else hpBar.style.background = 'linear-gradient(90deg, #cc4444, #ee6666)';
        document.getElementById('hp-text').textContent = `${player.current_hp}/${player.max_hp}`;
        document.getElementById('level-display').textContent = `Lv.${player.level}`;
        document.getElementById('gold-display').textContent = `💰 ${player.gold}`;
        document.getElementById('floor-display').textContent = `第${player.floor}层`;
    },

    addLog(message, type) {
        const logContent = document.getElementById('log-content');
        const entry = document.createElement('div');
        entry.className = `log-entry log-${type || 'info'}`;
        entry.textContent = message;
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;

        while (logContent.children.length > 50) {
            logContent.removeChild(logContent.firstChild);
        }
    },

    clearLog() {
        document.getElementById('log-content').innerHTML = '';
    },

    showOverlay(html) {
        document.getElementById('overlay-content').innerHTML = html;
        document.getElementById('overlay').classList.remove('hidden');
    },

    hideOverlay() {
        document.getElementById('overlay').classList.add('hidden');
        if (Game.state === 'shop') {
            Game.state = 'exploring';
        }
    },

    showPauseMenu() {
        if (Game.state === 'menu' || Game.state === 'gameover') return;
        const prevState = Game.state;
        Game.state = 'paused';

        let html = '<div class="overlay-title">游戏暂停</div>';
        html += `<p style="text-align:center;color:#888;margin-bottom:16px">第${Game.player.floor}层 | Lv.${Game.player.level} ${Game.player.name}</p>`;
        html += '<div style="display:flex;flex-direction:column;gap:10px">';
        html += '<button class="overlay-close" onclick="UI.resumeGame(\'' + prevState + '\')">继续游戏</button>';
        html += '<button class="overlay-close" onclick="Game.saveGame()">保存游戏</button>';
        html += '<button class="overlay-close" onclick="UI.showTutorialStep(1)">📖 查看教程</button>';
        html += '<button class="overlay-close" onclick="UI.confirmExit()">返回主菜单</button>';
        html += '</div>';
        html += '<p style="text-align:center;color:#666;margin-top:16px;font-size:0.8em">按 ESC 继续游戏</p>';
        this.showOverlay(html);
    },

    resumeGame(prevState) {
        Game.state = prevState;
        this.hideOverlay();
    },

    confirmExit() {
        let html = '<div class="overlay-title">确认退出</div>';
        html += '<p style="text-align:center;margin-bottom:16px">退出前是否保存游戏？</p>';
        html += '<div style="display:flex;gap:10px;justify-content:center">';
        html += '<button class="overlay-close" onclick="Game.saveAndReturn()">保存并退出</button>';
        html += '<button class="overlay-close" onclick="Game.returnToMenu()" style="background:#4a2a2a;border-color:#8a4a4a">直接退出</button>';
        html += '</div>';
        html += '<button class="overlay-close" onclick="UI.showPauseMenu()" style="margin-top:10px">取消</button>';
        this.showOverlay(html);
    },

    showInventory() {
        const player = Game.player;
        if (!player) return;

        let html = '<div class="overlay-title">背包</div>';
        if (player.inventory.length === 0) {
            html += '<p style="text-align:center;color:#888">背包为空</p>';
        } else {
            player.inventory.forEach((item, idx) => {
                const rarity = item.rarity || 1;
                html += `
                    <div class="inventory-item">
                        <span class="item-name rarity-${rarity}">${item.name}</span>
                        <div class="item-actions">
                            ${item.type === 'consumable' ? `<button class="item-btn" onclick="Game.useItem(${idx})">使用</button>` : ''}
                            ${Game.state === 'shop' ? `<button class="item-btn" onclick="Game.sellItem(${idx})">出售</button>` : ''}
                        </div>
                    </div>
                `;
            });
        }
        html += '<button class="overlay-close" onclick="UI.hideOverlay()">关闭</button>';
        this.showOverlay(html);
    },

    showEquipment() {
        const player = Game.player;
        if (!player) return;

        const equipNames = { weapon: '⚔️ 武器', armor: '🛡️ 护甲', accessory: '💍 饰品' };
        let html = '<div class="overlay-title">装备</div>';
        html += `<p style="text-align:center;color:#888;margin-bottom:12px">点击装备可卸下</p>`;

        for (const [slot, name] of Object.entries(equipNames)) {
            const item = player.equipment[slot];
            const color = item ? (RARITY_COLORS[item.rarity] || '#ffffff') : '#666';
            html += `
                <div class="inventory-item" ${item ? `onclick="Game.unequipItem('${slot}');UI.showEquipment()"` : ''} style="${item ? 'cursor:pointer' : ''}">
                    <span class="stat-label">${name}</span>
                    <span style="color:${color}">${item ? item.name : '空'}</span>
                    ${item ? '<span style="color:#888;font-size:0.8em">点击卸下</span>' : ''}
                </div>
            `;
        }

        const charClass = CHARACTERS[player.character] || CHARACTERS.warrior;
        html += '<div style="margin-top:16px;padding-top:12px;border-top:1px solid #2a2a3a">';
        html += '<div style="color:#888;margin-bottom:8px">角色属性</div>';
        html += `<div style="color:#aaa;font-size:0.9em">基础: HP ${charClass.base_hp} | ATK ${charClass.base_atk} | DEF ${charClass.base_def} | SPD ${charClass.base_spd}</div>`;
        html += '</div>';

        html += '<button class="overlay-close" onclick="UI.hideOverlay()">关闭</button>';
        this.showOverlay(html);
    },

    showShop() {
        const player = Game.player;
        if (!player) return;

        const currentFloor = player.floor || 1;

        let html = '<div class="overlay-title">🏪 商店</div>';
        html += `<p style="text-align:center;color:#ffcc00;margin-bottom:4px">💰 金币: ${player.gold}</p>`;
        html += `<p style="text-align:center;color:#888;margin-bottom:12px;font-size:0.85em">当前层数: ${currentFloor} | 解锁更多商品需通过更高层</p>`;

        if (!Game.shopDiscount) {
            Game.shopDiscount = this.generateDailyDeal();
        }
        if (Game.shopDiscount) {
            const deal = Game.shopDiscount;
            html += `<div style="background:#2a1a1a;border:1px solid #cc4444;border-radius:8px;padding:8px;margin-bottom:12px;text-align:center">
                <span style="color:#ff8800">🔥 今日特价: </span>
                <span style="color:#ffcc00">${deal.name}</span>
                <span style="color:#888"> -</span>
                <span style="color:#44cc44">${deal.discount}%折扣</span>
                <span style="color:#888"> (原价${deal.originalPrice} → 现价${deal.discountPrice})</span>
            </div>`;
        }

        const categories = {
            consumable: { name: '💊 药水/卷轴', items: [] },
            weapon: { name: '⚔️ 武器', items: [] },
            armor: { name: '🛡️ 护甲', items: [] },
            accessory: { name: '💍 饰品', items: [] },
        };

        SHOP_ITEMS.forEach(item => {
            if (categories[item.type]) {
                const isUnlocked = currentFloor >= (item.unlock_floor || 1);
                const isDeal = Game.shopDiscount && Game.shopDiscount.item_id === item.item_id;
                categories[item.type].items.push({ ...item, isUnlocked, isDeal });
            }
        });

        for (const [type, cat] of Object.entries(categories)) {
            if (cat.items.length === 0) continue;

            const unlockedItems = cat.items.filter(i => i.isUnlocked);
            const lockedItems = cat.items.filter(i => !i.isUnlocked);

            html += `<div style="color:#888;margin:12px 0 6px;border-bottom:1px solid #2a2a3a;padding-bottom:4px">${cat.name}</div>`;

            unlockedItems.forEach(item => {
                let price = item.price;
                let priceHtml = `💰 ${price}`;
                let discountBadge = '';

                if (item.isDeal && Game.shopDiscount) {
                    price = Game.shopDiscount.discountPrice;
                    priceHtml = `<span style="text-decoration:line-through;color:#888;font-size:0.8em">💰${item.price}</span> 💰${price}`;
                    discountBadge = '<span style="background:#cc4444;color:#fff;padding:1px 4px;border-radius:3px;font-size:0.7em;margin-left:4px">特价</span>';
                }

                const canBuy = player.gold >= price;
                const color = RARITY_COLORS[item.rarity] || '#ffffff';
                html += `
                    <div class="shop-item">
                        <div class="shop-item-info">
                            <div class="shop-item-name" style="color:${color}">${item.name}${discountBadge}</div>
                            <div class="shop-item-stats">${item.desc}</div>
                        </div>
                        <span class="shop-item-price">${priceHtml}</span>
                        <button class="shop-buy-btn" ${canBuy ? '' : 'disabled'} onclick="Game.buyShopItem('${item.item_id}')">购买</button>
                    </div>
                `;
            });

            if (lockedItems.length > 0) {
                html += `<div style="color:#555;font-size:0.8em;padding:4px 8px">🔒 ${lockedItems.length}件商品待解锁 (需通过第${lockedItems[0].unlock_floor}层)</div>`;
            }
        }

        html += '<button class="overlay-close" onclick="UI.hideOverlay()">离开商店</button>';
        this.showOverlay(html);
    },

    generateDailyDeal() {
        const today = new Date().toDateString();
        const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const random = (seed * 9301 + 49297) % 233280 / 233280;

        const availableItems = SHOP_ITEMS.filter(item => item.price >= 30);
        if (availableItems.length === 0) return null;

        const idx = Math.floor(random * availableItems.length);
        const item = availableItems[idx];
        const discount = [20, 25, 30, 35, 40][Math.floor(random * 5)];
        const discountPrice = Math.floor(item.price * (1 - discount / 100));

        return {
            item_id: item.item_id,
            name: item.name,
            originalPrice: item.price,
            discountPrice: discountPrice,
            discount: discount
        };
    },

    showToast(message, type) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = type || '';
        setTimeout(() => { toast.className = 'hidden'; }, 2000);
    },

    showCharacterSelect() {
        let html = '<div class="overlay-title">选择角色</div>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:16px 0;max-height:50vh;overflow-y:auto">';

        for (const [id, char] of Object.entries(CHARACTERS)) {
            let specialInfo = '';
            if (char.crit_chance) specialInfo += `暴击${char.crit_chance}% `;
            if (char.crit_damage) specialInfo += `暴伤${char.crit_damage}x `;
            if (char.counter_chance) specialInfo += `反击${char.counter_chance}% `;
            if (char.lifesteal) specialInfo += `吸血${Math.floor(char.lifesteal * 100)}% `;
            if (char.heal_bonus) specialInfo += `治疗${Math.floor(char.heal_bonus * 100)}% `;
            if (char.block_chance) specialInfo += `格挡${char.block_chance}% `;
            if (char.random_element) specialInfo += '随机元素 ';

            html += `
                <div class="char-card" id="char-${id}" onclick="UI.selectCharacter('${id}')" style="
                    background:#1a1a2a;
                    border:2px solid #2a2a3a;
                    border-radius:8px;
                    padding:10px;
                    cursor:pointer;
                    transition:all 0.2s;
                ">
                    <div style="font-size:1.8em;text-align:center;margin-bottom:4px">${char.icon}</div>
                    <div style="text-align:center;font-weight:bold;color:${char.color};font-size:1em;margin-bottom:2px">${char.name}</div>
                    <div style="text-align:center;color:#888;font-size:0.7em;margin-bottom:4px">${char.desc}</div>
                    <div style="font-size:0.65em;color:#aaa;text-align:center">
                        <div>HP${char.base_hp} ATK${char.base_atk} DEF${char.base_def} SPD${char.base_spd}</div>
                        ${specialInfo ? `<div style="color:#ffcc00;margin-top:2px">${specialInfo}</div>` : ''}
                    </div>
                </div>
            `;
        }

        html += '</div>';

        html += '<div style="text-align:center;margin-top:12px">';
        html += '<input type="text" id="char-name-input" placeholder="输入角色名字" value="勇者" style="';
        html += 'background:#1a1a2a;color:#e0e0e0;border:1px solid #2a2a3a;padding:8px 16px;border-radius:6px;';
        html += 'font-size:1em;text-align:center;width:200px">';
        html += '</div>';

        html += '<div style="margin-top:16px;text-align:center">';
        html += '<div style="color:#888;margin-bottom:8px">选择难度</div>';
        html += '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">';
        for (const [id, diff] of Object.entries(DIFFICULTY_SETTINGS)) {
            const isSelected = id === 'normal';
            html += `<button class="diff-btn" id="diff-${id}" onclick="UI.selectDifficulty('${id}')" style="
                padding:6px 12px;
                background:${isSelected ? '#2a2a5a' : '#1a1a2a'};
                border:2px solid ${isSelected ? '#ff8800' : '#2a2a3a'};
                border-radius:6px;
                color:#e0e0e0;
                cursor:pointer;
                font-size:0.9em;
                transition:all 0.2s;
            ">${diff.icon} ${diff.name}</button>`;
        }
        html += '</div>';
        html += '<div id="diff-desc" style="color:#888;font-size:0.8em;margin-top:6px">标准难度</div>';
        html += '</div>';

        html += '<div style="display:flex;gap:10px;justify-content:center;margin-top:16px">';
        html += '<button class="overlay-close" onclick="UI.confirmCharacterSelect()">开始冒险</button>';
        html += '<button class="overlay-close" onclick="UI.hideOverlay()" style="background:#2a2a2a;border-color:#3a3a3a">返回</button>';
        html += '</div>';

        this.showOverlay(html);
        this.selectCharacter('warrior');
        this.selectDifficulty('normal');
    },

    selectDifficulty(diffId) {
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.style.background = '#1a1a2a';
            btn.style.borderColor = '#2a2a3a';
        });
        const selected = document.getElementById(`diff-${diffId}`);
        if (selected) {
            selected.style.background = '#2a2a5a';
            selected.style.borderColor = '#ff8800';
        }
        Game.selectedDifficulty = diffId;
        const descEl = document.getElementById('diff-desc');
        if (descEl) {
            descEl.textContent = DIFFICULTY_SETTINGS[diffId].desc;
        }
    },

    selectCharacter(charId) {
        document.querySelectorAll('.char-card').forEach(card => {
            card.style.borderColor = '#2a2a3a';
            card.style.background = '#1a1a2a';
        });
        const selected = document.getElementById(`char-${charId}`);
        if (selected) {
            selected.style.borderColor = CHARACTERS[charId].color;
            selected.style.background = '#1a1a3a';
        }
        Game.selectedCharacter = charId;
    },

    confirmCharacterSelect() {
        const nameInput = document.getElementById('char-name-input');
        const name = nameInput ? nameInput.value.trim() : '勇者';
        if (!name) {
            this.showToast('请输入角色名字', 'error');
            return;
        }
        this.hideOverlay();
        this.showTutorialChoice(name);
    },

    showTutorialChoice(name) {
        let html = '<div class="overlay-title">📖 新手教程</div>';
        html += '<p style="text-align:center;color:#888;margin:16px 0">是否观看新手教程？</p>';
        html += '<p style="text-align:center;color:#aaa;font-size:0.9em;margin-bottom:20px">教程将介绍游戏基本操作、战斗系统、元素相克等内容</p>';
        html += '<div style="display:flex;gap:16px;justify-content:center">';
        html += `<button class="overlay-close" onclick="UI.startTutorial('${name}', true)">观看教程</button>`;
        html += `<button class="overlay-close" onclick="UI.startTutorial('${name}', false)" style="background:#2a2a2a;border-color:#3a3a3a">跳过教程</button>`;
        html += '</div>';
        this.showOverlay(html);
    },

    startTutorial(name, showTutorial) {
        this.hideOverlay();
        document.getElementById('menu-screen').classList.add('hidden');
        document.getElementById('game-container').style.display = 'flex';
        setTimeout(() => {
            Renderer.resizeCanvas();
            Game.newGame(name, Game.selectedCharacter, Game.selectedDifficulty || 'normal');
            document.body.focus();
            if (showTutorial) {
                setTimeout(() => this.showTutorialStep(1), 500);
            }
        }, 50);
    },

    tutorialStep: 1,
    showTutorialStep(step) {
        this.tutorialStep = step;
        const tutorials = {
            1: {
                title: '🎮 欢迎来到暗影地牢',
                content: `
                    <p>这是一款Roguelike地牢探险游戏。</p>
                    <p style="margin-top:8px">你的目标是：<span style="color:#ffcc00">探索地牢，击败Boss，不断深入！</span></p>
                    <p style="margin-top:12px;color:#888">让我们学习基本操作...</p>
                `,
            },
            2: {
                title: '🕹️ 移动操作',
                content: `
                    <p>使用以下方式移动角色：</p>
                    <div style="margin:12px 0;text-align:center">
                        <div style="color:#ffcc00">W / ↑ - 上移</div>
                        <div style="color:#ffcc00">A / ← - 左移</div>
                        <div style="color:#ffcc00">S / ↓ - 下移</div>
                        <div style="color:#ffcc00">D / → - 右移</div>
                    </div>
                    <p style="color:#888">靠近墙壁时无法移动，探索每个房间寻找楼梯！</p>
                `,
            },
            3: {
                title: '⚔️ 战斗系统',
                content: `
                    <p>遇到敌人时会进入战斗：</p>
                    <ul style="margin:8px 0;padding-left:20px">
                        <li><span style="color:#ff4444">1键/攻击</span> - 对敌人造成伤害</li>
                        <li><span style="color:#4488ff">2键/防御</span> - 减少受到的伤害</li>
                        <li><span style="color:#44cc44">3键/道具</span> - 使用背包中的道具</li>
                        <li><span style="color:#ffcc44">4键/逃跑</span> - 尝试逃离战斗</li>
                    </ul>
                    <p style="color:#888">速度决定谁先行动！</p>
                `,
            },
            4: {
                title: '🔥 元素相克',
                content: `
                    <p>游戏中有<span style="color:#ffcc00">8种元素</span>，存在相克关系：</p>
                    <div style="margin:8px 0;font-size:0.9em">
                        <div>🔥火 克 ❄️冰 | ❄️冰 克 🌍土</div>
                        <div>🌍土 克 ⚡雷 | ⚡雷 克 💧水</div>
                        <div>💧水 克 🔥火 | 🌑暗 ↔ ✨光</div>
                    </div>
                    <p style="color:#44cc44">克制伤害+50%，被克伤害-30%</p>
                `,
            },
            5: {
                title: '💀 状态效果',
                content: `
                    <p>战斗中可能出现各种状态效果：</p>
                    <div style="margin:8px 0;font-size:0.9em">
                        <div>☠️中毒 - 每回合损失HP</div>
                        <div>🔥燃烧 - 每回合大量掉血</div>
                        <div>❄️冰冻 - 速度降低，受伤增加</div>
                        <div>💫眩晕 - 跳过一回合行动</div>
                        <div>⬇️虚弱 - 攻击力降低</div>
                    </div>
                    <p style="color:#888">商店有解毒草可以解除状态！</p>
                `,
            },
            6: {
                title: '🏪 商店系统',
                content: `
                    <p>点击底部<span style="color:#44cc44">🏪商店</span>按钮可随时打开商店：</p>
                    <ul style="margin:8px 0;padding-left:20px">
                        <li>购买药水恢复HP</li>
                        <li>购买武器提升攻击</li>
                        <li>购买护甲提升防御</li>
                        <li>购买饰品获得特殊效果</li>
                    </ul>
                    <p style="color:#ffcc00">推进层数可解锁更多商品！</p>
                `,
            },
            7: {
                title: '🌟 技能与强化',
                content: `
                    <p>升级获得<span style="color:#ffcc00">技能点</span>，可学习天赋技能：</p>
                    <p>按 <span style="color:#44cc44">K键</span> 打开技能树</p>
                    <p style="margin-top:8px">金币可<span style="color:#ffcc00">强化装备</span>：</p>
                    <p>按 <span style="color:#44cc44">N键</span> 打开强化界面</p>
                    <p style="margin-top:8px;color:#888">强化有失败风险，谨慎操作！</p>
                `,
            },
            8: {
                title: '🏆 成就与挑战',
                content: `
                    <p>完成特定目标解锁<span style="color:#ffcc00">成就</span>：</p>
                    <p>按 <span style="color:#44cc44">J键</span> 查看成就列表</p>
                    <p style="margin-top:8px">成就奖励包括：</p>
                    <ul style="margin:4px 0;padding-left:20px">
                        <li>金币奖励</li>
                        <li>属性提升</li>
                        <li>特殊称号</li>
                    </ul>
                    <p style="margin-top:8px;color:#888">连续击杀获得连杀奖励！</p>
                `,
            },
            9: {
                title: '⚠️ 重要提示',
                content: `
                    <p style="color:#ff4444">死亡会有惩罚：</p>
                    <ul style="margin:8px 0;padding-left:20px">
                        <li>丢失30%金币</li>
                        <li>丢失20%经验</li>
                        <li>20%概率丢失物品</li>
                    </ul>
                    <p style="color:#44cc44">建议：</p>
                    <ul style="margin:4px 0;padding-left:20px">
                        <li>多带药水再挑战Boss</li>
                        <li>注意元素相克</li>
                        <li>合理分配技能点</li>
                    </ul>
                `,
            },
            10: {
                title: '✅ 教程完成！',
                content: `
                    <p style="color:#44cc44;font-size:1.1em">恭喜你完成新手教程！</p>
                    <p style="margin-top:12px">快捷键一览：</p>
                    <div style="margin:8px 0;font-size:0.9em">
                        <div>WASD/方向键 - 移动</div>
                        <div>空格 - 交互</div>
                        <div>1234 - 战斗操作</div>
                        <div>I - 背包 | K - 技能</div>
                        <div>N - 强化 | J - 成就</div>
                        <div>ESC - 暂停菜单</div>
                    </div>
                    <p style="margin-top:12px;color:#ffcc00">祝你在地牢中冒险愉快！</p>
                `,
            },
        };

        const tutorial = tutorials[step];
        if (!tutorial) {
            this.hideOverlay();
            return;
        }

        let html = `<div class="overlay-title">${tutorial.title}</div>`;
        html += `<div style="margin:16px 0;line-height:1.8">${tutorial.content}</div>`;
        html += `<div style="text-align:center;color:#666;font-size:0.8em">${step}/10</div>`;
        html += '<div style="display:flex;gap:10px;justify-content:center;margin-top:16px">';
        if (step > 1) {
            html += `<button class="overlay-close" onclick="UI.showTutorialStep(${step - 1})" style="background:#2a2a2a;border-color:#3a3a3a">上一步</button>`;
        }
        if (step < 10) {
            html += `<button class="overlay-close" onclick="UI.showTutorialStep(${step + 1})">下一步</button>`;
            html += `<button class="overlay-close" onclick="UI.hideOverlay()" style="background:#4a2a2a;border-color:#8a4a4a">跳过</button>`;
        } else {
            html += '<button class="overlay-close" onclick="UI.hideOverlay()">开始冒险！</button>';
        }
        html += '</div>';
        this.showOverlay(html);
    },

    showSaveList(saves) {
        let html = '<div class="overlay-title">选择存档</div>';
        if (saves.length === 0) {
            html += '<p style="text-align:center;color:#888">没有存档</p>';
        } else {
            saves.forEach(save => {
                html += `
                    <div class="save-entry" onclick="Game.loadGame('${save.player_id}')">
                        <span class="save-name">${save.name}</span>
                        <span class="save-info">Lv.${save.level} 第${save.floor}层</span>
                    </div>
                `;
            });
        }
        html += '<button class="overlay-close" onclick="UI.hideOverlay()">关闭</button>';
        this.showOverlay(html);
    },

    showLeaderboard(entries) {
        let html = '<div class="overlay-title">排行榜</div>';
        if (entries.length === 0) {
            html += '<p style="text-align:center;color:#888">暂无记录</p>';
        } else {
            entries.forEach((entry, idx) => {
                html += `
                    <div class="leaderboard-entry">
                        <span class="leaderboard-rank">#${idx + 1}</span>
                        <span class="leaderboard-name">${entry.name}</span>
                        <span class="leaderboard-score">第${entry.floor}层 Lv.${entry.level}</span>
                    </div>
                `;
            });
        }
        html += '<button class="overlay-close" onclick="UI.hideOverlay()">关闭</button>';
        this.showOverlay(html);
    },

    showSkillTree() {
        const player = Game.player;
        if (!player) return;

        const charId = player.character;
        const skillData = SKILL_TREE[charId];
        if (!skillData) {
            this.showToast('该角色暂无技能树', 'error');
            return;
        }

        let html = `<div class="overlay-title">${skillData.name}</div>`;
        html += `<p style="text-align:center;color:#ffcc00;margin-bottom:12px">技能点: ${Game.skillPoints}</p>`;

        skillData.skills.forEach(skill => {
            const learned = Game.learnedSkills[skill.id] || 0;
            const maxed = learned >= skill.max_level;
            const canLearn = Game.skillPoints >= skill.cost && !maxed;

            html += `
                <div class="shop-item" style="opacity:${maxed ? 0.6 : 1}">
                    <div class="shop-item-info">
                        <div class="shop-item-name" style="color:${maxed ? '#888' : '#44cc44'}">${skill.name} ${learned > 0 ? `Lv.${learned}` : ''}</div>
                        <div class="shop-item-stats">${skill.desc}</div>
                        <div style="color:#888;font-size:0.8em">消耗: ${skill.cost}技能点 | 最大: ${skill.max_level}级</div>
                    </div>
                    <button class="shop-buy-btn" ${canLearn ? '' : 'disabled'} onclick="UI.learnSkill('${skill.id}')">${maxed ? '已满' : '学习'}</button>
                </div>
            `;
        });

        html += '<button class="overlay-close" onclick="UI.hideOverlay()">关闭</button>';
        this.showOverlay(html);
    },

    learnSkill(skillId) {
        const player = Game.player;
        const charId = player.character;
        const skillData = SKILL_TREE[charId];
        if (!skillData) return;

        const skill = skillData.skills.find(s => s.id === skillId);
        if (!skill) return;

        const learned = Game.learnedSkills[skill.id] || 0;
        if (learned >= skill.max_level) {
            this.showToast('技能已满级', 'error');
            return;
        }

        if (Game.skillPoints < skill.cost) {
            this.showToast('技能点不足', 'error');
            return;
        }

        Game.skillPoints -= skill.cost;
        Game.learnedSkills[skill.id] = learned + 1;

        if (skill.effect.max_hp) player.max_hp += skill.effect.max_hp;
        if (skill.effect.atk) player.atk += skill.effect.atk;
        if (skill.effect.def) player.def += skill.effect.def;
        if (skill.effect.spd) player.spd += skill.effect.spd;
        if (skill.effect.crit_chance) {
            const charClass = CHARACTERS[charId];
            if (charClass) charClass.crit_chance = (charClass.crit_chance || 0) + skill.effect.crit_chance;
        }

        UI.addLog(`学会了 ${skill.name}！`, 'loot');
        this.showSkillTree();
        Game.updateUI();
    },

    showEnhanceEquipment() {
        const player = Game.player;
        if (!player) return;

        let html = '<div class="overlay-title">⚒️ 装备强化</div>';
        html += `<p style="text-align:center;color:#ffcc00;margin-bottom:12px">金币: ${player.gold}</p>`;

        const slots = { weapon: '武器', armor: '护甲', accessory: '饰品' };
        for (const [slot, name] of Object.entries(slots)) {
            const item = player.equipment[slot];
            if (!item) {
                html += `<div class="shop-item" style="opacity:0.5"><div class="shop-item-info"><div class="shop-item-name">${name}: 空</div></div></div>`;
                continue;
            }

            const level = item.enhance_level || 0;
            const maxed = level >= EQUIPMENT_ENHANCE.max_level;
            const cost = maxed ? 0 : Math.floor(EQUIPMENT_ENHANCE.cost_base * Math.pow(EQUIPMENT_ENHANCE.cost_mult, level));
            const successRate = maxed ? 0 : EQUIPMENT_ENHANCE.success_rate[level];
            const canEnhance = !maxed && player.gold >= cost;

            html += `
                <div class="shop-item">
                    <div class="shop-item-info">
                        <div class="shop-item-name">${item.name} +${level}</div>
                        <div class="shop-item-stats">
                            ${item.atk ? `攻击:${item.atk}` : ''} ${item.def ? `防御:${item.def}` : ''}
                        </div>
                        <div style="color:#888;font-size:0.8em">
                            ${maxed ? '已满级' : `成功率:${successRate}% | 费用:${cost}金币`}
                        </div>
                    </div>
                    <button class="shop-buy-btn" ${canEnhance ? '' : 'disabled'} onclick="Game.enhanceEquipment('${slot}');UI.showEnhanceEquipment()">${maxed ? '满级' : '强化'}</button>
                </div>
            `;
        }

        html += '<button class="overlay-close" onclick="UI.hideOverlay()">关闭</button>';
        this.showOverlay(html);
    },

    showAchievements() {
        let html = '<div class="overlay-title">🏆 成就</div>';

        let unlocked = 0;
        let total = Object.keys(ACHIEVEMENTS).length;

        for (const [id, ach] of Object.entries(ACHIEVEMENTS)) {
            const isUnlocked = Game.achievements[id];
            if (isUnlocked) unlocked++;

            html += `
                <div class="shop-item" style="opacity:${isUnlocked ? 1 : 0.5}">
                    <div class="shop-item-info">
                        <div class="shop-item-name">${ach.icon} ${ach.name}</div>
                        <div class="shop-item-stats">${ach.desc}</div>
                    </div>
                    <span style="color:${isUnlocked ? '#44cc44' : '#888'}">${isUnlocked ? '✅' : '🔒'}</span>
                </div>
            `;
        }

        html += `<p style="text-align:center;color:#888;margin-top:12px">已解锁: ${unlocked}/${total}</p>`;
        html += '<button class="overlay-close" onclick="UI.hideOverlay()">关闭</button>';
        this.showOverlay(html);
    }
};
