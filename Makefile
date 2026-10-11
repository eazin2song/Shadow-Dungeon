CC = gcc
CFLAGS = -Wall -Wextra -std=c99 -O2
SRCS = random_utils.c dungeon_generator.c battle_engine.c
OBJS = $(SRCS:.c=.o)

test: $(OBJS) test_main.c
	$(CC) $(CFLAGS) -o test_game $(OBJS) test_main.c -lm
	./test_game

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f *.o test_game
