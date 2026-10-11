#ifndef DUNGEON_GENERATOR_H
#define DUNGEON_GENERATOR_H

// 地牢尺寸
#define DUNGEON_WIDTH  40
#define DUNGEON_HEIGHT 30
#define MAX_ROOMS      12
#define MIN_ROOM_SIZE  4
#define MAX_ROOM_SIZE  8

// 地块类型
typedef enum {
    TILE_WALL = 0,      // 墙壁
    TILE_FLOOR,         // 地板
    TILE_DOOR,          // 门
    TILE_STAIRS_DOWN,   // 下楼楼梯
    TILE_CHEST,         // 宝箱
    TILE_SHOP,          // 商店
    TILE_TRAP,          // 陷阱
    TILE_BOSS           // Boss标记
} TileType;

// 房间类型
typedef enum {
    ROOM_NORMAL = 0,    // 普通房间（可能有敌人）
    ROOM_START,         // 起始房间
    ROOM_BOSS,          // Boss房间
    ROOM_CHEST,         // 宝箱房间
    ROOM_SHOP,          // 商店房间
    ROOM_TRAP           // 陷阱房间
} RoomType;

// 房间结构
typedef struct {
    int x, y;           // 左上角坐标
    int width, height;  // 尺寸
    RoomType type;      // 房间类型
    int connected;      // 是否已连接
} Room;

// 地牢结构
typedef struct {
    char tile_map[DUNGEON_HEIGHT][DUNGEON_WIDTH];  // 地图数据（TileType）
    Room rooms[MAX_ROOMS];                          // 房间列表
    int room_count;                                 // 房间数量
    int start_room;                                 // 起始房间索引
    int boss_room;                                  // Boss房间索引
    int player_x, player_y;                         // 玩家初始位置
    int stairs_x, stairs_y;                         // 楼梯位置
    int floor;                                      // 当前层数
} Dungeon;

// 生成地牢
// floor: 当前层数（影响难度和房间数量）
void dungeon_generate(Dungeon* dungeon, int floor);

// 获取指定位置的地块类型
TileType dungeon_get_tile(const Dungeon* dungeon, int x, int y);

// 设置指定位置的地块类型
void dungeon_set_tile(Dungeon* dungeon, int x, int y, TileType type);

// 检查位置是否可通行
int dungeon_is_walkable(const Dungeon* dungeon, int x, int y);

// 获取房间中心坐标
void dungeon_get_room_center(const Dungeon* dungeon, int room_index, int* cx, int* cy);

// 打印地牢（调试用）
void dungeon_print(const Dungeon* dungeon);

#endif // DUNGEON_GENERATOR_H
