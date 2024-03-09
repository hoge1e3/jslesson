class Car:
    def __init__(self, milage, gas, milage_per_gas):
        self.milage=milage
        self.gas=gas
        self.milage_per_gas=milage_per_gas
def status(car):
    print("milage={} gas={} milage_per_gas={}".format(car.milage, car.gas, car.milage_per_gas))
def run(car, distance):
    car.milage+=distance
    car.gas-=distance/car.milage_per_gas
benz=Car(0, 10, 12)
status(benz)
d=float(input("distance=?"))
run(benz, d)
status(benz)
