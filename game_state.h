#ifndef GAME_STATE_H
#define GAME_STATE_H

typedef struct {
    int base_hp, base_atk, base_def;
    float base_spd;
    int hp_growth, atk_growth, def_growth;
    float spd_growth;
} CharStats;

typedef struct {
    char name[32];
    int level, exp, exp_to_next;
    int current_hp, max_hp;
    int atk, def;
    float spd;
    int floor;
    int gold;
    int equipment[3];
    int inventory[20];
    int inventory_count;
} PlayerState;

typedef struct {
    char name[32];
    int current_hp, max_hp;
    int atk, def;
    float spd;
    int exp_reward;
    int gold_reward;
} EnemyState;

typedef enum {
    BATTLE_ONGOING = 0,
    BATTLE_PLAYER_WIN,
    BATTLE_PLAYER_LOSE,
    BATTLE_PLAYER_FLED
} BattleResult;

typedef enum {
    ACTION_ATTACK = 0,
    ACTION_DEFEND,
    ACTION_USE_ITEM,
    ACTION_FLEE
} BattleAction;

typedef struct {
    PlayerState* player;
    EnemyState* enemy;
    BattleResult result;
    int turn;
    int player_defending;
    int damage_dealt;
    int damage_received;
    char log[256];
} BattleContext;

#endif
