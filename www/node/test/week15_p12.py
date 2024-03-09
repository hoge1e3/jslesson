class Driver:
    def __init__(self, name, license):
        self.name = name
        self.license = license
    def __str__(self):
        return "[{}/{}]".format(self.name, self.license)
class Car:
    def __init__(self, driver, mileage, gas, mileage_per_gas):
        self.driver = driver
        self.mileage = mileage
        self.gas = gas
        self.mileage_per_gas = mileage_per_gas
    def __str__(self):
        return "d={} m={} g={} mpg={}".format(self.driver, self.mileage, self.gas, self.mileage_per_gas)
    def run(self, mile):
        self.mileage+=mile
        self.gas-=(mile/self.mileage_per_gas)
ta = Driver("tanaka", "01234567")
benz = Car(ta, 50, 10, 12)
print(benz)
dis = float(input("distance=?"))
benz.run(dis)
print(benz)
