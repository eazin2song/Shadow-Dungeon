#include "dungeon_generator.h"
#include "random_utils.h"
#include <string.h>
#include <stdio.h>

static void fill_rect(Dungeon* d, int x, int y, int w, int h, TileType tile) {
    for (int dy = 0; dy < h; dy++) {
        for (int dx = 0; dx < w; dx++) {
            int px = x + dx;
            int py = y + dy;
            if (px >= 0 && px < DUNGEON_WIDTH && py >= 0 && py < DUNGEON_HEIGHT) {
                d->tile_map[py][px] = (char)tile;
            }
        }
    }
}

static int rooms_overlap(const Room* a, const Room* b) {
    return !(a->x + a->width + 1 < b->x || b->x + b->width + 1 < a->x ||
             a->y + a->height + 1 < b->y || b->y + b->height + 1 < a->y);
}

static void carve_corridor(Dungeon* d, int x1, int y1, int x2, int y2) {
    int cx = x1, cy = y1;
    while (cx != x2) {
        if (cx >= 0 && cx < DUNGEON_WIDTH && cy >= 0 && cy < DUNGEON_HEIGHT) {
            if (d->tile_map[cy][cx] == TILE_WALL)
                d->tile_map[cy][cx] = TILE_FLOOR;
        }
        cx += (x2 > x1) ? 1 : -1;
    }
    while (cy != y2) {
        if (cx >= 0 && cx < DUNGEON_WIDTH && cy >= 0 && cy < DUNGEON_HEIGHT) {
            if (d->tile_map[cy][cx] == TILE_WALL)
                d->tile_map[cy][cx] = TILE_FLOOR;
        }
        cy += (y2 > y1) ? 1 : -1;
    }
}

static int room_distance(const Room* a, const Room* b) {
    int ax = a->x + a->width / 2;
    int ay = a->y + a->height / 2;
    int bx = b->x + b->width / 2;
    int by = b->y + b->height / 2;
    int dx = ax - bx;
    int dy = ay - by;
    return dx * dx + dy * dy;
}

