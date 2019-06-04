def show_keywords(**args):
    for key, value in args.items():
        print(key + "=" + str(value))
    print("---")

show_keywords(a=55, b=87)
show_keywords(c=55, d=87, e=62)

