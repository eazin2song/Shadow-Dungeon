#include "battle_engine.h"
#include "random_utils.h"
#include <string.h>
#include <stdio.h>
#include <math.h>

void battle_init(BattleContext* ctx, PlayerState* player, EnemyState* enemy) {
    ctx->player = player;
    ctx->enemy = enemy;
    ctx->result = BATTLE_ONGOING;
    ctx->turn = 0;
    ctx->player_defending = 0;
    ctx->damage_dealt = 0;
    ctx->damage_received = 0;
    ctx->log[0] = '\0';
}

int battle_calc_damage(int attacker_atk, int defender_def) {
    int base = attacker_atk - (defender_def / 2);
    if (base < 1) base = 1;
    float variance = random_variance();
    int damage = (int)(base * variance);
    return damage < 1 ? 1 : damage;
}

int battle_get_first_attacker(float player_spd, float enemy_spd) {
    if (player_spd >= enemy_spd) return 1;
    return 0;
}

int battle_use_item(PlayerState* player, int inventory_slot) {
    if (inventory_slot < 0 || inventory_slot >= player->inventory_count) return 0;
    int item_id = player->inventory[inventory_slot];

    if (item_id == 1001) {
        player->current_hp += 30;
        if (player->current_hp > player->max_hp) player->current_hp = player->max_hp;
    } else if (item_id == 1002) {
        player->current_hp += 60;
        if (player->current_hp > player->max_hp) player->current_hp = player->max_hp;
    } else if (item_id == 1003) {
        player->current_hp += 120;
        if (player->current_hp > player->max_hp) player->current_hp = player->max_hp;
    } else {
        return 0;
    }

    for (int i = inventory_slot; i < player->inventory_count - 1; i++) {
        player->inventory[i] = player->inventory[i + 1];
    }
    player->inventory_count--;
    return 1;
}

void battle_generate_enemy(EnemyState* enemy, int floor, int is_boss) {
    float scale = 1.0f + (floor - 1) * 0.3f;

    if (is_boss) {
        const char* boss_names[] = {"骷髅王", "暗影法师", "炎魔", "冰霜巨龙", "混沌领主"};
        int idx = floor - 1;
        if (idx > 4) idx = 4;
        strncpy(enemy->name, boss_names[idx], 31);
        enemy->max_hp = (int)(100 * scale * 2.5f);
        enemy->atk = (int)(15 * scale * 1.5f);
        enemy->def = (int)(5 * scale * 1.5f);
        enemy->spd = 4.0f + floor * 0.5f;
        enemy->exp_reward = (int)(50 * scale);
        enemy->gold_reward = (int)(30 * scale);
    } else {
        int type = random_range(0, 2);
        if (floor == 1) {
            if (type == 0) {
                strncpy(enemy->name, "史莱姆", 31);
                enemy->max_hp = (int)(20 * scale);
                enemy->atk = (int)(5 * scale);
                enemy->def = (int)(1 * scale);
                enemy->spd = 3.0f;
                enemy->exp_reward = 10;
                enemy->gold_reward = 5;
            } else if (type == 1) {
                strncpy(enemy->name, "蝙蝠", 31);
                enemy->max_hp = (int)(15 * scale);
                enemy->atk = (int)(7 * scale);
                enemy->def = 0;
                enemy->spd = 8.0f;
                enemy->exp_reward = 8;
                enemy->gold_reward = 3;
            } else {
                strncpy(enemy->name, "骷髅兵", 31);
                enemy->max_hp = (int)(25 * scale);
                enemy->atk = (int)(6 * scale);
                enemy->def = (int)(2 * scale);
                enemy->spd = 4.0f;
                enemy->exp_reward = 12;
                enemy->gold_reward = 8;
            }
        } else {
            if (type == 0) {
                strncpy(enemy->name, "哥布林", 31);
                enemy->max_hp = (int)(35 * scale);
                enemy->atk = (int)(10 * scale);
                enemy->def = (int)(3 * scale);
                enemy->spd = 5.0f;
                enemy->exp_reward = 20;
                enemy->gold_reward = 12;
            } else if (type == 1) {
                strncpy(enemy->name, "幽灵", 31);
                enemy->max_hp = (int)(30 * scale);
                enemy->atk = (int)(12 * scale);
                enemy->def = (int)(2 * scale);
                enemy->spd = 9.0f;
                enemy->exp_reward = 18;
                enemy->gold_reward = 10;
            } else {
                strncpy(enemy->name, "暗影亡灵", 31);
                enemy->max_hp = (int)(40 * scale);
                enemy->atk = (int)(14 * scale);
                enemy->def = (int)(4 * scale);
                enemy->spd = 6.0f;
                enemy->exp_reward = 25;
                enemy->gold_reward = 15;
            }
        }
    }
    enemy->current_hp = enemy->max_hp;
}

