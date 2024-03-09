def fatness(bmi):
    if bmi>=25:
        return "FAT"
    elif bmi<18.5:
        return "SKINNY"
    else:
        return "MEDIUM"
def get_bmi(weight, height):
    return weight/((height/100)**2)
weight=int(input("weight=?"))
height=int(input("height=?"))
bmi=get_bmi(weight, height)
print("Your bmi =",bmi)
print("You are",fatness(bmi))
