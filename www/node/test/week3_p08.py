def clamp(x,min,max):
    if x<min:
        return min
    elif x>max:
        return max
    else:
        return x
print(clamp(-70,42,63))
print(clamp(100,-61,-20))
print(clamp(-7,-29,13))
print(clamp(-95,-1,1))
print(clamp(11,-25,3))
print(clamp(47,38,50))
