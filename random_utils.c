#include "random_utils.h"
#include <time.h>
#include <stdlib.h>

static uint32_t rng_state = 0;

// 简单的xorshift32随机数生成器（适合WASM环境）
static uint32_t xorshift32(void) {
    rng_state ^= rng_state << 13;
    rng_state ^= rng_state >> 17;
    rng_state ^= rng_state << 5;
    return rng_state;
}

void random_init(uint32_t seed) {
    if (seed == 0) {
        rng_state = (uint32_t)time(NULL);
    } else {
        rng_state = seed;
    }
    // 预热几次
    for (int i = 0; i < 10; i++) {
        xorshift32();
    }
}

int random_int(int max) {
    if (max <= 0) return 0;
    return (int)(xorshift32() % (uint32_t)max);
}

int random_range(int min, int max) {
    if (min >= max) return min;
    return min + random_int(max - min + 1);
}

float random_float(void) {
    return (float)(xorshift32() % 10000) / 10000.0f;
}

float random_variance(void) {
    // 返回 [0.8, 1.2] 的波动系数
    return 0.8f + random_float() * 0.4f;
}

int random_chance(int percentage) {
    if (percentage >= 100) return 1;
    if (percentage <= 0) return 0;
    return random_int(100) < percentage ? 1 : 0;
}
