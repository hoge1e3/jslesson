import cv2
import numpy as np

img = cv2.imread("user/aoi.png")
img1 = cv2.imread("user/aoi.png")
img2 = cv2.imread("user/trim.png")
kernel = np.ones((5, 5))
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)




print("=== HOughLines & HoughLinesP ===")
#img = cv2.imread("tmk.png", 0)
canny = cv2.Canny(img, 50, 100)
lines = cv2.HoughLines(canny, 1, np.pi / 180, 100)
print(type(lines))
lines = cv2.HoughLinesP(canny, 1, np.pi / 180, 100, 10)
print(type(lines))
