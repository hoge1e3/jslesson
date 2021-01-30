import numpy as np
import cv2

img = np.zeros((256,256,3))

cv2.line(img, (0,0), (255, 255), (0, 0, 255), 5)
cv2.circle(img,(40, 40), 30, (255, 0, 0), -1)
cv2.ellipse(img, (40, 100), (30, 30), 0, 0, 180, (0, 0, 255), -1)

cv2.imshow('image', img)
