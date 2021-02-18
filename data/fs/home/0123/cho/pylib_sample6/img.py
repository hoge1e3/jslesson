import cv2
import numpy as np

img=cv2.imread("user/image.jpg")
print(img.shape)

#orgHeight, orgWidth = img.shape[:2]
orgHeight, orgWidth = img.shape[:2]
print(orgHeight, orgWidth)
size = (int(orgWidth/2), int(orgHeight/2))
print(size)

edges = cv2.Canny(img,100,200)
img_ycrcb = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#Create Half Size Image
#halfImg = cv2.resize(img, (orgHeight / 2, orgWidth / 2))
halfImg = cv2.resize(img, size)
img[100,100] = [255,255,255]
kernel = np.ones((5,5),np.float32)/25
half2 = cv2.filter2D(img,-1,kernel)

cv2.imshow("before",img)
cv2.imshow("test",edges)
cv2.imshow("test",img_ycrcb)
cv2.imshow("after",halfImg)
cv2.imshow("hoge", half2)

