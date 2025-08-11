from music import play, play_stop, play_time
from time import sleep
for i in range(2):
    play("cde","gfc")
for i in range(10):
    print(play_time())
    sleep(0.1)
print("stop")
play_stop()

