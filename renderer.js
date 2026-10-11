const Renderer = {
    canvas: null,
    ctx: null,
    tileSize: 32,
    camera: { x: 0, y: 0 },
    explored: null,
    animFrame: 0,

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            return;
        }
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.startAnimation();
    },

    startAnimation() {
        setInterval(() => {
            this.animFrame = (this.animFrame + 1) % 60;
            if (Game.state === 'exploring' || Game.state === 'battle') {
                if (this.canvas.width < 100 || this.canvas.height < 100) {
                    this.resizeCanvas();
                }
                Game.render();
            }
        }, 100);
    },

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const w = container.clientWidth || window.innerWidth - 290;
        const h = container.clientHeight || window.innerHeight - 100;
        this.canvas.width = Math.max(w, 400);
        this.canvas.height = Math.max(h, 300);
    },

    resetExplored() {
        this.explored = Array.from({ length: 30 }, () => Array(40).fill(false));
    },

    updateExplored(px, py, radius) {
        if (!this.explored) this.resetExplored();
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                const nx = px + dx, ny = py + dy;
                if (nx >= 0 && nx < 40 && ny >= 0 && ny < 30) {
                    this.explored[ny][nx] = true;
                }
            }
        }
    },

    renderDungeon(dungeon, playerPos) {
        const ctx = this.ctx;
        const ts = this.tileSize;
        const cw = this.canvas.width;
        const ch = this.canvas.height;

        this.camera.x = playerPos.x * ts - cw / 2 + ts / 2;
        this.camera.y = playerPos.y * ts - ch / 2 + ts / 2;

        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, cw, ch);

        const startX = Math.max(0, Math.floor(this.camera.x / ts) - 1);
        const startY = Math.max(0, Math.floor(this.camera.y / ts) - 1);
        const endX = Math.min(40, startX + Math.ceil(cw / ts) + 3);
        const endY = Math.min(30, startY + Math.ceil(ch / ts) + 3);

        for (let y = startY; y < endY; y++) {
            for (let x = startX; x < endX; x++) {
                const screenX = x * ts - this.camera.x;
                const screenY = y * ts - this.camera.y;

                if (!this.explored || !this.explored[y][x]) {
                    this.drawFog(ctx, screenX, screenY, ts);
                    continue;
                }

                const tile = dungeon.map[y][x];
                this.drawTile(ctx, screenX, screenY, tile, ts);

                if (x === playerPos.x && y === playerPos.y) {
                    this.drawPlayer(ctx, screenX, screenY, ts);
                }
            }
        }

        this.renderMinimap(dungeon, playerPos);
    },

    drawFog(ctx, x, y, ts) {
        ctx.fillStyle = '#080810';
        ctx.fillRect(x, y, ts, ts);
    },

    drawTile(ctx, x, y, tile, ts) {
        switch (tile) {
            case 0: this.drawWall(ctx, x, y, ts); break;
            case 1: this.drawFloor(ctx, x, y, ts); break;
            case 3: this.drawFloor(ctx, x, y, ts); this.drawStairs(ctx, x, y, ts); break;
            case 5: this.drawFloor(ctx, x, y, ts); this.drawChest(ctx, x, y, ts); break;
            case 6: this.drawFloor(ctx, x, y, ts); this.drawShop(ctx, x, y, ts); break;
            case 7: this.drawFloor(ctx, x, y, ts); this.drawTrap(ctx, x, y, ts); break;
            default: this.drawFloor(ctx, x, y, ts);
        }
    },

    drawWall(ctx, x, y, ts) {
        const gradient = ctx.createLinearGradient(x, y, x + ts, y + ts);
        gradient.addColorStop(0, '#2a2a3a');
        gradient.addColorStop(0.5, '#353548');
        gradient.addColorStop(1, '#2a2a3a');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, ts, ts);

        ctx.strokeStyle = '#1a1a28';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 1, y + 1, ts - 2, ts - 2);

        ctx.fillStyle = '#222230';
        ctx.fillRect(x + ts / 2 - 1, y, 2, ts);
        ctx.fillRect(x, y + ts / 2 - 1, ts, 2);

        const hash = (x * 7 + y * 13) % 4;
        if (hash === 0) {
            ctx.fillStyle = '#252535';
            ctx.fillRect(x + 4, y + 4, 6, 6);
        } else if (hash === 1) {
            ctx.fillStyle = '#252535';
            ctx.fillRect(x + ts - 10, y + ts - 10, 6, 6);
        }
    },

    drawFloor(ctx, x, y, ts) {
        ctx.fillStyle = '#181820';
        ctx.fillRect(x, y, ts, ts);

        ctx.fillStyle = '#1a1a25';
        const hash = (x * 3 + y * 7) % 8;
        if (hash === 0) {
            ctx.fillRect(x + 8, y + 8, 2, 2);
        } else if (hash === 1) {
            ctx.fillRect(x + 20, y + 12, 2, 2);
        } else if (hash === 2) {
            ctx.fillRect(x + 14, y + 22, 2, 2);
        }

        ctx.strokeStyle = '#15151d';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, ts, ts);
    },

    drawPlayer(ctx, x, y, ts) {
        const cx = x + ts / 2;
        const cy = y + ts / 2;
        const bobY = Math.sin(this.animFrame * 0.15) * 1.5;
        const charId = Game.player ? Game.player.character : 'warrior';

        const charColors = {
            warrior: { body: '#cc4444', bodyLight: '#ee6664', weapon: '#C0C0C0', weaponHandle: '#8B4513' },
            mage: { body: '#4466cc', bodyLight: '#6688ee', weapon: '#8844cc', weaponHandle: '#663399' },
            thief: { body: '#44aa44', bodyLight: '#66cc66', weapon: '#888888', weaponHandle: '#555555' },
            knight: { body: '#ccaa44', bodyLight: '#eecc66', weapon: '#C0C0C0', weaponHandle: '#8B4513' },
            priest: { body: '#ffffaa', bodyLight: '#ffffcc', weapon: '#ffcc44', weaponHandle: '#aa8800' },
            ranger: { body: '#88cc44', bodyLight: '#aadd66', weapon: '#8B4513', weaponHandle: '#5a3010' },
            monk: { body: '#ff8844', bodyLight: '#ffaa66', weapon: '#cc6600', weaponHandle: '#884400' },
            warlock: { body: '#8844cc', bodyLight: '#aa66ee', weapon: '#6633aa', weaponHandle: '#442266' },
            assassin: { body: '#444444', bodyLight: '#666666', weapon: '#888888', weaponHandle: '#333333' },
            paladin: { body: '#ffaa44', bodyLight: '#ffcc66', weapon: '#C0C0C0', weaponHandle: '#8B4513' },
            elementalist: { body: '#44cccc', bodyLight: '#66eeee', weapon: '#44aaaa', weaponHandle: '#226666' },
            berserker: { body: '#cc2222', bodyLight: '#ee4444', weapon: '#aa0000', weaponHandle: '#660000' },
        };
        const colors = charColors[charId] || charColors.warrior;

        ctx.fillStyle = colors.body;
        ctx.beginPath();
        ctx.arc(cx, cy - 6 + bobY, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = colors.bodyLight;
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy + bobY);
        ctx.lineTo(cx + 6, cy + bobY);
        ctx.lineTo(cx + 4, cy + 10 + bobY);
        ctx.lineTo(cx - 4, cy + 10 + bobY);
        ctx.closePath();
        ctx.fill();

        if (charId === 'mage') {
            ctx.fillStyle = colors.weaponHandle;
            ctx.fillRect(cx + 6, cy - 10 + bobY, 2, 16);
            ctx.fillStyle = colors.weapon;
            ctx.beginPath();
            ctx.arc(cx + 7, cy - 12 + bobY, 3, 0, Math.PI * 2);
            ctx.fill();
        } else if (charId === 'knight') {
            ctx.fillStyle = '#888888';
            ctx.beginPath();
            ctx.arc(cx, cy - 6 + bobY, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = colors.body;
            ctx.beginPath();
            ctx.arc(cx, cy - 6 + bobY, 5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = colors.weaponHandle;
            ctx.fillRect(cx + 5, cy - 4 + bobY, 2, 12);
            ctx.fillStyle = colors.weapon;
            ctx.fillRect(cx + 4, cy - 8 + bobY, 4, 5);
        }

        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(cx, cy - 8 + bobY, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFE4C4';
        ctx.beginPath();
        ctx.arc(cx, cy - 5 + bobY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = colors.body;
        ctx.fillRect(cx - 2, cy + 10 + bobY, 2, 4);
        ctx.fillRect(cx + 1, cy + 10 + bobY, 2, 4);

        ctx.fillStyle = '#1a1a2a';
        ctx.beginPath();
        ctx.arc(cx - 1.5, cy - 5 + bobY, 0.8, 0, Math.PI * 2);
        ctx.arc(cx + 1.5, cy - 5 + bobY, 0.8, 0, Math.PI * 2);
        ctx.fill();

        const glowColors = {
            warrior: 'rgba(200, 50, 50, 0.15)',
            mage: 'rgba(50, 50, 200, 0.15)',
            thief: 'rgba(50, 200, 50, 0.15)',
            knight: 'rgba(200, 200, 50, 0.15)',
            priest: 'rgba(255, 255, 150, 0.15)',
            ranger: 'rgba(100, 200, 50, 0.15)',
            monk: 'rgba(255, 150, 50, 0.15)',
            warlock: 'rgba(150, 50, 200, 0.15)',
            assassin: 'rgba(80, 80, 80, 0.2)',
            paladin: 'rgba(255, 200, 50, 0.15)',
            elementalist: 'rgba(50, 200, 200, 0.15)',
            berserker: 'rgba(200, 30, 30, 0.2)',
        };
        ctx.fillStyle = glowColors[charId] || 'rgba(100, 255, 100, 0.15)';
        ctx.beginPath();
        ctx.arc(cx, cy + 2, 12, 0, Math.PI * 2);
        ctx.fill();
    },

    drawEnemy(ctx, x, y, ts, enemyType) {
        const cx = x + ts / 2;
        const cy = y + ts / 2;
        const bounce = Math.sin(this.animFrame * 0.1) * 2;

        switch (enemyType) {
            case 'slime':
                this.drawSlime(ctx, cx, cy + bounce, ts);
                break;
            case 'bat':
                this.drawBat(ctx, cx, cy + bounce, ts);
                break;
            case 'skeleton':
                this.drawSkeleton(ctx, cx, cy + bounce, ts);
                break;
            case 'goblin':
                this.drawGoblin(ctx, cx, cy + bounce, ts);
                break;
            case 'ghost':
                this.drawGhost(ctx, cx, cy + bounce, ts);
                break;
            default:
                this.drawGenericEnemy(ctx, cx, cy + bounce, ts);
        }
    },

    drawSlime(ctx, cx, cy, ts) {
        const squish = Math.sin(this.animFrame * 0.15) * 0.1;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1 + squish, 1 - squish);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
        gradient.addColorStop(0, '#44ff44');
        gradient.addColorStop(0.7, '#22aa22');
        gradient.addColorStop(1, '#116611');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(0, 2, 10, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-3, -1, 3, 0, Math.PI * 2);
        ctx.arc(3, -1, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.arc(-2, 0, 1.5, 0, Math.PI * 2);
        ctx.arc(4, 0, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(-3, -4, 3, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    },

    drawBat(ctx, cx, cy, ts) {
        const wingAngle = Math.sin(this.animFrame * 0.3) * 0.5;

        ctx.fillStyle = '#4a2a4a';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#3a1a3a';
        ctx.save();
        ctx.translate(cx - 4, cy - 2);
        ctx.rotate(-wingAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-10, -6);
        ctx.lineTo(-8, 0);
        ctx.lineTo(-6, -4);
        ctx.lineTo(-3, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(cx + 4, cy - 2);
        ctx.rotate(wingAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, -6);
        ctx.lineTo(8, 0);
        ctx.lineTo(6, -4);
        ctx.lineTo(3, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 1, 1.5, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 1, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(cx - 1, cy + 2);
        ctx.lineTo(cx, cy + 4);
        ctx.lineTo(cx + 1, cy + 2);
        ctx.closePath();
        ctx.fill();
    },

    drawSkeleton(ctx, cx, cy, ts) {
        ctx.fillStyle = '#d4d4c8';
        ctx.beginPath();
        ctx.arc(cx, cy - 6, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 7, 2, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 7, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx - 1, cy - 3);
        ctx.lineTo(cx, cy - 2);
        ctx.lineTo(cx + 1, cy - 3);
        ctx.stroke();

        ctx.fillStyle = '#c4c4b8';
        ctx.fillRect(cx - 2, cy, 4, 10);
        ctx.fillRect(cx - 6, cy + 2, 12, 2);

        ctx.fillStyle = '#b4b4a8';
        ctx.fillRect(cx - 1, cy + 10, 2, 5);
        ctx.fillRect(cx + 1, cy + 10, 2, 5);
    },

    drawGoblin(ctx, cx, cy, ts) {
        ctx.fillStyle = '#4a8a4a';
        ctx.beginPath();
        ctx.arc(cx, cy - 4, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#3a6a3a';
        ctx.beginPath();
        ctx.moveTo(cx - 6, cy - 6);
        ctx.lineTo(cx - 8, cy - 12);
        ctx.lineTo(cx - 3, cy - 8);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx + 6, cy - 6);
        ctx.lineTo(cx + 8, cy - 12);
        ctx.lineTo(cx + 3, cy - 8);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 5, 2, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 5, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 5, 1, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 5, 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy - 1);
        ctx.lineTo(cx - 2, cy + 1);
        ctx.lineTo(cx - 1, cy - 1);
        ctx.moveTo(cx + 1, cy - 1);
        ctx.lineTo(cx + 2, cy + 1);
        ctx.lineTo(cx + 3, cy - 1);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#3a7a3a';
        ctx.fillRect(cx - 4, cy + 2, 8, 8);
        ctx.fillRect(cx - 6, cy + 3, 3, 6);
        ctx.fillRect(cx + 3, cy + 3, 3, 6);
    },

    drawGhost(ctx, cx, cy, ts) {
        const floatY = Math.sin(this.animFrame * 0.08) * 3;

        ctx.fillStyle = 'rgba(180, 180, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(cx, cy - 4 + floatY, 8, Math.PI, 0);
        ctx.lineTo(cx + 8, cy + 6 + floatY);
        for (let i = 0; i < 4; i++) {
            ctx.quadraticCurveTo(
                cx + 6 - i * 4, cy + 10 + floatY + (i % 2 ? 3 : -1),
                cx + 4 - i * 4, cy + 6 + floatY
            );
        }
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(cx - 3, cy - 5 + floatY, 2.5, 0, Math.PI * 2);
        ctx.arc(cx + 3, cy - 5 + floatY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#4444aa';
        ctx.beginPath();
        ctx.arc(cx - 3, cy - 4 + floatY, 1.5, 0, Math.PI * 2);
        ctx.arc(cx + 3, cy - 4 + floatY, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(100, 100, 200, 0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + floatY, 12, 10, 0, 0, Math.PI * 2);
        ctx.fill();
    },

    drawGenericEnemy(ctx, cx, cy, ts) {
        ctx.fillStyle = '#aa4444';
        ctx.beginPath();
        ctx.arc(cx, cy - 4, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#882222';
        ctx.fillRect(cx - 5, cy + 3, 10, 8);

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 5, 2, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 5, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#111111';
        ctx.beginPath();
        ctx.arc(cx - 2, cy - 5, 1, 0, Math.PI * 2);
        ctx.arc(cx + 2, cy - 5, 1, 0, Math.PI * 2);
        ctx.fill();
    },

    drawBoss(ctx, x, y, ts, bossType) {
        const cx = x + ts / 2;
        const cy = y + ts / 2;
        const pulse = Math.sin(this.animFrame * 0.1) * 0.05;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1.2 + pulse, 1.2 + pulse);

        ctx.fillStyle = '#8a2a2a';
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(-10, -4);
        ctx.lineTo(-8, 8);
        ctx.lineTo(8, 8);
        ctx.lineTo(10, -4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#aa3333';
        ctx.beginPath();
        ctx.arc(0, -6, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(-3, -7, 2.5, 0, Math.PI * 2);
        ctx.arc(3, -7, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(-3, -7, 1.2, 0, Math.PI * 2);
        ctx.arc(3, -7, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.moveTo(-4, -2);
        ctx.lineTo(4, -2);
        ctx.lineTo(2, 0);
        ctx.lineTo(-2, 0);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#661a1a';
        ctx.beginPath();
        ctx.moveTo(-12, -8);
        ctx.lineTo(-8, -14);
        ctx.lineTo(-6, -6);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(12, -8);
        ctx.lineTo(8, -14);
        ctx.lineTo(6, -6);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        ctx.fillStyle = 'rgba(200, 50, 50, 0.2)';
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fill();
    },

    drawStairs(ctx, x, y, ts) {
        const cx = x + ts / 2;
        const cy = y + ts / 2;

        ctx.fillStyle = '#8B7355';
        ctx.fillRect(cx - 8, cy - 8, 16, 16);

        ctx.fillStyle = '#A0926B';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(cx - 6 + i * 2, cy - 6 + i * 4, 12 - i * 2, 3);
        }

        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.moveTo(cx + 6, cy - 4);
        ctx.lineTo(cx + 10, cy);
        ctx.lineTo(cx + 6, cy + 4);
        ctx.closePath();
        ctx.fill();
    },

    drawChest(ctx, x, y, ts) {
        const cx = x + ts / 2;
        const cy = y + ts / 2;

        ctx.fillStyle = '#8B6914';
        ctx.fillRect(cx - 7, cy - 3, 14, 10);

        ctx.fillStyle = '#A0792A';
        ctx.beginPath();
        ctx.moveTo(cx - 7, cy - 3);
        ctx.quadraticCurveTo(cx, cy - 10, cx + 7, cy - 3);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#FFD700';
        ctx.fillRect(cx - 2, cy - 1, 4, 4);
        ctx.fillStyle = '#DAA520';
        ctx.beginPath();
        ctx.arc(cx, cy + 1, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 215, 0, 0.15)';
        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fill();
    },

    drawShop(ctx, x, y, ts) {
        const cx = x + ts / 2;
        const cy = y + ts / 2;

        ctx.fillStyle = '#2a6a4a';
        ctx.fillRect(cx - 8, cy - 2, 16, 12);

        ctx.fillStyle = '#3a8a5a';
        ctx.fillRect(cx - 10, cy - 8, 20, 8);

        ctx.fillStyle = '#FFD700';
        ctx.font = '12px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', cx, cy + 3);

        ctx.fillStyle = '#aa8844';
        ctx.fillRect(cx - 10, cy - 10, 2, 4);
        ctx.fillRect(cx + 8, cy - 10, 2, 4);
        ctx.fillStyle = '#cc4444';
        ctx.fillRect(cx - 8, cy - 12, 16, 3);
    },

    drawTrap(ctx, x, y, ts) {
        const cx = x + ts / 2;
        const cy = y + ts / 2;

        ctx.fillStyle = '#5a3a2a';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 6);
        ctx.lineTo(cx + 6, cy + 4);
        ctx.lineTo(cx - 6, cy + 4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#884422';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 3);
        ctx.lineTo(cx + 3, cy + 2);
        ctx.lineTo(cx - 3, cy + 2);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#aa6633';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const angle = (i * 120 - 30) * Math.PI / 180;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * 4, cy + Math.sin(angle) * 4 - 2);
            ctx.lineTo(cx + Math.cos(angle) * 8, cy + Math.sin(angle) * 8 + 2);
            ctx.stroke();
        }

        ctx.fillStyle = 'rgba(255, 100, 50, 0.1)';
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
    },

    renderMinimap(dungeon, playerPos) {
        const ctx = this.ctx;
        const scale = 4;
        const mapW = 40 * scale;
        const mapH = 30 * scale;
        const ox = this.canvas.width - mapW - 12;
        const oy = 12;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(ox - 3, oy - 3, mapW + 6, mapH + 6);
        ctx.strokeStyle = '#2a2a4a';
        ctx.lineWidth = 1;
        ctx.strokeRect(ox - 3, oy - 3, mapW + 6, mapH + 6);

        for (let y = 0; y < 30; y++) {
            for (let x = 0; x < 40; x++) {
                if (!this.explored || !this.explored[y][x]) continue;
                const tile = dungeon.map[y][x];
                if (tile === 0) ctx.fillStyle = '#2a2a3a';
                else if (tile === 1) ctx.fillStyle = '#1a1a2a';
                else if (tile === 3) ctx.fillStyle = '#ffcc00';
                else if (tile === 5) ctx.fillStyle = '#ffcc00';
                else if (tile === 6) ctx.fillStyle = '#44cc44';
                else if (tile === 7) ctx.fillStyle = '#ff4444';
                else ctx.fillStyle = '#1a1a2a';
                ctx.fillRect(ox + x * scale, oy + y * scale, scale, scale);
            }
        }

        ctx.fillStyle = '#44ff44';
        ctx.shadowColor = '#44ff44';
        ctx.shadowBlur = 4;
        ctx.fillRect(ox + playerPos.x * scale, oy + playerPos.y * scale, scale, scale);
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#888';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('MAP', ox + mapW, oy - 5);
    }
};
