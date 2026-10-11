const CHARACTERS = {
    warrior: {
        id: 'warrior',
        name: '战士',
        desc: '高生命高攻击，近战专家',
        icon: '⚔️',
        color: '#cc4444',
        element: 'none',
        base_hp: 60,
        base_atk: 10,
        base_def: 4,
        base_spd: 4.0,
        hp_growth: 7,
        atk_growth: 3,
        def_growth: 2,
        spd_growth: 0.05,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    mage: {
        id: 'mage',
        name: '法师',
        desc: '高攻击高速度，魔法大师',
        icon: '🔮',
        color: '#4488ff',
        element: 'none',
        base_hp: 40,
        base_atk: 14,
        base_def: 2,
        base_spd: 6.0,
        hp_growth: 4,
        atk_growth: 4,
        def_growth: 1,
        spd_growth: 0.15,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    thief: {
        id: 'thief',
        name: '盗贼',
        desc: '高速度高闪避，敏捷杀手',
        icon: '🗡️',
        color: '#44cc44',
        element: 'none',
        base_hp: 45,
        base_atk: 8,
        base_def: 3,
        base_spd: 8.0,
        hp_growth: 5,
        atk_growth: 2,
        def_growth: 1,
        spd_growth: 0.2,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    knight: {
        id: 'knight',
        name: '骑士',
        desc: '高防御高生命，坚不可摧',
        icon: '🛡️',
        color: '#ffcc00',
        element: 'none',
        base_hp: 70,
        base_atk: 7,
        base_def: 6,
        base_spd: 3.5,
        hp_growth: 8,
        atk_growth: 2,
        def_growth: 3,
        spd_growth: 0.03,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    priest: {
        id: 'priest',
        name: '牧师',
        desc: '治愈专家，持久战斗',
        icon: '✝️',
        color: '#ffffaa',
        element: 'light',
        base_hp: 50,
        base_atk: 6,
        base_def: 5,
        base_spd: 4.5,
        hp_growth: 6,
        atk_growth: 1,
        def_growth: 2,
        spd_growth: 0.08,
        heal_bonus: 1.5,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    ranger: {
        id: 'ranger',
        name: '游侠',
        desc: '远程攻击，先手制敌',
        icon: '🏹',
        color: '#88cc44',
        element: 'earth',
        base_hp: 48,
        base_atk: 11,
        base_def: 3,
        base_spd: 7.5,
        hp_growth: 5,
        atk_growth: 3,
        def_growth: 1,
        spd_growth: 0.18,
        crit_chance: 15,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    monk: {
        id: 'monk',
        name: '武僧',
        desc: '格挡反击，攻守兼备',
        icon: '👊',
        color: '#ff8844',
        element: 'none',
        base_hp: 55,
        base_atk: 9,
        base_def: 5,
        base_spd: 6.0,
        hp_growth: 6,
        atk_growth: 2,
        def_growth: 2,
        spd_growth: 0.12,
        counter_chance: 25,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    warlock: {
        id: 'warlock',
        name: '术士',
        desc: '暗影诅咒，吸血回复',
        icon: '👁️',
        color: '#8844cc',
        element: 'dark',
        base_hp: 42,
        base_atk: 13,
        base_def: 2,
        base_spd: 5.5,
        hp_growth: 4,
        atk_growth: 4,
        def_growth: 1,
        spd_growth: 0.1,
        lifesteal: 0.15,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    assassin: {
        id: 'assassin',
        name: '刺客',
        desc: '致命暴击，一击必杀',
        icon: '💀',
        color: '#444444',
        element: 'dark',
        base_hp: 38,
        base_atk: 15,
        base_def: 1,
        base_spd: 9.0,
        hp_growth: 3,
        atk_growth: 5,
        def_growth: 0,
        spd_growth: 0.25,
        crit_chance: 30,
        crit_damage: 2.0,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    paladin: {
        id: 'paladin',
        name: '圣骑士',
        desc: '神圣坦克，光属性克制暗',
        icon: '⚜️',
        color: '#ffaa44',
        element: 'light',
        base_hp: 65,
        base_atk: 8,
        base_def: 7,
        base_spd: 3.0,
        hp_growth: 8,
        atk_growth: 2,
        def_growth: 3,
        spd_growth: 0.02,
        block_chance: 20,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    elementalist: {
        id: 'elementalist',
        name: '元素使',
        desc: '掌控元素，随机属性攻击',
        icon: '🌀',
        color: '#44cccc',
        element: 'fire',
        base_hp: 44,
        base_atk: 12,
        base_def: 3,
        base_spd: 5.0,
        hp_growth: 4,
        atk_growth: 4,
        def_growth: 1,
        spd_growth: 0.1,
        random_element: true,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
    berserker: {
        id: 'berserker',
        name: '狂战士',
        desc: '狂暴输出，血量越低越强',
        icon: '🪓',
        color: '#cc2222',
        element: 'fire',
        base_hp: 55,
        base_atk: 12,
        base_def: 2,
        base_spd: 5.5,
        hp_growth: 6,
        atk_growth: 4,
        def_growth: 0,
        spd_growth: 0.08,
        rage_bonus: true,
        start_items: [
            { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, rarity: 1 },
        ]
    },
};

const ELEMENTS = {
    none: { name: '无', color: '#ffffff', strong: null, weak: null },
    fire: { name: '火', color: '#ff4444', strong: 'ice', weak: 'water' },
    ice: { name: '冰', color: '#44ccff', strong: 'earth', weak: 'fire' },
    earth: { name: '土', color: '#88aa44', strong: 'lightning', weak: 'ice' },
    lightning: { name: '雷', color: '#ffcc44', strong: 'water', weak: 'earth' },
    water: { name: '水', color: '#4488cc', strong: 'fire', weak: 'lightning' },
    dark: { name: '暗', color: '#8844cc', strong: 'light', weak: 'light' },
    light: { name: '光', color: '#ffffaa', strong: 'dark', weak: 'dark' },
};

const STATUS_EFFECTS = {
    poison: { name: '中毒', color: '#44cc44', icon: '☠️', damage_pct: 0.05, duration: 3 },
    burn: { name: '燃烧', color: '#ff6644', icon: '🔥', damage_pct: 0.08, duration: 2 },
    freeze: { name: '冰冻', color: '#44ccff', icon: '❄️', spd_reduction: 0.5, duration: 2 },
    bleed: { name: '流血', color: '#cc4444', icon: '🩸', damage_pct: 0.04, duration: 4 },
    stun: { name: '眩晕', color: '#ffcc44', icon: '💫', skip_turn: true, duration: 1 },
    weakness: { name: '虚弱', color: '#888888', icon: '⬇️', atk_reduction: 0.3, duration: 2 },
};

const ENEMY_SKILLS = {
    poison_bite: { name: '毒咬', element: 'none', status: 'poison', status_chance: 60, damage_mult: 1.2 },
    fire_breath: { name: '烈焰吐息', element: 'fire', status: 'burn', status_chance: 50, damage_mult: 1.5 },
    ice_fang: { name: '冰牙', element: 'ice', status: 'freeze', status_chance: 40, damage_mult: 1.3 },
    thunder_strike: { name: '雷击', element: 'lightning', status: 'stun', status_chance: 30, damage_mult: 1.8 },
    shadow_strike: { name: '暗影突袭', element: 'dark', status: 'weakness', status_chance: 50, damage_mult: 1.6 },
    heal: { name: '治愈', element: 'none', heal_pct: 0.2, damage_mult: 0 },
    summon: { name: '召唤', element: 'none', summon: true, damage_mult: 0 },
    enrage: { name: '狂暴', element: 'none', buff_atk: 0.5, damage_mult: 0 },
};

const ENEMIES_BY_FLOOR = {
    1: [
        { name: '史莱姆', type: 'slime', hp: 25, atk: 6, def: 2, spd: 3, exp: 12, gold: 6, element: 'none', skills: [] },
        { name: '毒蝙蝠', type: 'bat', hp: 18, atk: 8, def: 1, spd: 9, exp: 10, gold: 5, element: 'none', skills: ['poison_bite'] },
        { name: '骷髅兵', type: 'skeleton', hp: 30, atk: 7, def: 3, spd: 4, exp: 14, gold: 8, element: 'dark', skills: [] },
    ],
    2: [
        { name: '哥布林战士', type: 'goblin', hp: 40, atk: 12, def: 4, spd: 6, exp: 22, gold: 14, element: 'none', skills: [] },
        { name: '冰霜幽灵', type: 'ghost', hp: 35, atk: 14, def: 3, spd: 10, exp: 20, gold: 12, element: 'ice', skills: ['ice_fang'] },
        { name: '毒蝎', type: 'scorpion', hp: 45, atk: 11, def: 5, spd: 5, exp: 24, gold: 16, element: 'earth', skills: ['poison_bite'] },
    ],
    3: [
        { name: '火焰蜥蜴', type: 'lizard', hp: 55, atk: 16, def: 6, spd: 7, exp: 30, gold: 20, element: 'fire', skills: ['fire_breath'] },
        { name: '暗影刺客', type: 'assassin', hp: 40, atk: 20, def: 4, spd: 12, exp: 28, gold: 18, element: 'dark', skills: ['shadow_strike'] },
        { name: '石头傀儡', type: 'golem', hp: 80, atk: 10, def: 12, spd: 2, exp: 35, gold: 25, element: 'earth', skills: [] },
    ],
    4: [
        { name: '雷电元素', type: 'elemental', hp: 50, atk: 22, def: 5, spd: 11, exp: 35, gold: 22, element: 'lightning', skills: ['thunder_strike'] },
        { name: '吸血鬼伯爵', type: 'vampire', hp: 60, atk: 18, def: 7, spd: 9, exp: 38, gold: 28, element: 'dark', skills: ['heal'] },
        { name: '深渊恶魔', type: 'demon', hp: 70, atk: 20, def: 8, spd: 8, exp: 40, gold: 30, element: 'fire', skills: ['fire_breath'] },
    ],
    5: [
        { name: '死亡骑士', type: 'death_knight', hp: 90, atk: 24, def: 12, spd: 6, exp: 50, gold: 35, element: 'dark', skills: ['shadow_strike', 'heal'] },
        { name: '冰霜巨龙', type: 'dragon', hp: 100, atk: 28, def: 10, spd: 7, exp: 55, gold: 40, element: 'ice', skills: ['ice_fang'] },
        { name: '远古巨人', type: 'giant', hp: 150, atk: 18, def: 15, spd: 3, exp: 60, gold: 45, element: 'earth', skills: ['enrage'] },
    ],
};

const BOSSES = {
    1: { name: '骷髅王', type: 'boss', hp: 120, atk: 18, def: 8, spd: 5, exp: 60, gold: 40, element: 'dark', skills: ['shadow_strike', 'summon'], desc: '统领亡灵大军的王者' },
    2: { name: '冰霜女巫', type: 'boss', hp: 160, atk: 22, def: 10, spd: 7, exp: 90, gold: 60, element: 'ice', skills: ['ice_fang', 'heal'], desc: '掌握极寒之力的魔女' },
    3: { name: '炎魔将军', type: 'boss', hp: 220, atk: 30, def: 14, spd: 6, exp: 130, gold: 90, element: 'fire', skills: ['fire_breath', 'enrage'], desc: '燃烧一切的火焰领主' },
    4: { name: '雷霆领主', type: 'boss', hp: 280, atk: 35, def: 16, spd: 10, exp: 180, gold: 130, element: 'lightning', skills: ['thunder_strike', 'summon'], desc: '掌控雷电的上古存在' },
    5: { name: '混沌魔君', type: 'boss', hp: 400, atk: 45, def: 20, spd: 8, exp: 300, gold: 200, element: 'dark', skills: ['shadow_strike', 'fire_breath', 'enrage', 'heal'], desc: '毁灭一切的终极魔王' },
};

const ELITE_ENEMIES = [
    { name: '💎 精英史莱姆王', type: 'elite_slime', hp: 80, atk: 15, def: 8, spd: 5, exp: 40, gold: 30, element: 'none', skills: ['heal', 'enrage'], rarity: 0.08 },
    { name: '💎 精英暗影刺客', type: 'elite_assassin', hp: 60, atk: 30, def: 6, spd: 15, exp: 45, gold: 35, element: 'dark', skills: ['shadow_strike', 'poison_bite'], rarity: 0.06 },
    { name: '💎 精英火焰领主', type: 'elite_fire', hp: 100, atk: 25, def: 12, spd: 8, exp: 50, gold: 40, element: 'fire', skills: ['fire_breath', 'enrage'], rarity: 0.05 },
    { name: '💎 精英冰霜守卫', type: 'elite_ice', hp: 120, atk: 20, def: 15, spd: 6, exp: 55, gold: 45, element: 'ice', skills: ['ice_fang', 'heal'], rarity: 0.04 },
    { name: '💎 精英死亡领主', type: 'elite_death', hp: 150, atk: 35, def: 18, spd: 9, exp: 70, gold: 60, element: 'dark', skills: ['shadow_strike', 'summon', 'enrage'], rarity: 0.03 },
];

const SHOP_ITEMS = [
    { item_id: 'potion_small', name: '小治疗药水', type: 'consumable', heal: 30, price: 15, rarity: 1, desc: '恢复30HP', unlock_floor: 1 },
    { item_id: 'potion_medium', name: '中治疗药水', type: 'consumable', heal: 60, price: 35, rarity: 2, desc: '恢复60HP', unlock_floor: 2 },
    { item_id: 'potion_large', name: '大治疗药水', type: 'consumable', heal: 100, price: 80, rarity: 3, desc: '恢复100HP', unlock_floor: 4 },
    { item_id: 'potion_full', name: '完全恢复药水', type: 'consumable', heal_full: true, price: 200, rarity: 4, desc: '完全恢复HP', unlock_floor: 7 },
    { item_id: 'antidote', name: '解毒草', type: 'consumable', cure_poison: true, price: 20, rarity: 1, desc: '解除中毒状态', unlock_floor: 1 },
    { item_id: 'atk_scroll', name: '力量卷轴', type: 'consumable', buff_atk: 5, buff_duration: 3, price: 60, rarity: 2, desc: '攻击+5持续3回合', unlock_floor: 3 },
    { item_id: 'def_scroll', name: '铁壁卷轴', type: 'consumable', buff_def: 5, buff_duration: 3, price: 60, rarity: 2, desc: '防御+5持续3回合', unlock_floor: 3 },
    { item_id: 'spd_scroll', name: '疾风卷轴', type: 'consumable', buff_spd: 3, buff_duration: 3, price: 50, rarity: 2, desc: '速度+3持续3回合', unlock_floor: 3 },
    { item_id: 'wooden_sword', name: '木剑', type: 'weapon', atk: 3, price: 25, rarity: 1, desc: '攻击+3', unlock_floor: 1 },
    { item_id: 'iron_sword', name: '铁剑', type: 'weapon', atk: 7, price: 60, rarity: 2, desc: '攻击+7', unlock_floor: 2 },
    { item_id: 'steel_sword', name: '钢制长剑', type: 'weapon', atk: 12, price: 150, rarity: 3, desc: '攻击+12', unlock_floor: 4 },
    { item_id: 'flame_sword', name: '烈焰之剑', type: 'weapon', atk: 18, price: 300, rarity: 4, desc: '攻击+18', unlock_floor: 6 },
    { item_id: 'shadow_blade', name: '暗影之刃', type: 'weapon', atk: 25, price: 500, rarity: 5, desc: '攻击+25', unlock_floor: 8 },
    { item_id: 'wooden_staff', name: '木杖', type: 'weapon', atk: 4, spd: 1, price: 30, rarity: 1, desc: '攻击+4 速度+1', unlock_floor: 1 },
    { item_id: 'crystal_staff', name: '水晶法杖', type: 'weapon', atk: 15, spd: 2, price: 200, rarity: 3, desc: '攻击+15 速度+2', unlock_floor: 5 },
    { item_id: 'leather_armor', name: '皮甲', type: 'armor', def: 3, price: 30, rarity: 1, desc: '防御+3', unlock_floor: 1 },
    { item_id: 'chain_mail', name: '锁子甲', type: 'armor', def: 6, price: 70, rarity: 2, desc: '防御+6', unlock_floor: 2 },
    { item_id: 'plate_armor', name: '板甲', type: 'armor', def: 10, price: 160, rarity: 3, desc: '防御+10', unlock_floor: 4 },
    { item_id: 'mithril_armor', name: '秘银铠甲', type: 'armor', def: 16, price: 350, rarity: 4, desc: '防御+16', unlock_floor: 6 },
    { item_id: 'dragon_armor', name: '龙鳞甲', type: 'armor', def: 22, price: 600, rarity: 5, desc: '防御+22', unlock_floor: 9 },
    { item_id: 'speed_ring', name: '疾风戒指', type: 'accessory', spd: 2, price: 100, rarity: 2, desc: '速度+2', unlock_floor: 2 },
    { item_id: 'life_pendant', name: '生命吊坠', type: 'accessory', max_hp: 25, price: 120, rarity: 2, desc: '最大HP+25', unlock_floor: 3 },
    { item_id: 'power_ring', name: '力量戒指', type: 'accessory', atk: 5, price: 180, rarity: 3, desc: '攻击+5', unlock_floor: 4 },
    { item_id: 'guard_ring', name: '守护戒指', type: 'accessory', def: 5, price: 180, rarity: 3, desc: '防御+5', unlock_floor: 4 },
    { item_id: 'golden_ring', name: '黄金戒指', type: 'accessory', gold_bonus: 0.2, price: 250, rarity: 3, desc: '金币获取+20%', unlock_floor: 5 },
    { item_id: 'exp_pendant', name: '经验吊坠', type: 'accessory', exp_bonus: 0.15, price: 300, rarity: 4, desc: '经验获取+15%', unlock_floor: 6 },
];

const RARITY_COLORS = {
    1: '#ffffff',
    2: '#44cc44',
    3: '#4488ff',
    4: '#cc44ff',
    5: '#ff8800'
};

const DIFFICULTY_SETTINGS = {
    easy: {
        name: '简单',
        icon: '🟢',
        desc: '敌人属性-20%，掉落+30%',
        enemy_mult: 0.8,
        loot_mult: 1.3,
        exp_mult: 1.2,
        trap_damage_mult: 0.7,
        boss_hp_mult: 0.7,
    },
    normal: {
        name: '普通',
        icon: '🟡',
        desc: '标准难度',
        enemy_mult: 1.0,
        loot_mult: 1.0,
        exp_mult: 1.0,
        trap_damage_mult: 1.0,
        boss_hp_mult: 1.0,
    },
    hard: {
        name: '困难',
        icon: '🔴',
        desc: '敌人属性+50%，经验-20%',
        enemy_mult: 1.5,
        loot_mult: 0.8,
        exp_mult: 0.8,
        trap_damage_mult: 1.5,
        boss_hp_mult: 1.5,
    },
    nightmare: {
        name: '噩梦',
        icon: '💀',
        desc: '敌人属性+100%，死亡永久',
        enemy_mult: 2.0,
        loot_mult: 0.6,
        exp_mult: 0.6,
        trap_damage_mult: 2.0,
        boss_hp_mult: 2.0,
        permadeath: true,
    },
};

const ACHIEVEMENTS = {
    first_blood: { name: '初次击杀', desc: '击败第一个敌人', icon: '⚔️', reward: { gold: 20 } },
    floor_5: { name: '深入地牢', desc: '到达第5层', icon: '🏰', reward: { gold: 50 } },
    floor_10: { name: '地牢探索者', desc: '到达第10层', icon: '🗺️', reward: { gold: 100 } },
    boss_slayer: { name: 'Boss猎人', desc: '击败5个Boss', icon: '👑', reward: { gold: 200 } },
    elite_hunter: { name: '精英猎手', desc: '击败10个精英怪物', icon: '💎', reward: { gold: 150 } },
    millionaire: { name: '富翁', desc: '拥有1000金币', icon: '💰', reward: { max_hp: 20 } },
    level_10: { name: '老练冒险者', desc: '达到10级', icon: '⭐', reward: { atk: 3, def: 3 } },
    no_damage: { name: '完美战斗', desc: '无伤击败Boss', icon: '🛡️', reward: { gold: 300 } },
    combo_5: { name: '连击大师', desc: '达成5连杀', icon: '🔥', reward: { spd: 0.5 } },
    all_characters: { name: '全职业精通', desc: '使用所有角色通关', icon: '🎭', reward: { hp: 50, atk: 10, def: 10 } },
};

const RANDOM_EVENTS = [
    {
        id: 'mystery_merchant',
        name: '神秘商人',
        icon: '🧙',
        desc: '一个神秘的商人出现，提供稀有商品',
        chance: 0.15,
        action: 'shop',
    },
    {
        id: 'treasure_mimic',
        name: '宝箱怪',
        icon: '📦',
        desc: '宝箱突然张开大嘴！',
        chance: 0.1,
        action: 'battle',
        enemy: { name: '宝箱怪', hp: 40, atk: 15, def: 8, spd: 3, exp: 30, gold: 50, element: 'none', skills: [] },
    },
    {
        id: 'healing_spring',
        name: '治愈之泉',
        icon: '⛲',
        desc: '发现一处治愈之泉，恢复所有HP',
        chance: 0.08,
        action: 'heal',
        heal_pct: 1.0,
    },
    {
        id: 'cursed_altar',
        name: '诅咒祭坛',
        icon: '🗿',
        desc: '触碰祭坛获得力量，但付出代价',
        chance: 0.1,
        action: 'trade',
        gain: { atk: 5, def: 3 },
        cost: { hp_pct: 0.3 },
    },
    {
        id: 'wandering_spirit',
        name: '游荡的灵魂',
        icon: '👻',
        desc: '灵魂传授你战斗技巧',
        chance: 0.12,
        action: 'buff',
        buff: { atk: 3, duration: 999 },
    },
    {
        id: 'treasure_room',
        name: '宝藏密室',
        icon: '💎',
        desc: '发现隐藏的宝藏！',
        chance: 0.08,
        action: 'loot',
        gold: [50, 150],
        item_chance: 0.5,
    },
    {
        id: 'ambush',
        name: '伏击！',
        icon: '⚠️',
        desc: '一群敌人埋伏了你！',
        chance: 0.12,
        action: 'ambush',
        enemy_count: [2, 4],
    },
    {
        id: 'level_up_shrine',
        name: '升级神殿',
        icon: '🏛️',
        desc: '神殿赐予你经验值',
        chance: 0.06,
        action: 'exp',
        exp_pct: 0.5,
    },
];

const SKILL_TREE = {
    warrior: {
        name: '战士天赋',
        skills: [
            { id: 'w_hp', name: '生命强化', desc: '最大HP+20', cost: 1, effect: { max_hp: 20 }, max_level: 3 },
            { id: 'w_atk', name: '攻击强化', desc: '攻击+5', cost: 1, effect: { atk: 5 }, max_level: 3 },
            { id: 'w_def', name: '防御强化', desc: '防御+3', cost: 1, effect: { def: 3 }, max_level: 3 },
            { id: 'w_crit', name: '暴击强化', desc: '暴击率+10%', cost: 2, effect: { crit_chance: 10 }, max_level: 2 },
            { id: 'w_rage', name: '狂暴之心', desc: 'HP<30%时攻击+50%', cost: 3, effect: { rage_threshold: 0.3, rage_bonus: 0.5 }, max_level: 1 },
        ]
    },
    mage: {
        name: '法师天赋',
        skills: [
            { id: 'm_atk', name: '魔力强化', desc: '攻击+8', cost: 1, effect: { atk: 8 }, max_level: 3 },
            { id: 'm_spd', name: '施法加速', desc: '速度+1', cost: 1, effect: { spd: 1 }, max_level: 3 },
            { id: 'm_elem', name: '元素亲和', desc: '元素伤害+20%', cost: 2, effect: { elem_bonus: 0.2 }, max_level: 2 },
            { id: 'm_drain', name: '魔力吸收', desc: '10%吸血', cost: 2, effect: { lifesteal: 0.1 }, max_level: 2 },
            { id: 'm_burst', name: '奥术爆发', desc: '暴击伤害+50%', cost: 3, effect: { crit_damage: 0.5 }, max_level: 1 },
        ]
    },
    thief: {
        name: '盗贼天赋',
        skills: [
            { id: 't_spd', name: '疾风步', desc: '速度+2', cost: 1, effect: { spd: 2 }, max_level: 3 },
            { id: 't_crit', name: '致命打击', desc: '暴击率+15%', cost: 1, effect: { crit_chance: 15 }, max_level: 3 },
            { id: 't_dodge', name: '闪避大师', desc: '闪避率+10%', cost: 2, effect: { dodge: 10 }, max_level: 2 },
            { id: 't_poison', name: '淬毒', desc: '攻击附带中毒', cost: 2, effect: { poison_chance: 20 }, max_level: 2 },
            { id: 't_assassinate', name: '暗杀', desc: '暴击伤害+80%', cost: 3, effect: { crit_damage: 0.8 }, max_level: 1 },
        ]
    },
    knight: {
        name: '骑士天赋',
        skills: [
            { id: 'k_hp', name: '坚韧', desc: '最大HP+30', cost: 1, effect: { max_hp: 30 }, max_level: 3 },
            { id: 'k_def', name: '钢铁之躯', desc: '防御+5', cost: 1, effect: { def: 5 }, max_level: 3 },
            { id: 'k_block', name: '盾牌大师', desc: '格挡率+15%', cost: 2, effect: { block_chance: 15 }, max_level: 2 },
            { id: 'k_heal', name: '圣光', desc: '防御时恢复5%HP', cost: 2, effect: { heal_on_defend: 0.05 }, max_level: 2 },
            { id: 'k_aura', name: '守护光环', desc: '受到伤害-20%', cost: 3, effect: { damage_reduce: 0.2 }, max_level: 1 },
        ]
    },
    priest: {
        name: '牧师天赋',
        skills: [
            { id: 'p_heal', name: '治愈之光', desc: '治疗效果+30%', cost: 1, effect: { heal_bonus: 0.3 }, max_level: 3 },
            { id: 'p_hp', name: '神圣庇护', desc: '最大HP+25', cost: 1, effect: { max_hp: 25 }, max_level: 3 },
            { id: 'p_def', name: '圣盾术', desc: '防御+4', cost: 1, effect: { def: 4 }, max_level: 3 },
            { id: 'p_purify', name: '净化', desc: '回合结束概率清除负面状态', cost: 2, effect: { purify_chance: 25 }, max_level: 2 },
            { id: 'p_resurrect', name: '复活', desc: '死亡时30%概率复活(1HP)', cost: 3, effect: { resurrect_chance: 30 }, max_level: 1 },
        ]
    },
    ranger: {
        name: '游侠天赋',
        skills: [
            { id: 'r_atk', name: '精准射击', desc: '攻击+6', cost: 1, effect: { atk: 6 }, max_level: 3 },
            { id: 'r_spd', name: '疾风之翼', desc: '速度+2', cost: 1, effect: { spd: 2 }, max_level: 3 },
            { id: 'r_crit', name: '鹰眼', desc: '暴击率+12%', cost: 2, effect: { crit_chance: 12 }, max_level: 2 },
            { id: 'r_multi', name: '多重射击', desc: '20%概率攻击两次', cost: 2, effect: { multi_attack: 20 }, max_level: 2 },
            { id: 'r_headshot', name: '爆头', desc: '暴击时50%概率秒杀小怪', cost: 3, effect: { headshot_chance: 50 }, max_level: 1 },
        ]
    },
    monk: {
        name: '武僧天赋',
        skills: [
            { id: 'mo_hp', name: '内功', desc: '最大HP+20', cost: 1, effect: { max_hp: 20 }, max_level: 3 },
            { id: 'mo_atk', name: '拳法', desc: '攻击+4', cost: 1, effect: { atk: 4 }, max_level: 3 },
            { id: 'mo_counter', name: '反击强化', desc: '反击率+15%', cost: 2, effect: { counter_chance: 15 }, max_level: 2 },
            { id: 'mo_heal', name: '气功', desc: '每回合恢复3%HP', cost: 2, effect: { regen_pct: 0.03 }, max_level: 2 },
            { id: 'mo_perfect', name: '金刚不坏', desc: '格挡时完全免疫', cost: 3, effect: { perfect_block: true }, max_level: 1 },
        ]
    },
    warlock: {
        name: '术士天赋',
        skills: [
            { id: 'wa_atk', name: '暗影之力', desc: '攻击+7', cost: 1, effect: { atk: 7 }, max_level: 3 },
            { id: 'wa_drain', name: '生命吸取', desc: '吸血+10%', cost: 1, effect: { lifesteal: 0.1 }, max_level: 3 },
            { id: 'wa_dot', name: '痛苦诅咒', desc: '攻击附带流血', cost: 2, effect: { bleed_chance: 25 }, max_level: 2 },
            { id: 'wa_fear', name: '恐惧', desc: '15%概率使敌人眩晕', cost: 2, effect: { stun_chance: 15 }, max_level: 2 },
            { id: 'wa_drain_soul', name: '灵魂收割', desc: '击杀恢复30%HP', cost: 3, effect: { kill_heal: 0.3 }, max_level: 1 },
        ]
    },
    assassin: {
        name: '刺客天赋',
        skills: [
            { id: 'as_atk', name: '暗杀术', desc: '攻击+10', cost: 1, effect: { atk: 10 }, max_level: 3 },
            { id: 'as_crit', name: '致命一击', desc: '暴击率+20%', cost: 1, effect: { crit_chance: 20 }, max_level: 3 },
            { id: 'as_spd', name: '影遁', desc: '速度+3', cost: 2, effect: { spd: 3 }, max_level: 2 },
            { id: 'as_poison', name: '剧毒', desc: '攻击附带强力中毒', cost: 2, effect: { poison_chance: 35 }, max_level: 2 },
            { id: 'as_execute', name: '处刑', desc: 'HP<20%的敌人直接击杀', cost: 3, effect: { execute_threshold: 0.2 }, max_level: 1 },
        ]
    },
    paladin: {
        name: '圣骑士天赋',
        skills: [
            { id: 'pa_hp', name: '圣光灌注', desc: '最大HP+35', cost: 1, effect: { max_hp: 35 }, max_level: 3 },
            { id: 'pa_def', name: '神圣铠甲', desc: '防御+6', cost: 1, effect: { def: 6 }, max_level: 3 },
            { id: 'pa_heal', name: '圣疗术', desc: '防御时恢复8%HP', cost: 2, effect: { heal_on_defend: 0.08 }, max_level: 2 },
            { id: 'pa_aura', name: '虔诚光环', desc: '受到暗属性伤害-50%', cost: 2, effect: { dark_resist: 0.5 }, max_level: 2 },
            { id: 'pa_judgement', name: '神圣审判', desc: '对暗属性敌人伤害+100%', cost: 3, effect: { dark_bonus: 1.0 }, max_level: 1 },
        ]
    },
    elementalist: {
        name: '元素使天赋',
        skills: [
            { id: 'e_atk', name: '元素之力', desc: '攻击+8', cost: 1, effect: { atk: 8 }, max_level: 3 },
            { id: 'e_spd', name: '元素亲和', desc: '速度+1.5', cost: 1, effect: { spd: 1.5 }, max_level: 3 },
            { id: 'e_elem', name: '元素精通', desc: '元素伤害+30%', cost: 2, effect: { elem_bonus: 0.3 }, max_level: 2 },
            { id: 'e_chain', name: '连锁反应', desc: '25%概率触发额外元素攻击', cost: 2, effect: { chain_chance: 25 }, max_level: 2 },
            { id: 'e_storm', name: '元素风暴', desc: '每次攻击随机触发多元素', cost: 3, effect: { multi_element: true }, max_level: 1 },
        ]
    },
    berserker: {
        name: '狂战士天赋',
        skills: [
            { id: 'b_atk', name: '狂暴', desc: '攻击+12', cost: 1, effect: { atk: 12 }, max_level: 3 },
            { id: 'b_hp', name: '血怒', desc: '最大HP+15', cost: 1, effect: { max_hp: 15 }, max_level: 3 },
            { id: 'b_rage', name: '暴走', desc: 'HP越低攻击越高(最大+80%)', cost: 2, effect: { rage_bonus: 0.8 }, max_level: 2 },
            { id: 'b_lifesteal', name: '嗜血', desc: '吸血+15%', cost: 2, effect: { lifesteal: 0.15 }, max_level: 2 },
            { id: 'b_frenzy', name: '狂战之魂', desc: 'HP<50%时速度+50%', cost: 3, effect: { frenzy_threshold: 0.5, frenzy_spd: 0.5 }, max_level: 1 },
        ]
    },
};

const EQUIPMENT_ENHANCE = {
    max_level: 10,
    cost_base: 50,
    cost_mult: 1.5,
    success_rate: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
    stat_bonus_per_level: 0.1,
};

const Game = {
    state: 'menu',
    player: null,
    dungeon: null,
    items: null,
    battleEnemy: null,
    enemies: [],
    bossEnemy: null,
    selectedCharacter: 'warrior',
    difficulty: 'normal',
    combo: 0,
    comboTimer: null,
    achievements: {},
    skillPoints: 0,
    learnedSkills: {},
    bossDefeated: 0,
    eliteDefeated: 0,
    perfectBossKills: 0,

    async loadConfig() {
        try {
            const resp = await fetch('/api/config');
            const data = await resp.json();
            this.items = data.items;
        } catch (e) {
            console.warn('Failed to load config from server, using defaults');
            this.items = {};
        }
    },

    newGame(name, characterId, difficulty) {
        const charClass = CHARACTERS[characterId] || CHARACTERS.warrior;
        this.selectedCharacter = characterId;
        this.difficulty = difficulty || 'normal';
        this.combo = 0;
        this.achievements = {};
        this.skillPoints = 0;
        this.learnedSkills = {};
        this.bossDefeated = 0;
        this.eliteDefeated = 0;
        this.perfectBossKills = 0;

        const diffSettings = DIFFICULTY_SETTINGS[this.difficulty];
        this.player = {
            player_id: name.toLowerCase().replace(/\s/g, '_'),
            name: name,
            character: characterId,
            difficulty: this.difficulty,
            level: 1, exp: 0, exp_to_next: 30,
            current_hp: charClass.base_hp,
            max_hp: charClass.base_hp,
            atk: charClass.base_atk,
            def: charClass.base_def,
            spd: charClass.base_spd,
            floor: 1, gold: 30,
            equipment: { weapon: null, armor: null, accessory: null },
            inventory: [...charClass.start_items],
            statusEffects: [],
            skillPoints: 0,
            learnedSkills: {},
            achievements: {},
            killCount: 0,
        };
        this.enterFloor(1);
        this.state = 'exploring';
        UI.clearLog();
        UI.addLog(`🎮 难度: ${diffSettings.icon} ${diffSettings.name}`, 'info');
        UI.addLog(`欢迎来到暗影地牢，${charClass.name} ${name}！`, 'info');
        UI.addLog('使用 WASD/方向键 移动，空格键 交互', 'info');
        this.updateUI();
    },

    async loadGame(playerId) {
        try {
            const resp = await fetch(`/api/load/${playerId}`);
            const data = await resp.json();
            if (data.success) {
                this.player = data.player;
                document.getElementById('menu-screen').classList.add('hidden');
                document.getElementById('game-container').style.display = 'flex';
                requestAnimationFrame(() => {
                    Renderer.resizeCanvas();
                    this.enterFloor(this.player.floor);
                    this.state = 'exploring';
                    UI.hideOverlay();
                    UI.clearLog();
                    UI.addLog(`欢迎回来，${this.player.name}！`, 'info');
                    this.updateUI();
                });
            } else {
                UI.showToast('加载失败: ' + data.error, 'error');
            }
        } catch (e) {
            UI.showToast('加载失败', 'error');
        }
    },

    async saveGame() {
        if (!this.player) return;
        try {
            const resp = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.player)
            });
            const data = await resp.json();
            if (data.success) {
                UI.showToast('保存成功！', 'success');
            } else {
                UI.showToast('保存失败', 'error');
            }
        } catch (e) {
            UI.showToast('保存失败', 'error');
        }
    },

    enterFloor(floor) {
        this.player.floor = floor;
        this.dungeon = Core.generateDungeon(floor);
        Renderer.resetExplored();
        Renderer.updateExplored(this.dungeon.playerStart.x, this.dungeon.playerStart.y, 4);
        this.spawnEnemies();
        this.render();

        if (floor >= 5) this.checkAchievement('floor_5');
        if (floor >= 10) this.checkAchievement('floor_10');

        if (floor > 1 && Math.random() < 0.25) {
            this.triggerRandomEvent();
        }
    },

    spawnEnemies() {
        this.enemies = [];
        this.bossEnemy = null;

        const currentFloor = this.player.floor;
        const floorKey = Math.min(currentFloor, 5);
        const floorEnemies = ENEMIES_BY_FLOOR[floorKey] || ENEMIES_BY_FLOOR[5];
        const scale = 1 + (currentFloor - 1) * 0.25;
        const maxEnemies = Math.min(5 + Math.floor(currentFloor / 2), 12);

        for (const room of this.dungeon.rooms) {
            if (room.type === 'start') continue;

            if (room.type === 'boss') {
                const bossKey = Math.min(currentFloor, 5);
                const bossData = BOSSES[bossKey] || BOSSES[5];
                const bossScale = 1 + (currentFloor - 1) * 0.2;
                this.bossEnemy = {
                    type: 'boss',
                    name: bossData.name,
                    element: bossData.element,
                    skills: bossData.skills,
                    x: room.x + Math.floor(room.w / 2),
                    y: room.y + Math.floor(room.h / 2),
                    current_hp: Math.floor(bossData.hp * bossScale),
                    max_hp: Math.floor(bossData.hp * bossScale),
                    atk: Math.floor(bossData.atk * bossScale),
                    def: Math.floor(bossData.def * bossScale),
                    spd: bossData.spd,
                    exp_reward: Math.floor(bossData.exp * bossScale),
                    gold_reward: Math.floor(bossData.gold * bossScale),
                    alive: true,
                    isElite: false,
                    statusEffects: [],
                    buffs: {},
                };
                continue;
            }

            if (room.type === 'chest' || room.type === 'shop') continue;

            const enemyCount = Math.random() < 0.4 ? 1 : (Math.random() < 0.6 ? 2 : 3);
            for (let i = 0; i < enemyCount && this.enemies.length < maxEnemies; i++) {
                const isElite = Math.random() < 0.08;
                let template;

                if (isElite) {
                    const elitePool = ELITE_ENEMIES.filter(e => e.rarity >= Math.random());
                    template = elitePool.length > 0 ? elitePool[Math.floor(Math.random() * elitePool.length)] : floorEnemies[Math.floor(Math.random() * floorEnemies.length)];
                } else {
                    template = floorEnemies[Math.floor(Math.random() * floorEnemies.length)];
                }

                const ex = room.x + 1 + Math.floor(Math.random() * Math.max(1, room.w - 2));
                const ey = room.y + 1 + Math.floor(Math.random() * Math.max(1, room.h - 2));

                if (ex === this.dungeon.playerStart.x && ey === this.dungeon.playerStart.y) continue;

                const enemyScale = isElite ? scale * 1.5 : scale;
                this.enemies.push({
                    type: template.type,
                    name: template.name,
                    element: template.element || 'none',
                    skills: template.skills || [],
                    x: ex,
                    y: ey,
                    current_hp: Math.floor(template.hp * enemyScale),
                    max_hp: Math.floor(template.hp * enemyScale),
                    atk: Math.floor(template.atk * enemyScale),
                    def: Math.floor(template.def * enemyScale),
                    spd: template.spd,
                    exp_reward: Math.floor(template.exp * enemyScale),
                    gold_reward: Math.floor(template.gold * enemyScale),
                    alive: true,
                    isElite: isElite,
                    statusEffects: [],
                    buffs: {},
                });
            }
        }
    },

    movePlayer(dx, dy) {
        if (this.state !== 'exploring') return;

        const newX = this.dungeon.playerStart.x + dx;
        const newY = this.dungeon.playerStart.y + dy;

        if (newX < 0 || newX >= 40 || newY < 0 || newY >= 30) return;
        if (this.dungeon.map[newY][newX] === 0) return;

        const enemyAtPos = this.enemies.find(e => e.alive && e.x === newX && e.y === newY);
        if (enemyAtPos) {
            this.battleEnemy = enemyAtPos;
            this.state = 'battle';
            UI.addLog(`遭遇了 ${enemyAtPos.name}！`, 'damage');
            UI.showEnemyPanel(enemyAtPos);
            this.updateUI();
            return;
        }

        if (this.bossEnemy && this.bossEnemy.x === newX && this.bossEnemy.y === newY) {
            this.battleEnemy = this.bossEnemy;
            this.state = 'battle';
            UI.addLog(`Boss ${this.bossEnemy.name} 出现了！`, 'damage');
            UI.showEnemyPanel(this.bossEnemy);
            this.updateUI();
            return;
        }

        this.dungeon.playerStart.x = newX;
        this.dungeon.playerStart.y = newY;
        Renderer.updateExplored(newX, newY, 4);

        const tile = this.dungeon.map[newY][newX];
        if (tile === 3) {
            UI.addLog('你发现了通往下层的楼梯！按空格键进入。', 'info');
        } else if (tile === 5) {
            this.openChest(newX, newY);
        } else if (tile === 6) {
            this.state = 'shop';
            UI.addLog('你进入了商店！', 'info');
            UI.showShop();
        } else if (tile === 7) {
            this.triggerTrap();
        }

        this.render();
    },

    interact() {
        if (this.state !== 'exploring') return;

        const tile = this.dungeon.map[this.dungeon.playerStart.y][this.dungeon.playerStart.x];
        if (tile === 3) {
            this.nextFloor();
        }
    },

    openChest(x, y) {
        const goldAmount = 10 + Math.floor(Math.random() * 21);
        this.player.gold += goldAmount;
        this.dungeon.map[y][x] = 1;
        UI.addLog(`打开宝箱获得 ${goldAmount} 金币！`, 'loot');

        if (Math.random() < 0.5) {
            const potions = ['potion_small', 'potion_medium'];
            const itemId = potions[Math.floor(Math.random() * potions.length)];
            const item = this.items ? this.items[itemId] : { name: '药水', type: 'consumable', heal: 30 };
            this.player.inventory.push({
                item_id: itemId,
                name: item.name,
                type: item.type,
                heal: item.heal,
                rarity: item.rarity || 1
            });
            UI.addLog(`获得了 ${item.name}！`, 'loot');
        }
        this.updateUI();
    },

    triggerTrap() {
        const avoidChance = Math.max(10, 30 - this.player.floor * 2);
        if (Math.random() * 100 < avoidChance) {
            UI.addLog('你机敏地避开了陷阱！', 'info');
        } else {
            const trapTypes = [
                { name: '毒针陷阱', damage_pct: 0.15, status: 'poison', status_chance: 50 },
                { name: '火焰陷阱', damage_pct: 0.2, status: 'burn', status_chance: 40 },
                { name: '冰冻陷阱', damage_pct: 0.1, status: 'freeze', status_chance: 60 },
                { name: '尖刺陷阱', damage_pct: 0.25, status: 'bleed', status_chance: 30 },
            ];
            const trap = trapTypes[Math.floor(Math.random() * trapTypes.length)];
            const damage = Math.floor(this.player.max_hp * trap.damage_pct);
            this.player.current_hp = Math.max(1, this.player.current_hp - damage);
            UI.addLog(`触发${trap.name}！受到 ${damage} 点伤害！`, 'damage');

            if (Math.random() * 100 < trap.status_chance) {
                this.applyStatusEffect(this.player, trap.status);
            }

            if (this.player.current_hp <= 0) {
                this.gameOver();
            }
        }
        this.updateUI();
    },

    applyStatusEffect(target, effectType) {
        if (!target.statusEffects) target.statusEffects = [];
        const existing = target.statusEffects.find(e => e.type === effectType);
        if (existing) {
            existing.remaining = STATUS_EFFECTS[effectType].duration;
        } else {
            target.statusEffects.push({
                type: effectType,
                remaining: STATUS_EFFECTS[effectType].duration
            });
            const effect = STATUS_EFFECTS[effectType];
            UI.addLog(`${target.name || '你'}被施加了${effect.icon}${effect.name}！`, 'damage');
        }
    },

    processStatusEffects(target) {
        if (!target.statusEffects || target.statusEffects.length === 0) return;
        const toRemove = [];

        target.statusEffects.forEach((effect, idx) => {
            const effectData = STATUS_EFFECTS[effect.type];
            if (effectData.damage_pct) {
                const damage = Math.floor(target.max_hp * effectData.damage_pct);
                target.current_hp = Math.max(0, target.current_hp - damage);
                UI.addLog(`${target.name || '你'}受到${effectData.icon}${effectData.name}伤害 ${damage}！`, 'damage');
            }
            effect.remaining--;
            if (effect.remaining <= 0) {
                toRemove.push(idx);
                UI.addLog(`${target.name || '你'}的${effectData.icon}${effectData.name}效果消失了`, 'info');
            }
        });

        toRemove.reverse().forEach(idx => target.statusEffects.splice(idx, 1));
    },

    getElementMultiplier(attackerElement, defenderElement) {
        if (!attackerElement || !defenderElement || attackerElement === 'none' || defenderElement === 'none') return 1;
        const elem = ELEMENTS[attackerElement];
        if (elem && elem.strong === defenderElement) return 1.5;
        if (elem && elem.weak === defenderElement) return 0.7;
        return 1;
    },

    enemyUseSkill(enemy, player) {
        if (!enemy.skills || enemy.skills.length === 0) return null;

        const usableSkills = enemy.skills.filter(skillId => {
            const skill = ENEMY_SKILLS[skillId];
            if (!skill) return false;
            if (skillId === 'heal' && enemy.current_hp > enemy.max_hp * 0.7) return false;
            if (skillId === 'summon' && this.enemies.filter(e => e.alive).length >= 8) return false;
            return Math.random() < 0.4;
        });

        if (usableSkills.length === 0) return null;

        const skillId = usableSkills[Math.floor(Math.random() * usableSkills.length)];
        const skill = ENEMY_SKILLS[skillId];

        if (skill.damage_mult > 0) {
            const baseDmg = Core.calcDamage(enemy.atk, player.def);
            const elemMult = this.getElementMultiplier(skill.element, player.element || 'none');
            const damage = Math.floor(baseDmg * skill.damage_mult * elemMult);
            player.current_hp = Math.max(0, player.current_hp - damage);

            let logMsg = `${enemy.name}使用了${skill.name}！造成${damage}点伤害！`;
            if (elemMult > 1) logMsg += '（克制！）';
            if (elemMult < 1) logMsg += '（抵抗）';
            UI.addLog(logMsg, 'damage');
            UI.showDamagePopup(window.innerWidth / 2 - 100, window.innerHeight / 2, damage, 'player-damage');

            if (skill.status && Math.random() * 100 < skill.status_chance) {
                this.applyStatusEffect(player, skill.status);
            }
        } else if (skill.heal_pct) {
            const healAmount = Math.floor(enemy.max_hp * skill.heal_pct);
            enemy.current_hp = Math.min(enemy.max_hp, enemy.current_hp + healAmount);
            UI.addLog(`${enemy.name}使用了${skill.name}，恢复${healAmount}HP！`, 'heal');
            UI.updateEnemyHP(enemy);
            UI.showDamagePopup(window.innerWidth / 2 + 100, window.innerHeight / 2, healAmount, 'heal');
        } else if (skill.buff_atk) {
            enemy.atk = Math.floor(enemy.atk * (1 + skill.buff_atk));
            UI.addLog(`${enemy.name}使用了${skill.name}，攻击力提升！`, 'damage');
        }

        return skill;
    },

    battleAction(action) {
        if (this.state !== 'battle' || !this.battleEnemy) return;

        const p = this.player;
        const e = this.battleEnemy;

        if (!p.statusEffects) p.statusEffects = [];
        if (!e.statusEffects) e.statusEffects = [];

        const playerStunned = p.statusEffects.some(eff => eff.type === 'stun');
        const enemyStunned = e.statusEffects.some(eff => eff.type === 'stun');

        if (action === 'flee') {
            let fleeChance = 30 + Math.floor((p.spd - e.spd) * 3);
            if (e.isElite) fleeChance -= 20;
            if (e.type === 'boss') fleeChance -= 30;
            if (Math.random() * 100 < Math.max(5, Math.min(80, fleeChance))) {
                UI.addLog('成功逃跑！', 'info');
                this.battleEnemy = null;
                this.state = 'exploring';
                UI.hideEnemyPanel();
                this.updateUI();
                return;
            } else {
                UI.addLog('逃跑失败！', 'damage');
            }
        } else if (action === 'defend') {
            UI.addLog('你摆出防御姿态！', 'info');
        }

        const playerFirst = p.spd >= e.spd;

        const doEnemyTurn = () => {
            if (enemyStunned) {
                UI.addLog(`${e.name}处于眩晕状态，无法行动！`, 'info');
                return;
            }

            if (this.playerPerfectBlock) {
                UI.addLog('完美格挡成功！完全抵消伤害！', 'info');
                this.playerPerfectBlock = false;
                return;
            }

            const skillUsed = this.enemyUseSkill(e, p);
            if (!skillUsed) {
                let dmg = Core.calcDamage(e.atk, p.def);
                if (action === 'defend') dmg = Math.floor(dmg / 2);

                const freezeEffect = p.statusEffects.find(eff => eff.type === 'freeze');
                if (freezeEffect) dmg = Math.floor(dmg * 1.3);

                p.current_hp = Math.max(0, p.current_hp - dmg);
                UI.addLog(`${e.name}造成 ${dmg} 点伤害！`, 'damage');
                UI.showDamagePopup(window.innerWidth / 2 - 100, window.innerHeight / 2, dmg, 'player-damage');

                const charClass = CHARACTERS[p.character] || CHARACTERS.warrior;
                if (charClass.counter_chance && Math.random() * 100 < charClass.counter_chance && e.current_hp > 0) {
                    const counterDmg = Math.floor(dmg * 0.5);
                    e.current_hp = Math.max(0, e.current_hp - counterDmg);
                    UI.addLog(`反击！对${e.name}造成 ${counterDmg} 点伤害！`, 'damage');
                    UI.updateEnemyHP(e);
                    UI.showDamagePopup(window.innerWidth / 2 + 100, window.innerHeight / 2, counterDmg, 'enemy-damage');
                }

                if (charClass.heal_bonus && action === 'defend') {
                    const healAmount = Math.floor(p.max_hp * 0.05 * charClass.heal_bonus);
                    p.current_hp = Math.min(p.max_hp, p.current_hp + healAmount);
                    UI.addLog(`防御时恢复 ${healAmount} HP！`, 'heal');
                    UI.showDamagePopup(window.innerWidth / 2 - 100, window.innerHeight / 2, healAmount, 'heal');
                }
            }
        };

        const doPlayerTurn = () => {
            if (playerStunned) {
                UI.addLog('你处于眩晕状态，无法行动！', 'info');
                return;
            }

            if (action === 'attack') {
                const charClass = CHARACTERS[p.character] || CHARACTERS.warrior;
                let dmg = Core.calcDamage(p.atk, e.def);

                const weaknessEffect = p.statusEffects.find(eff => eff.type === 'weakness');
                if (weaknessEffect) dmg = Math.floor(dmg * 0.7);

                let elemMult = this.getElementMultiplier(p.element || 'none', e.element || 'none');
                if (charClass.random_element) {
                    const elements = ['fire', 'ice', 'earth', 'lightning', 'water', 'dark', 'light'];
                    const randElem = elements[Math.floor(Math.random() * elements.length)];
                    elemMult = this.getElementMultiplier(randElem, e.element || 'none');
                    if (elemMult !== 1) UI.addLog(`触发${ELEMENTS[randElem].name}属性！`, 'info');
                }
                dmg = Math.floor(dmg * elemMult);

                let isCrit = false;
                const critChance = charClass.crit_chance || 5;
                if (Math.random() * 100 < critChance) {
                    const critMult = charClass.crit_damage || 1.5;
                    dmg = Math.floor(dmg * critMult);
                    isCrit = true;
                }

                if (charClass.rage_bonus) {
                    const hpPct = p.current_hp / p.max_hp;
                    if (hpPct < 0.5) {
                        const rageMult = 1 + (1 - hpPct) * 0.8;
                        dmg = Math.floor(dmg * rageMult);
                        if (hpPct < 0.3) UI.addLog('狂暴之力爆发！', 'damage');
                    }
                }

                e.current_hp = Math.max(0, e.current_hp - dmg);
                let logMsg = isCrit ? `暴击！你造成 ${dmg} 点伤害！` : `你造成 ${dmg} 点伤害！`;
                if (elemMult > 1) logMsg += '（克制！）';
                if (elemMult < 1) logMsg += '（抵抗）';
                UI.addLog(logMsg, 'damage');
                UI.updateEnemyHP(e);
                UI.showDamagePopup(window.innerWidth / 2, window.innerHeight / 2, dmg, isCrit ? 'critical' : 'enemy-damage');

                if (charClass.lifesteal) {
                    const healAmount = Math.floor(dmg * charClass.lifesteal);
                    p.current_hp = Math.min(p.max_hp, p.current_hp + healAmount);
                    UI.addLog(`吸血恢复 ${healAmount} HP！`, 'heal');
                }
            } else if (action === 'defend') {
                const charClass = CHARACTERS[p.character] || CHARACTERS.warrior;
                if (charClass.block_chance && Math.random() * 100 < charClass.block_chance) {
                    UI.addLog('完美格挡！本次防御无效！', 'info');
                    this.playerPerfectBlock = true;
                }
            }
        };

        if (playerFirst) {
            doPlayerTurn();
            this.processStatusEffects(e);
            if (e.current_hp > 0) {
                doEnemyTurn();
                this.processStatusEffects(p);
            }
        } else {
            doEnemyTurn();
            this.processStatusEffects(p);
            if (p.current_hp > 0) {
                doPlayerTurn();
                this.processStatusEffects(e);
            }
        }

        if (p.current_hp <= 0) {
            UI.addLog('你被击败了...', 'damage');
            this.gameOver();
            return;
        }

        if (e.current_hp <= 0) {
            const diffSettings = DIFFICULTY_SETTINGS[this.difficulty];
            const goldBonus = p.equipment?.accessory?.gold_bonus || 0;
            const expBonus = p.equipment?.accessory?.exp_bonus || 0;
            const goldReward = Math.floor(e.gold_reward * (1 + goldBonus) * diffSettings.loot_mult);
            const expReward = Math.floor(e.exp_reward * (1 + expBonus) * diffSettings.exp_mult);

            p.exp += expReward;
            p.gold += goldReward;
            p.killCount = (p.killCount || 0) + 1;
            this.addCombo();

            let lootMsg = `胜利！获得 ${expReward} 经验，${goldReward} 金币！`;
            if (e.isElite) {
                lootMsg += '（精英怪物额外奖励！）';
                this.eliteDefeated++;
                this.checkAchievement('elite_hunter');
            }
            UI.addLog(lootMsg, 'loot');

            this.checkAchievement('first_blood');

            while (p.exp >= p.exp_to_next) {
                p.exp -= p.exp_to_next;
                p.level++;
                const charClass = CHARACTERS[p.character] || CHARACTERS.warrior;
                p.max_hp += charClass.hp_growth;
                p.current_hp = p.max_hp;
                p.atk += charClass.atk_growth;
                p.def += charClass.def_growth;
                p.spd += charClass.spd_growth;
                p.exp_to_next = 20 * p.level * p.level + 10;
                this.applyEquipmentStats();
                UI.addLog(`升级了！当前等级 ${p.level}！`, 'level');
                this.skillPoints++;
                UI.addLog(`获得1技能点！按K打开技能树`, 'info');

                if (p.level >= 10) this.checkAchievement('level_10');
            }

            if (p.gold >= 1000) this.checkAchievement('millionaire');

            if (e === this.bossEnemy) {
                this.bossDefeated++;
                const bossDamageTaken = p.max_hp - p.current_hp;
                if (bossDamageTaken === 0) {
                    this.perfectBossKills++;
                    this.checkAchievement('no_damage');
                }
                UI.addLog('Boss被击败了！通往下层的通道已开启！', 'loot');
                this.bossEnemy = null;
                this.checkAchievement('boss_slayer');

                if (Math.random() < 0.3) {
                    this.triggerRandomEvent();
                }
            } else {
                const idx = this.enemies.indexOf(e);
                if (idx >= 0) {
                    this.enemies[idx].alive = false;
                }
            }

            this.battleEnemy = null;
            this.state = 'exploring';
            UI.hideEnemyPanel();
        }

        this.updateUI();
    },

    useItem(slot) {
        if (!this.player || slot >= this.player.inventory.length) return;
        const item = this.player.inventory[slot];
        if (item.type !== 'consumable') {
            UI.showToast('该物品无法在此使用', 'error');
            return;
        }

        if (item.heal) {
            const before = this.player.current_hp;
            this.player.current_hp = Math.min(this.player.max_hp, this.player.current_hp + item.heal);
            const healed = this.player.current_hp - before;
            UI.addLog(`使用 ${item.name}，恢复 ${healed} HP！`, 'heal');
        }

        this.player.inventory.splice(slot, 1);
        UI.hideOverlay();
        this.updateUI();
    },

    sellItem(slot) {
        if (!this.player || slot >= this.player.inventory.length) return;
        const item = this.player.inventory[slot];
        const shopItem = SHOP_ITEMS.find(i => i.item_id === item.item_id);
        const sellPrice = Math.floor((shopItem ? shopItem.price : 10) / 2);
        this.player.gold += sellPrice;
        this.player.inventory.splice(slot, 1);
        UI.addLog(`出售 ${item.name}，获得 ${sellPrice} 金币！`, 'loot');
        UI.hideOverlay();
        UI.showShop();
        this.updateUI();
    },

    buyItem(itemId) {
        if (!this.player || !this.items || !this.items[itemId]) return;
        const item = this.items[itemId];
        if (this.player.gold < item.price) {
            UI.showToast('金币不足！', 'error');
            return;
        }

        this.player.gold -= item.price;
        const newItem = {
            item_id: itemId,
            name: item.name,
            type: item.type,
            rarity: item.rarity || 1
        };
        for (const [k, v] of Object.entries(item)) {
            if (!['name', 'type', 'price', 'rarity'].includes(k)) {
                newItem[k] = v;
            }
        }
        this.player.inventory.push(newItem);
        UI.addLog(`购买了 ${item.name}！`, 'loot');
        UI.hideOverlay();
        UI.showShop();
        this.updateUI();
    },

    buyShopItem(itemId) {
        if (!this.player) return;
        const shopItem = SHOP_ITEMS.find(i => i.item_id === itemId);
        if (!shopItem) return;

        if (this.player.gold < shopItem.price) {
            UI.showToast('金币不足！', 'error');
            return;
        }

        if (this.player.inventory.length >= 20) {
            UI.showToast('背包已满！', 'error');
            return;
        }

        this.player.gold -= shopItem.price;
        const newItem = {
            item_id: shopItem.item_id,
            name: shopItem.name,
            type: shopItem.type,
            rarity: shopItem.rarity || 1
        };
        if (shopItem.heal) newItem.heal = shopItem.heal;
        if (shopItem.atk) newItem.atk = shopItem.atk;
        if (shopItem.def) newItem.def = shopItem.def;
        if (shopItem.spd) newItem.spd = shopItem.spd;
        if (shopItem.max_hp) newItem.max_hp = shopItem.max_hp;

        this.player.inventory.push(newItem);
        UI.addLog(`购买了 ${shopItem.name}！`, 'loot');

        if (shopItem.type !== 'consumable') {
            this.autoEquip(newItem);
        }

        UI.hideOverlay();
        UI.showShop();
        this.updateUI();
    },

    autoEquip(item) {
        const p = this.player;
        const slot = item.type === 'weapon' ? 'weapon' : item.type === 'armor' ? 'armor' : 'accessory';

        const oldEquip = p.equipment[slot];
        if (oldEquip) {
            this.unequipItem(slot);
        }

        p.equipment[slot] = item;
        const idx = p.inventory.indexOf(item);
        if (idx >= 0) p.inventory.splice(idx, 1);

        this.applyEquipmentStats();
        UI.addLog(`装备了 ${item.name}！`, 'info');
    },

    unequipItem(slot) {
        const p = this.player;
        const item = p.equipment[slot];
        if (!item) return;

        if (p.inventory.length >= 20) {
            UI.showToast('背包已满，无法卸下装备', 'error');
            return;
        }

        p.equipment[slot] = null;
        p.inventory.push(item);
        this.applyEquipmentStats();
    },

    applyEquipmentStats() {
        const p = this.player;
        let bonusAtk = 0, bonusDef = 0, bonusSpd = 0, bonusHp = 0;

        for (const [slot, item] of Object.entries(p.equipment)) {
            if (!item) continue;
            if (item.atk) bonusAtk += item.atk;
            if (item.def) bonusDef += item.def;
            if (item.spd) bonusSpd += item.spd;
            if (item.max_hp) bonusHp += item.max_hp;
        }

        p.atk = (CHARACTERS[p.character] || CHARACTERS.warrior).base_atk + (p.level - 1) * (CHARACTERS[p.character] || CHARACTERS.warrior).atk_growth + bonusAtk;
        p.def = (CHARACTERS[p.character] || CHARACTERS.warrior).base_def + (p.level - 1) * (CHARACTERS[p.character] || CHARACTERS.warrior).def_growth + bonusDef;
        p.spd = (CHARACTERS[p.character] || CHARACTERS.warrior).base_spd + (p.level - 1) * (CHARACTERS[p.character] || CHARACTERS.warrior).spd_growth + bonusSpd;
        const baseMaxHp = (CHARACTERS[p.character] || CHARACTERS.warrior).base_hp + (p.level - 1) * (CHARACTERS[p.character] || CHARACTERS.warrior).hp_growth;
        p.max_hp = baseMaxHp + bonusHp;
        if (p.current_hp > p.max_hp) p.current_hp = p.max_hp;
    },

    nextFloor() {
        this.player.floor++;
        UI.addLog(`进入第 ${this.player.floor} 层...`, 'info');
        this.enterFloor(this.player.floor);
    },

    gameOver() {
        this.state = 'gameover';
        UI.addLog('游戏结束', 'damage');

        const deathPenaltyGold = Math.floor(this.player.gold * 0.3);
        const deathPenaltyExp = Math.floor(this.player.exp * 0.2);
        this.player.gold = Math.max(0, this.player.gold - deathPenaltyGold);
        this.player.exp = Math.max(0, this.player.exp - deathPenaltyExp);

        let lostItemMsg = '';
        if (this.player.inventory.length > 0 && Math.random() < 0.2) {
            const lostIdx = Math.floor(Math.random() * this.player.inventory.length);
            const lostItem = this.player.inventory[lostIdx];
            this.player.inventory.splice(lostIdx, 1);
            lostItemMsg = `<p style="text-align:center;color:#cc4444">遗失了 ${lostItem.name}</p>`;
        }

        let html = '<div class="overlay-title">💀 游戏结束</div>';
        html += `<p style="text-align:center;margin:16px 0">你倒在了第 ${this.player.floor} 层</p>`;
        html += `<p style="text-align:center;color:#888">等级: ${this.player.level} | 金币: ${this.player.gold}</p>`;
        html += `<p style="text-align:center;color:#cc4444;font-size:0.9em">死亡惩罚: -${deathPenaltyGold}金币 -${deathPenaltyExp}经验</p>`;
        html += lostItemMsg;
        html += '<div style="display:flex;gap:10px;justify-content:center;margin-top:16px">';
        html += '<button class="overlay-close" onclick="Game.saveAndReturn()">保存并返回</button>';
        html += '<button class="overlay-close" onclick="Game.restart()" style="background:#4a2a2a;border-color:#8a4a4a">重新开始</button>';
        html += '</div>';
        UI.showOverlay(html);
    },

    async saveAndReturn() {
        await this.saveGame();
        this.returnToMenu();
    },

    restart() {
        UI.hideOverlay();
        this.newGame(this.player.name, this.player.character, this.difficulty);
    },

    triggerRandomEvent() {
        const roll = Math.random();
        let cumulative = 0;

        for (const event of RANDOM_EVENTS) {
            cumulative += event.chance;
            if (roll < cumulative) {
                this.executeRandomEvent(event);
                return;
            }
        }
    },

    executeRandomEvent(event) {
        UI.addLog(`✨ ${event.icon} ${event.name}！`, 'loot');

        switch (event.action) {
            case 'shop':
                Game.state = 'shop';
                UI.showShop();
                break;
            case 'battle':
                const enemy = { ...event.enemy, alive: true, isElite: false, statusEffects: [], buffs: {} };
                const diffMult = DIFFICULTY_SETTINGS[this.difficulty].enemy_mult;
                enemy.hp = Math.floor(enemy.hp * diffMult);
                enemy.atk = Math.floor(enemy.atk * diffMult);
                enemy.def = Math.floor(enemy.def * diffMult);
                this.battleEnemy = enemy;
                this.state = 'battle';
                UI.addLog(`遭遇了 ${enemy.name}！`, 'damage');
                break;
            case 'heal':
                const healAmount = Math.floor(this.player.max_hp * event.heal_pct);
                this.player.current_hp = Math.min(this.player.max_hp, this.player.current_hp + healAmount);
                UI.addLog(`恢复了 ${healAmount} HP！`, 'heal');
                break;
            case 'trade':
                const hpCost = Math.floor(this.player.max_hp * event.cost.hp_pct);
                if (this.player.current_hp > hpCost) {
                    this.player.current_hp -= hpCost;
                    this.player.atk += event.gain.atk;
                    this.player.def += event.gain.def;
                    UI.addLog(`付出 ${hpCost} HP，获得攻击+${event.gain.atk}，防御+${event.gain.def}`, 'loot');
                } else {
                    UI.addLog('HP不足，无法交易', 'info');
                }
                break;
            case 'buff':
                this.player.atk += event.buff.atk;
                UI.addLog(`获得攻击+${event.buff.atk}增益！`, 'loot');
                break;
            case 'loot':
                const goldAmount = event.gold[0] + Math.floor(Math.random() * (event.gold[1] - event.gold[0]));
                this.player.gold += goldAmount;
                UI.addLog(`获得 ${goldAmount} 金币！`, 'loot');
                if (Math.random() < event.item_chance) {
                    const randomItem = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
                    this.player.inventory.push({ ...randomItem });
                    UI.addLog(`获得 ${randomItem.name}！`, 'loot');
                }
                break;
            case 'ambush':
                const count = event.enemy_count[0] + Math.floor(Math.random() * (event.enemy_count[1] - event.enemy_count[0] + 1));
                UI.addLog(`${count}个敌人出现了！`, 'damage');
                for (let i = 0; i < count; i++) {
                    const floorKey = Math.min(this.player.floor, 5);
                    const floorEnemies = ENEMIES_BY_FLOOR[floorKey] || ENEMIES_BY_FLOOR[5];
                    const template = floorEnemies[Math.floor(Math.random() * floorEnemies.length)];
                    const diffMult2 = DIFFICULTY_SETTINGS[this.difficulty].enemy_mult;
                    this.enemies.push({
                        ...template,
                        x: this.dungeon.playerStart.x + (Math.random() < 0.5 ? -1 : 1),
                        y: this.dungeon.playerStart.y + (Math.random() < 0.5 ? -1 : 1),
                        current_hp: Math.floor(template.hp * diffMult2),
                        max_hp: Math.floor(template.hp * diffMult2),
                        atk: Math.floor(template.atk * diffMult2),
                        def: Math.floor(template.def * diffMult2),
                        alive: true,
                        isElite: false,
                        statusEffects: [],
                        buffs: {},
                    });
                }
                break;
            case 'exp':
                const expGain = Math.floor(this.player.exp_to_next * event.exp_pct);
                this.player.exp += expGain;
                UI.addLog(`获得 ${expGain} 经验！`, 'loot');
                break;
        }
        this.updateUI();
    },

    checkAchievement(id) {
        if (this.achievements[id]) return;
        const achievement = ACHIEVEMENTS[id];
        if (!achievement) return;

        this.achievements[id] = true;
        UI.addLog(`🏆 成就解锁: ${achievement.icon} ${achievement.name}！`, 'loot');

        if (achievement.reward.gold) this.player.gold += achievement.reward.gold;
        if (achievement.reward.max_hp) this.player.max_hp += achievement.reward.max_hp;
        if (achievement.reward.atk) this.player.atk += achievement.reward.atk;
        if (achievement.reward.def) this.player.def += achievement.reward.def;
        if (achievement.reward.spd) this.player.spd += achievement.reward.spd;
    },

    addCombo() {
        this.combo++;
        if (this.comboTimer) clearTimeout(this.comboTimer);
        this.comboTimer = setTimeout(() => { this.combo = 0; }, 5000);

        if (this.combo >= 3) {
            const bonusGold = this.combo * 5;
            const bonusExp = this.combo * 3;
            this.player.gold += bonusGold;
            this.player.exp += bonusExp;
            UI.addLog(`🔥 ${this.combo}连杀！奖励 ${bonusGold}金币 ${bonusExp}经验`, 'loot');
        }

        if (this.combo >= 5) this.checkAchievement('combo_5');
    },

    enhanceEquipment(slot) {
        const item = this.player.equipment[slot];
        if (!item) {
            UI.showToast('没有装备可强化', 'error');
            return;
        }

        if (!item.enhance_level) item.enhance_level = 0;
        if (item.enhance_level >= EQUIPMENT_ENHANCE.max_level) {
            UI.showToast('已达到最大强化等级', 'error');
            return;
        }

        const cost = Math.floor(EQUIPMENT_ENHANCE.cost_base * Math.pow(EQUIPMENT_ENHANCE.cost_mult, item.enhance_level));
        if (this.player.gold < cost) {
            UI.showToast(`金币不足，需要 ${cost} 金币`, 'error');
            return;
        }

        const successRate = EQUIPMENT_ENHANCE.success_rate[item.enhance_level];
        this.player.gold -= cost;

        if (Math.random() * 100 < successRate) {
            item.enhance_level++;
            const bonus = Math.floor((item.atk || item.def || 0) * EQUIPMENT_ENHANCE.stat_bonus_per_level);
            if (item.atk) item.atk += bonus;
            if (item.def) item.def += bonus;
            UI.addLog(`✨ 强化成功！${item.name} +${item.enhance_level}`, 'loot');
        } else {
            UI.addLog(`💥 强化失败...`, 'damage');
        }
        this.updateUI();
    },

    returnToMenu() {
        this.state = 'menu';
        this.player = null;
        this.dungeon = null;
        this.battleEnemy = null;
        this.enemies = [];
        this.bossEnemy = null;
        UI.hideOverlay();
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('menu-screen').classList.remove('hidden');
    },

    updateUI() {
        if (!this.player) return;
        UI.updateStatsPanel(this.player);
        UI.updateHPBar(this.player);
        this.render();

        const inBattle = this.state === 'battle';
        document.getElementById('btn-attack').style.display = inBattle ? '' : 'none';
        document.getElementById('btn-defend').style.display = inBattle ? '' : 'none';
        document.getElementById('btn-item').style.display = inBattle ? '' : 'none';
        document.getElementById('btn-flee').style.display = inBattle ? '' : 'none';
    },

    render() {
        if (this.dungeon && this.player) {
            if (Renderer.canvas.width === 0 || Renderer.canvas.height === 0) {
                Renderer.resizeCanvas();
            }
            Renderer.renderDungeon(this.dungeon, this.dungeon.playerStart);

            const ctx = Renderer.ctx;
            const ts = Renderer.tileSize;

            for (const enemy of this.enemies) {
                if (!enemy.alive) continue;
                if (!Renderer.explored || !Renderer.explored[enemy.y] || !Renderer.explored[enemy.y][enemy.x]) continue;

                const screenX = enemy.x * ts - Renderer.camera.x;
                const screenY = enemy.y * ts - Renderer.camera.y;
                Renderer.drawEnemy(ctx, screenX, screenY, ts, enemy.type);
            }

            if (this.bossEnemy) {
                if (Renderer.explored && Renderer.explored[this.bossEnemy.y] && Renderer.explored[this.bossEnemy.y][this.bossEnemy.x]) {
                    const screenX = this.bossEnemy.x * ts - Renderer.camera.x;
                    const screenY = this.bossEnemy.y * ts - Renderer.camera.y;
                    Renderer.drawBoss(ctx, screenX, screenY, ts, 'boss');
                }
            }
        }
    }
};
