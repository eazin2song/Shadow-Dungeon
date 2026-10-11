const MenuAnimation = {
    canvas: null,
    ctx: null,
    particles: [],
    symbols: ['⚔️', '🛡️', '💀', '🗡️', '🔮', '🏹', '👻', '🔥', '❄️', '⚡', '💎', '👑', '☠️', '🩸', '✨', '🌀'],
    animFrame: 0,

    init() {
        this.canvas = document.getElementById('menu-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createParticles();
        this.animate();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    createParticles() {
        this.particles = [];
        const count = Math.floor((this.canvas.width * this.canvas.height) / 5000);
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1.5,
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1,
                opacity: Math.random() * 0.6 + 0.3,
                color: ['#ff8800', '#ffaa44', '#ffcc88', '#4488ff', '#44ccff', '#ff4444', '#44ff44'][Math.floor(Math.random() * 7)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.05 + 0.02,
            });
        }

        for (let i = 0; i < 25; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 25 + Math.random() * 20,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: -Math.random() * 0.8 - 0.3,
                opacity: Math.random() * 0.25 + 0.1,
                isSymbol: true,
                symbol: this.symbols[Math.floor(Math.random() * this.symbols.length)],
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.03,
            });
        }

        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 80 + Math.random() * 60,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.1 + 0.05,
                isGlow: true,
                color: ['#ff8800', '#4488ff', '#ff4444', '#44cc44'][Math.floor(Math.random() * 4)],
            });
        }
    },

    animate() {
        if (document.getElementById('menu-screen').classList.contains('hidden')) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.animFrame++;
        const ctx = this.ctx;
        const cw = this.canvas.width;
        const ch = this.canvas.height;

        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, cw, ch);

        this.drawBackgroundGlow(ctx, cw, ch);
        this.drawGrid(ctx, cw, ch);

        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < -80) p.x = cw + 80;
            if (p.x > cw + 80) p.x = -80;
            if (p.y < -80) p.y = ch + 80;
            if (p.y > ch + 80) p.y = -80;

            if (p.isGlow) {
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, p.color + '40');
                gradient.addColorStop(0.5, p.color + '15');
                gradient.addColorStop(1, p.color + '00');
                ctx.fillStyle = gradient;
                ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
            } else if (p.isSymbol) {
                p.rotation += p.rotSpeed;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = p.opacity;
                ctx.font = `${p.size}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.symbol, 0, 0);
                ctx.restore();
            } else {
                p.pulse += p.pulseSpeed;
                const pulseSize = p.size * (1 + Math.sin(p.pulse) * 0.3);
                const pulseOpacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = pulseOpacity;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, pulseSize * 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = pulseOpacity * 0.2;
                ctx.fill();
            }
        });

        ctx.globalAlpha = 1;

        this.drawVignette(ctx, cw, ch);

        requestAnimationFrame(() => this.animate());
    },

    drawBackgroundGlow(ctx, cw, ch) {
        const time = this.animFrame * 0.005;
        
        const cx1 = cw * 0.3 + Math.sin(time) * cw * 0.1;
        const cy1 = ch * 0.3 + Math.cos(time * 0.7) * ch * 0.1;
        const gradient1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, ch * 0.5);
        gradient1.addColorStop(0, 'rgba(255, 100, 0, 0.15)');
        gradient1.addColorStop(0.5, 'rgba(255, 50, 0, 0.05)');
        gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, cw, ch);

        const cx2 = cw * 0.7 + Math.cos(time * 0.8) * cw * 0.1;
        const cy2 = ch * 0.6 + Math.sin(time * 0.6) * ch * 0.1;
        const gradient2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, ch * 0.4);
        gradient2.addColorStop(0, 'rgba(0, 100, 255, 0.12)');
        gradient2.addColorStop(0.5, 'rgba(0, 50, 200, 0.04)');
        gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, cw, ch);

        const cx3 = cw * 0.5 + Math.sin(time * 1.2) * cw * 0.15;
        const cy3 = ch * 0.8 + Math.cos(time * 0.9) * ch * 0.1;
        const gradient3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, ch * 0.3);
        gradient3.addColorStop(0, 'rgba(200, 0, 0, 0.1)');
        gradient3.addColorStop(0.5, 'rgba(150, 0, 0, 0.03)');
        gradient3.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient3;
        ctx.fillRect(0, 0, cw, ch);
    },

    drawGrid(ctx, cw, ch) {
        ctx.strokeStyle = 'rgba(255, 136, 0, 0.06)';
        ctx.lineWidth = 1;
        const gridSize = 50;
        const offsetX = (this.animFrame * 0.3) % gridSize;
        const offsetY = (this.animFrame * 0.15) % gridSize;

        for (let x = -gridSize + offsetX; x < cw + gridSize; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ch);
            ctx.stroke();
        }
        for (let y = -gridSize + offsetY; y < ch + gridSize; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(cw, y);
            ctx.stroke();
        }

        ctx.strokeStyle = 'rgba(255, 136, 0, 0.02)';
        for (let x = -gridSize + offsetX; x < cw + gridSize; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x + gridSize / 2, 0);
            ctx.lineTo(x + gridSize / 2, ch);
            ctx.stroke();
        }
        for (let y = -gridSize + offsetY; y < ch + gridSize; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y + gridSize / 2);
            ctx.lineTo(cw, y + gridSize / 2);
            ctx.stroke();
        }
    },

    drawVignette(ctx, cw, ch) {
        const gradient = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.2, cw / 2, ch / 2, ch * 0.7);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, cw, ch);
    }
};

async function init() {
    await Core.init();
    await Game.loadConfig();
    UI.init();
    Renderer.init('game-canvas');
    MenuAnimation.init();

    document.getElementById('btn-new-game').addEventListener('click', () => {
        UI.showCharacterSelect();
    });

    document.getElementById('btn-continue').addEventListener('click', async () => {
        try {
            const resp = await fetch('/api/saves');
            const data = await resp.json();
            if (data.success && data.saves.length > 0) {
                UI.showSaveList(data.saves);
            } else {
                UI.showToast('没有找到存档', 'error');
            }
        } catch (e) {
            UI.showToast('无法连接服务器', 'error');
        }
    });

    document.getElementById('btn-leaderboard').addEventListener('click', async () => {
        try {
            const resp = await fetch('/api/leaderboard');
            const data = await resp.json();
            if (data.success) {
                UI.showLeaderboard(data.leaderboard);
            }
        } catch (e) {
            UI.showToast('无法连接服务器', 'error');
        }
    });

    document.getElementById('btn-multiplayer').addEventListener('click', () => {
        Multiplayer.init();
        Multiplayer.playerName = '玩家';
        Multiplayer.character = 'warrior';
        Multiplayer.openPanel();
    });
}

window.addEventListener('load', init);