int battle_exp_for_level(int level) {
    return 20 * level * level + 10;
}

int battle_check_levelup(PlayerState* player) {
    if (player->exp < player->exp_to_next) return 0;
    player->exp -= player->exp_to_next;
    player->level++;
    player->max_hp += 5;
    player->current_hp = player->max_hp;
    player->atk += 2;
    player->def += 1;
    player->spd += 0.1f;
    player->exp_to_next = battle_exp_for_level(player->level);
    return 1;
}

BattleResult battle_execute_turn(BattleContext* ctx, BattleAction action, int item_id) {
    if (ctx->result != BATTLE_ONGOING) return ctx->result;

    ctx->turn++;
    ctx->player_defending = 0;
    ctx->damage_dealt = 0;
    ctx->damage_received = 0;

    PlayerState* p = ctx->player;
    EnemyState* e = ctx->enemy;

    if (action == ACTION_FLEE) {
        int flee_chance = 40 + (int)((p->spd - e->spd) * 5);
        if (flee_chance > 90) flee_chance = 90;
        if (flee_chance < 10) flee_chance = 10;
        if (random_chance(flee_chance)) {
            ctx->result = BATTLE_PLAYER_FLED;
            snprintf(ctx->log, 256, "你成功逃跑了！");
            return ctx->result;
        }
        snprintf(ctx->log, 256, "逃跑失败！");
    } else if (action == ACTION_USE_ITEM) {
        if (battle_use_item(p, item_id)) {
            snprintf(ctx->log, 256, "你使用了道具！");
        } else {
            snprintf(ctx->log, 256, "无法使用该道具！");
        }
    } else if (action == ACTION_DEFEND) {
        ctx->player_defending = 1;
    }

    int player_first = battle_get_first_attacker(p->spd, e->spd);

    if (player_first) {
        if (action == ACTION_ATTACK) {
            int dmg = battle_calc_damage(p->atk, e->def);
            e->current_hp -= dmg;
            ctx->damage_dealt = dmg;
            snprintf(ctx->log, 256, "你造成 %d 点伤害！", dmg);
        }
        if (e->current_hp > 0) {
            int edmg = battle_calc_damage(e->atk, p->def);
            if (ctx->player_defending) edmg /= 2;
            p->current_hp -= edmg;
            ctx->damage_received = edmg;
            char tmp[128];
            snprintf(tmp, 128, " %s造成 %d 点伤害！", e->name, edmg);
            strncat(ctx->log, tmp, 255 - strlen(ctx->log));
        }
    } else {
        int edmg = battle_calc_damage(e->atk, p->def);
        if (ctx->player_defending) edmg /= 2;
        p->current_hp -= edmg;
        ctx->damage_received = edmg;
        snprintf(ctx->log, 256, "%s造成 %d 点伤害！", e->name, edmg);
        if (action == ACTION_ATTACK && p->current_hp > 0) {
            int dmg = battle_calc_damage(p->atk, e->def);
            e->current_hp -= dmg;
            ctx->damage_dealt = dmg;
            char tmp[128];
            snprintf(tmp, 128, " 你造成 %d 点伤害！", dmg);
            strncat(ctx->log, tmp, 255 - strlen(ctx->log));
        }
    }

    if (p->current_hp <= 0) {
        p->current_hp = 0;
        ctx->result = BATTLE_PLAYER_LOSE;
    } else if (e->current_hp <= 0) {
        e->current_hp = 0;
        ctx->result = BATTLE_PLAYER_WIN;
        p->exp += e->exp_reward;
        p->gold += e->gold_reward;
        char tmp[128];
        snprintf(tmp, 128, " 获得 %d 经验，%d 金币！", e->exp_reward, e->gold_reward);
        strncat(ctx->log, tmp, 255 - strlen(ctx->log));
    }

    return ctx->result;
}
