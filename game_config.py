ENEMIES = {
    1: {
        "slime": {"name": "史莱姆", "hp": 20, "atk": 5, "def": 1, "spd": 3, "exp": 10, "gold": 5},
        "bat": {"name": "蝙蝠", "hp": 15, "atk": 7, "def": 0, "spd": 8, "exp": 8, "gold": 3},
        "skeleton": {"name": "骷髅兵", "hp": 25, "atk": 6, "def": 2, "spd": 4, "exp": 12, "gold": 8},
    },
    2: {
        "goblin": {"name": "哥布林", "hp": 35, "atk": 10, "def": 3, "spd": 5, "exp": 20, "gold": 12},
        "ghost": {"name": "幽灵", "hp": 30, "atk": 12, "def": 2, "spd": 9, "exp": 18, "gold": 10},
        "dark_wraith": {"name": "暗影亡灵", "hp": 40, "atk": 14, "def": 4, "spd": 6, "exp": 25, "gold": 15},
    },
    3: {
        "ogre": {"name": "食人魔", "hp": 60, "atk": 18, "def": 6, "spd": 3, "exp": 35, "gold": 25},
        "vampire": {"name": "吸血鬼", "hp": 45, "atk": 16, "def": 5, "spd": 10, "exp": 30, "gold": 20},
    },
}

BOSSES = {
    1: {"name": "骷髅王", "hp": 100, "atk": 15, "def": 5, "spd": 4, "exp": 50, "gold": 30},
    2: {"name": "暗影法师", "hp": 150, "atk": 20, "def": 8, "spd": 6, "exp": 80, "gold": 50},
    3: {"name": "炎魔", "hp": 220, "atk": 28, "def": 12, "spd": 5, "exp": 120, "gold": 80},
    4: {"name": "冰霜巨龙", "hp": 300, "atk": 35, "def": 15, "spd": 7, "exp": 180, "gold": 120},
    5: {"name": "混沌领主", "hp": 400, "atk": 45, "def": 20, "spd": 8, "exp": 300, "gold": 200},
}

ITEMS = {
    "potion_small": {"name": "小治疗药水", "type": "consumable", "heal": 30, "price": 15, "rarity": 1},
    "potion_medium": {"name": "中治疗药水", "type": "consumable", "heal": 60, "price": 35, "rarity": 2},
    "potion_large": {"name": "大治疗药水", "type": "consumable", "heal": 120, "price": 80, "rarity": 3},
    "atk_scroll": {"name": "力量卷轴", "type": "consumable", "buff_atk": 5, "duration": 3, "price": 50, "rarity": 2},
    "def_scroll": {"name": "铁壁卷轴", "type": "consumable", "buff_def": 5, "duration": 3, "price": 50, "rarity": 2},
    "wooden_sword": {"name": "木剑", "type": "weapon", "atk": 3, "price": 20, "rarity": 1},
    "iron_sword": {"name": "铁剑", "type": "weapon", "atk": 7, "price": 60, "rarity": 2},
    "shadow_blade": {"name": "暗影之刃", "type": "weapon", "atk": 14, "price": 150, "rarity": 3},
    "flame_sword": {"name": "烈焰之剑", "type": "weapon", "atk": 22, "price": 350, "rarity": 4},
    "chaos_blade": {"name": "混沌之刃", "type": "weapon", "atk": 35, "price": 800, "rarity": 5},
    "leather_armor": {"name": "皮甲", "type": "armor", "def": 3, "price": 25, "rarity": 1},
    "chain_mail": {"name": "锁子甲", "type": "armor", "def": 7, "price": 70, "rarity": 2},
    "plate_armor": {"name": "板甲", "type": "armor", "def": 13, "price": 180, "rarity": 3},
    "dragon_armor": {"name": "龙鳞甲", "type": "armor", "def": 22, "price": 400, "rarity": 4},
    "speed_ring": {"name": "疾风戒指", "type": "accessory", "spd": 2, "price": 80, "rarity": 2},
    "life_pendant": {"name": "生命吊坠", "type": "accessory", "max_hp": 30, "price": 100, "rarity": 2},
    "warrior_ring": {"name": "战士戒指", "type": "accessory", "atk": 5, "def": 3, "price": 200, "rarity": 3},
}

PLAYER_BASE_STATS = {
    "hp": 50, "atk": 8, "def": 3, "spd": 5.0,
    "hp_growth": 5, "atk_growth": 2, "def_growth": 1, "spd_growth": 0.1
}

RARITY_NAMES = {1: "普通", 2: "精良", 3: "稀有", 4: "史诗", 5: "传说"}
RARITY_COLORS = {1: "#ffffff", 2: "#00ff00", 3: "#0088ff", 4: "#cc44ff", 5: "#ff8800"}

ROOM_EVENTS = {
    "chest": {"item_chance": 70, "gold_range": [10, 30]},
    "shop": {"discount_chance": 20},
    "trap": {"damage_pct": 0.15, "avoid_chance": 30},
}
