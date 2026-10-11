#ifndef RANDOM_UTILS_H
#define RANDOM_UTILS_H

#include <stdint.h>

// 初始化随机数种子
void random_init(uint32_t seed);

// 获取 [0, max) 范围的随机整数
int random_int(int max);

// 获取 [min, max] 范围的随机整数
int random_range(int min, int max);

// 获取随机浮点数 [0.0, 1.0)
float random_float(void);

// 获取随机波动系数 [0.8, 1.2]
float random_variance(void);

// 按概率返回是否成功 (percentage: 0-100)
int random_chance(int percentage);

#endif // RANDOM_UTILS_H
