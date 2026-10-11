#include <stdio.h>
#include "random_utils.h"
#include "dungeon_generator.h"
#include "battle_engine.h"

int main(void) {
    random_init(42);

    printf("=== 暗影地牢 - 测试 ===\n\n");

    printf("[1] 地牢生成测试\n");
    Dungeon dungeon;
    dungeon_generate(&dungeon, 1);
    printf("生成了 %d 个房间\n", dungeon.room_count);
    printf("起始房间: %d, Boss房间: %d\n", dungeon.start_room, dungeon.boss_room);
    printf("玩家位置: (%d, %d)\n", dungeon.player_x, dungeon.player_y);
    printf("楼梯位置: (%d, %d)\n\n", dungeon.stairs_x, dungeon.stairs_y);
    dungeon_print(&dungeon);

    printf("\n[2] 战斗测试\n");
    PlayerState player = {0};
    snprintf(player.name, 32, "勇者");
    player.level = 1;
    player.max_hp = 50;
    player.current_hp = 50;
    player.atk = 8;
    player.def = 3;
    player.spd = 5.0f;
    player.exp_to_next = battle_exp_for_level(1);

    EnemyState enemy = {0};
    battle_generate_enemy(&enemy, 1, 0);
    printf("遭遇: %s (HP:%d ATK:%d DEF:%d)\n", enemy.name, enemy.max_hp, enemy.atk, enemy.def);

    BattleContext ctx;
    battle_init(&ctx, &player, &enemy);

    int turn = 0;
    while (ctx.result == BATTLE_ONGOING && turn < 20) {
        battle_execute_turn(&ctx, ACTION_ATTACK, 0);
        printf("回合%d: %s\n", turn + 1, ctx.log);
        turn++;
    }

    if (ctx.result == BATTLE_PLAYER_WIN) printf("\n胜利！\n");
    else if (ctx.result == BATTLE_PLAYER_LOSE) printf("\n战败...\n");

    printf("玩家剩余HP: %d/%d\n", player.current_hp, player.max_hp);

    printf("\n[3] Boss战斗测试\n");
    player.current_hp = player.max_hp;
    EnemyState boss = {0};
    battle_generate_enemy(&boss, 1, 1);
    printf("Boss: %s (HP:%d ATK:%d DEF:%d)\n", boss.name, boss.max_hp, boss.atk, boss.def);

    battle_init(&ctx, &player, &boss);
    turn = 0;
    while (ctx.result == BATTLE_ONGOING && turn < 30) {
        battle_execute_turn(&ctx, ACTION_ATTACK, 0);
        printf("回合%d: %s\n", turn + 1, ctx.log);
        turn++;
    }
    if (ctx.result == BATTLE_PLAYER_WIN) printf("\nBoss击败！\n");
    else printf("\n未能击败Boss\n");

    printf("\n=== 测试完成 ===\n");
    return 0;
}
