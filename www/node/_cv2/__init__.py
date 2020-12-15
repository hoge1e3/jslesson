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
LINE_4=c.LINE_4
LINE_8=c.LINE_8
LINE_AA=c.LINE_AA

threshold=c.threshold
#circle=c.circle
THRESH_BINARY=c.THRESH_BINARY
THRESH_BINARY_INV=c.THRESH_BINARY_INV
THRESH_TRUNC=c.THRESH_TRUNC
THRESH_TOZERO=c.THRESH_TOZERO
THRESH_TOZERO_INV=c.THRESH_TOZERO_INV
MORPH_OPEN=c.MORPH_OPEN
MORPH_CLOSE=c.MORPH_CLOSE
#LINE_4=c.LINE_4
#LINE_8=c.LINE_8
#LINE_AA=c.LINE_AA
ADAPTIVE_THRESH_MEAN_C=c.ADAPTIVE_THRESH_MEAN_C
ADAPTIVE_THRESH_GAUSSIAN_C=c.ADAPTIVE_THRESH_GAUSSIAN_C
IMREAD_COLOR=c.IMREAD_COLOR
IMREAD_GRAYSCALE=c.IMREAD_GRAYSCALE
IMREAD_UNCHANGED=c.IMREAD_UNCHANGED
FONT_HERSHEY_SIMPLEX=c.FONT_HERSHEY_SIMPLEX
THRESH_OTSU=c.THRESH_OTSU
MORPH_GRADIENT=c.MORPH_GRADIENT
MORPH_TOPHAT=c.MORPH_TOPHAT
MORPH_BLACKHAT=c.MORPH_BLACKHAT
MORPH_RECT=c.MORPH_RECT
MORPH_ELLIPSE=c.MORPH_ELLIPSE
MORPH_CROSS=c.MORPH_CROSS
CV_64F=c.CV_64F
CV_8U=c.CV_8U
RETR_TREE=c.RETR_TREE
CHAIN_APPROX_SIMPLE=c.CHAIN_APPROX_SIMPLE
CHAIN_APPROX_NONE=c.CHAIN_APPROX_NONE
RETR_LIST=c.RETR_LIST
RETR_EXTERNAL=c.RETR_EXTERNAL
RETR_CCOMP=c.RETR_CCOMP
NORM_MINMAX=c.NORM_MINMAX
BORDER_CONSTANT=c.BORDER_CONSTANT
DFT_COMPLEX_OUTPUT=c.DFT_COMPLEX_OUTPUT
TM_SQDIFF=c.TM_SQDIFF
TM_SQDIFF_NORMED=c.TM_SQDIFF_NORMED
TM_CCOEFF=c.TM_CCOEFF
TM_CCOEFF_NORMED=c.TM_CCOEFF_NORMED
TM_CCORR=c.TM_CCORR
TM_CCORR_NORMED=c.TM_CCORR_NORMED
TM_SQDIFF=c.TM_SQDIFF
TM_SQDIFF_NORMED=c.TM_SQDIFF_NORMED

GaussianBlur=c.GaussianBlur
erode=c.erode
dilate=c.dilate
morphologyEx=c.morphologyEx
findContours=c.findContours
drawContours=c.drawContours
contourArea=c.contourArea
arcLength=c.arcLength
approxPolyDP=c.approxPolyDP
boundingRect=c.boundingRect
warpAffine=c.warpAffine
#line=c.line
#ellipse=c.ellipse
Laplacian=c.Laplacian
Sobel=c.Sobel
adaptiveThreshold=c.adaptiveThreshold

polylines=c.polylines
putText=c.putText
merge=c.merge
addWeighted=c.addWeighted
add=c.add
countNonZero=c.countNonZero
getRotationMatrix2D=c.getRotationMatrix2D
getAffineTransform=c.getAffineTransform
getPerspectiveTransform=c.getPerspectiveTransform
warpPerspective=c.warpPerspective
calcHist=c.calcHist
filter2D=c.filter2D
bilateralFilter=c.bilateralFilter
getStructuringElement=c.getStructuringElement
pyrDown=c.pyrDown
pyrUp=c.pyrUp
subtract=c.subtract
moments=c.moments
convexHull=c.convexHull
isContourConvex=c.isContourConvex
minAreaRect=c.minAreaRect
boxPoints=c.boxPoints
minEnclosingCircle=c.minEnclosingCircle
fitEllipse=c.fitEllipse
fitLine=c.fitLine
findNonZero=c.findNonZero
minMaxLoc=c.minMaxLoc
mean=c.mean
matchShapes=c.matchShapes
normalize=c.normalize
calcBackProject=c.calcBackProject
dft=c.dft
magnitude=c.magnitude
idft=c.idft
getGaussianKernel=c.getGaussianKernel
matchTemplate=c.matchTemplate
HoughLines=c.HoughLines
HoughLinesP=c.HoughLinesP
