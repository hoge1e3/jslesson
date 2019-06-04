i = 0 
while i < 5:
    i = i + 1 
    print("--> " + str(i))
    if i % 2 == 0: continue # --- (*1)
    print("<-- " + str(i))