void dungeon_generate(Dungeon* dungeon, int floor) {
    memset(dungeon->tile_map, TILE_WALL, sizeof(dungeon->tile_map));
    dungeon->floor = floor;
    dungeon->room_count = 0;

    int target_rooms = 6 + random_range(0, 4);
    if (target_rooms > MAX_ROOMS) target_rooms = MAX_ROOMS;

    for (int attempt = 0; attempt < 100 && dungeon->room_count < target_rooms; attempt++) {
        Room room;
        room.width = random_range(MIN_ROOM_SIZE, MAX_ROOM_SIZE);
        room.height = random_range(MIN_ROOM_SIZE, MAX_ROOM_SIZE);
        room.x = random_range(1, DUNGEON_WIDTH - room.width - 1);
        room.y = random_range(1, DUNGEON_HEIGHT - room.height - 1);
        room.type = ROOM_NORMAL;
        room.connected = 0;

        int overlap = 0;
        for (int i = 0; i < dungeon->room_count; i++) {
            if (rooms_overlap(&room, &dungeon->rooms[i])) {
                overlap = 1;
                break;
            }
        }
        if (!overlap) {
            fill_rect(dungeon, room.x, room.y, room.width, room.height, TILE_FLOOR);
            dungeon->rooms[dungeon->room_count] = room;
            dungeon->room_count++;
        }
    }

    for (int i = 1; i < dungeon->room_count; i++) {
        int cx1 = dungeon->rooms[i - 1].x + dungeon->rooms[i - 1].width / 2;
        int cy1 = dungeon->rooms[i - 1].y + dungeon->rooms[i - 1].height / 2;
        int cx2 = dungeon->rooms[i].x + dungeon->rooms[i].width / 2;
        int cy2 = dungeon->rooms[i].y + dungeon->rooms[i].height / 2;
        carve_corridor(dungeon, cx1, cy1, cx2, cy2);
        dungeon->rooms[i].connected = 1;
    }
    dungeon->rooms[0].connected = 1;

    dungeon->start_room = 0;
    dungeon->rooms[0].type = ROOM_START;

    int max_dist = 0;
    dungeon->boss_room = 0;
    for (int i = 1; i < dungeon->room_count; i++) {
        int dist = room_distance(&dungeon->rooms[0], &dungeon->rooms[i]);
        if (dist > max_dist) {
            max_dist = dist;
            dungeon->boss_room = i;
        }
    }
    dungeon->rooms[dungeon->boss_room].type = ROOM_BOSS;

    for (int i = 0; i < dungeon->room_count; i++) {
        if (i == dungeon->start_room || i == dungeon->boss_room) continue;
        int roll = random_range(0, 99);
        if (roll < 25) dungeon->rooms[i].type = ROOM_CHEST;
        else if (roll < 40) dungeon->rooms[i].type = ROOM_SHOP;
        else if (roll < 50) dungeon->rooms[i].type = ROOM_TRAP;
    }

    int boss_cx = dungeon->rooms[dungeon->boss_room].x + dungeon->rooms[dungeon->boss_room].width / 2;
    int boss_cy = dungeon->rooms[dungeon->boss_room].y + dungeon->rooms[dungeon->boss_room].height / 2;
    dungeon->stairs_x = boss_cx;
    dungeon->stairs_y = boss_cy;
    dungeon->tile_map[boss_cy][boss_cx] = TILE_STAIRS_DOWN;

    for (int i = 0; i < dungeon->room_count; i++) {
        int rcx = dungeon->rooms[i].x + dungeon->rooms[i].width / 2;
        int rcy = dungeon->rooms[i].y + dungeon->rooms[i].height / 2;
        if (dungeon->rooms[i].type == ROOM_CHEST)
            dungeon->tile_map[rcy][rcx] = TILE_CHEST;
        else if (dungeon->rooms[i].type == ROOM_SHOP)
            dungeon->tile_map[rcy][rcx] = TILE_SHOP;
        else if (dungeon->rooms[i].type == ROOM_TRAP)
            dungeon->tile_map[rcy][rcx] = TILE_TRAP;
    }

    int start_cx = dungeon->rooms[0].x + dungeon->rooms[0].width / 2;
    int start_cy = dungeon->rooms[0].y + dungeon->rooms[0].height / 2;
    dungeon->player_x = start_cx;
    dungeon->player_y = start_cy;
}

TileType dungeon_get_tile(const Dungeon* dungeon, int x, int y) {
    if (x < 0 || x >= DUNGEON_WIDTH || y < 0 || y >= DUNGEON_HEIGHT)
        return TILE_WALL;
    return (TileType)dungeon->tile_map[y][x];
}

void dungeon_set_tile(Dungeon* dungeon, int x, int y, TileType type) {
    if (x >= 0 && x < DUNGEON_WIDTH && y >= 0 && y < DUNGEON_HEIGHT)
        dungeon->tile_map[y][x] = (char)type;
}

int dungeon_is_walkable(const Dungeon* dungeon, int x, int y) {
    TileType t = dungeon_get_tile(dungeon, x, y);
    return t != TILE_WALL;
}

void dungeon_get_room_center(const Dungeon* dungeon, int room_index, int* cx, int* cy) {
    if (room_index < 0 || room_index >= dungeon->room_count) {
        *cx = 0; *cy = 0;
        return;
    }
    *cx = dungeon->rooms[room_index].x + dungeon->rooms[room_index].width / 2;
    *cy = dungeon->rooms[room_index].y + dungeon->rooms[room_index].height / 2;
}

void dungeon_print(const Dungeon* dungeon) {
    const char* symbols = " #+>$STB";
    for (int y = 0; y < DUNGEON_HEIGHT; y++) {
        for (int x = 0; x < DUNGEON_WIDTH; x++) {
            int tile = dungeon->tile_map[y][x];
            if (x == dungeon->player_x && y == dungeon->player_y) {
                putchar('@');
            } else {
                putchar(symbols[tile]);
            }
        }
        putchar('\n');
    }
}
