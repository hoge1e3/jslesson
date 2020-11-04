import cv2 as c
import bawrapper
def imread(file):
    f=bawrapper.resolve(file)
    return c.imread(f)
#cv2.resize(img , (int(width*0.5), int(height*0.5)))
def resize(*a,**k):
    return c.resize(*a,**k)
def imwrite(file, img):
    f=bawrapper.resolve(file)
    return c.imwrite(f, img)
