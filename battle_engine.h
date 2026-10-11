#ifndef BATTLE_ENGINE_H
#define BATTLE_ENGINE_H

#include "game_state.h"

void battle_init(BattleContext* ctx, PlayerState* player, EnemyState* enemy);
BattleResult battle_execute_turn(BattleContext* ctx, BattleAction action, int item_id);
int battle_calc_damage(int attacker_atk, int defender_def);
int battle_get_first_attacker(float player_spd, float enemy_spd);
int battle_use_item(PlayerState* player, int inventory_slot);
void battle_generate_enemy(EnemyState* enemy, int floor, int is_boss);
int battle_exp_for_level(int level);
int battle_check_levelup(PlayerState* player);

#endif
