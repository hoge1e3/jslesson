from microbit import *
from time import sleep
base=temperature()
for i in range(500):
    sleep(1)
    display.show(str(temperature()-base+5))
    print("test",temperature())
