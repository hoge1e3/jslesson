from microbit import *
from time import sleep
import music
display.show(Image.SMILE)
print(5)
while True:
    if accelerometer.was_gesture('shake'):
        print("BOO!")
        display.show(Image.ANGRY)
        music.play(["A4"])
        sleep(1)
    else:
        display.show(Image.SMILE)
    sleep(0.1)
