const Core = {
    useWasm: false,

    async init() {
        try {
            const response = await fetch('js/core.wasm');
            if (!response.ok) throw new Error('WASM not found');
            const bytes = await response.arrayBuffer();
            const module = await WebAssembly.instantiate(bytes, {
                env: { random_init: () => {}, random_int: (max) => Math.floor(Math.random() * max) }
            });
            this.wasm = module.instance.exports;
            this.useWasm = true;
            console.log('WASM loaded');
        } catch (e) {
            console.warn('WASM not available, using JS fallback');
            this.useWasm = false;
        }
    },

    generateDungeon(floor) {
        return this._jsGenerateDungeon(floor);
    },

    _jsGenerateDungeon(floor) {
        const W = 40, H = 30;
        const MIN_ROOM = 4, MAX_ROOM = 8;
        const map = Array.from({ length: H }, () => Array(W).fill(0));
        const rooms = [];

        function overlap(a, b) {
            return !(a.x + a.w + 1 < b.x || b.x + b.w + 1 < a.x ||
                     a.y + a.h + 1 < b.y || b.y + b.h + 1 < a.y);
        }

        function carve(x, y, w, h) {
            for (let dy = 0; dy < h; dy++)
                for (let dx = 0; dx < w; dx++)
                    if (x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < H)
                        map[y + dy][x + dx] = 1;
        }

        function corridor(x1, y1, x2, y2) {
            let cx = x1, cy = y1;
            while (cx !== x2) {
                if (cx >= 0 && cx < W && cy >= 0 && cy < H && map[cy][cx] === 0)
                    map[cy][cx] = 1;
                cx += x2 > x1 ? 1 : -1;
            }
            while (cy !== y2) {
                if (cx >= 0 && cx < W && cy >= 0 && cy < H && map[cy][cx] === 0)
                    map[cy][cx] = 1;
                cy += y2 > y1 ? 1 : -1;
            }
        }

        const target = 6 + Math.floor(Math.random() * 5);
        for (let attempt = 0; attempt < 100 && rooms.length < target; attempt++) {
            const w = MIN_ROOM + Math.floor(Math.random() * (MAX_ROOM - MIN_ROOM + 1));
            const h = MIN_ROOM + Math.floor(Math.random() * (MAX_ROOM - MIN_ROOM + 1));
            const x = 1 + Math.floor(Math.random() * (W - w - 2));
            const y = 1 + Math.floor(Math.random() * (H - h - 2));
            const room = { x, y, w, h, type: 'normal' };
            let ok = true;
            for (const r of rooms) {
                if (overlap(r, room)) { ok = false; break; }
            }
            if (ok) {
                carve(x, y, w, h);
                rooms.push(room);
            }
        }

        if (rooms.length === 0) {
            const room = { x: 5, y: 5, w: 8, h: 6, type: 'normal' };
            carve(room.x, room.y, room.w, room.h);
            rooms.push(room);
        }

        for (let i = 1; i < rooms.length; i++) {
            const a = rooms[i - 1], b = rooms[i];
            corridor(a.x + Math.floor(a.w / 2), a.y + Math.floor(a.h / 2),
                     b.x + Math.floor(b.w / 2), b.y + Math.floor(b.h / 2));
        }

        rooms[0].type = 'start';
        let maxDist = 0, bossIdx = 0;
        for (let i = 1; i < rooms.length; i++) {
            const dx = (rooms[0].x + rooms[0].w / 2) - (rooms[i].x + rooms[i].w / 2);
            const dy = (rooms[0].y + rooms[0].h / 2) - (rooms[i].y + rooms[i].h / 2);
            const dist = dx * dx + dy * dy;
            if (dist > maxDist) { maxDist = dist; bossIdx = i; }
        }
        rooms[bossIdx].type = 'boss';

        for (let i = 0; i < rooms.length; i++) {
            if (i === 0 || i === bossIdx) continue;
            const roll = Math.random();
            if (roll < 0.25) rooms[i].type = 'chest';
            else if (roll < 0.4) rooms[i].type = 'shop';
            else if (roll < 0.5) rooms[i].type = 'trap';
        }

        const specialTiles = { chest: 5, shop: 6, trap: 7 };
        const stairsPos = { x: rooms[bossIdx].x + Math.floor(rooms[bossIdx].w / 2),
                           y: rooms[bossIdx].y + Math.floor(rooms[bossIdx].h / 2) };
        map[stairsPos.y][stairsPos.x] = 3;

        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].type in specialTiles) {
                const rx = rooms[i].x + Math.floor(rooms[i].w / 2);
                const ry = rooms[i].y + Math.floor(rooms[i].h / 2);
                map[ry][rx] = specialTiles[rooms[i].type];
            }
        }

        const playerStart = {
            x: rooms[0].x + Math.floor(rooms[0].w / 2),
            y: rooms[0].y + Math.floor(rooms[0].h / 2)
        };

        return { map, rooms, playerStart, stairsPos, width: W, height: H };
    },

    calcDamage(atk, def) {
        const base = Math.max(1, atk - Math.floor(def / 2));
        const variance = 0.8 + Math.random() * 0.4;
        return Math.max(1, Math.floor(base * variance));
    }
};
