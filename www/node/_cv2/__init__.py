import cv2 as c
import bawrapper
import os

seq=0
def imread(file):
    f=bawrapper.resolve(file)
    return c.imread(f)
#cv2.resize(img , (int(width*0.5), int(height*0.5)))
def resize(*a,**k):
    return c.resize(*a,**k)
def imwrite(file, img):
    f=bawrapper.resolve(file)
    return c.imwrite(f, img)

def imshow(name, img):
    global seq
    seq+=1
    fn=os.getcwd()+'/figure'+str(seq)+'.png'
    c.imwrite(fn, img)
    print("##PLOT##%s"%(fn))

def cvtColor(*a,**k):
    return c.cvtColor(*a,**k)
resize=c.resize
rectangle=c.rectangle
filter2D=c.filter2D

circle=c.circle
line=c.line
ellipse=c.ellipse

HOUGH_GRADIENT=c.HOUGH_GRADIENT
COLOR_BGR2GRAY=c.COLOR_BGR2GRAY
COLOR_BGR2HSV=c.COLOR_BGR2HSV
COLOR_HSV2BGR=c.COLOR_HSV2BGR
COLOR_RGB2BGR=c.COLOR_RGB2BGR
#def resize(*a,**k):
#    return c.resize(*a,**k)
def bitwise_not(*a,**k):
    return c.bitwise_not(*a,**k)
def blur(*a,**k):
    return c.blur(*a,**k)
def medianBlur(*a,**k):
    return c.medianBlur(*a,**k)
def inRange(*a,**k):
    return c.inRange(*a,**k)
def bitwise_and(*a,**k):
    return c.bitwise_and(*a,**k)
def CascadeClassifier(face_cascade_path):
    f=bawrapper.resolve(face_cascade_path)
    return c.CascadeClassifier(f)

COLOR_BGR2YCrCb=c.COLOR_BGR2YCrCb
COLOR_BGR2GRAY=c.COLOR_BGR2GRAY
Canny=c.Canny
"""
def (*a,**k):
    return c.(*a,**k)
"""
