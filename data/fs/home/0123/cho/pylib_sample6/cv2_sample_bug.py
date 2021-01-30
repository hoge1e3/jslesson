import cv2
import numpy as np
print("=== (constant)IMREAD_**===")
#imread,引数1つしか受け付けてくれない
#img = cv2.imread("tt.png", cv2.IMREAD_COLOR)
#print(img.shape)
#img = cv2.imread("tt.png", cv2.IMREAD_UNCHANGED)
#print(img.shape)
#img = cv2.imread("tt.png", cv2.IMREAD_GRAYSCALE)
#print(img.shape)
#print()

print("=== HoughCircles & HOUGH_GRADIENT ===")
#img = cv2.imread("tt.png", 1)
img = cv2.imread("user/aoi.png")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#時間かかると書かれていたので未対応
#circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, dp=1.0, minDist=20, param1=50, param2=50)
#print(type(circles))
print()

print("=== minEnclosingCircle & fitEllipse & fitLine & (constant)DIST_L2 ===")
# 文法エラー
#cont, _ = cv2.findContours(th, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
#(x, y), r = cv2.minEnclosingCircle(cont[0])
#print(x, y, r)
#f = 0
#for c in cont:
#    if len(c) >= 5:
#        ellipse = cv2.fitEllipse(c)
#        print(len(ellipse))
#        f = 1
#        break
#if not f:
#    print("no fit ellipse")
#[vx, vy, x, y] = cv2.fitLine(cont[0], cv2.DIST_L2, 0, 0, 0.01, 0.01)
#print(vx, vy, x, y)
#print()

print("=== countNonZero & findNonZero ===")
#img = cv2.imread("tt.png", 0)
img = cv2.imread("user/aoi.png")
#Traceback (most recent call last):
#  File "/home/klab/badata/pythonwork/654737/conv.py", line 171, in <module>
#    _,th=cv2.threshold(img, 0 , 255 ,cv2.THRESH_OTSU)
#cv2.error: OpenCV(4.4.0) /tmp/pip-install-1w4weig4/opencv-python/opencv/modules/imgproc/src/thresh.cpp:1557: error: (-2:Unspecified error) in function 'double cv::threshold(cv::InputArray, cv::OutputArray, double, double, int)'
#> THRESH_OTSU mode:
#>     'src_type == CV_8UC1 || src_type == CV_16UC1'
#> where
#>     'src_type' is 16 (CV_8UC3)
#_, th = cv2.threshold(img, 0, 255, cv2.THRESH_OTSU)

#area = th.size
#white = cv2.countNonZero(th)
#black = area - white
#print(area, white, black)
#fnz = cv2.findNonZero(th)
#print(fnz.shape)
print()

print("=== matchTemplate & minMaxLoc & (constant)TM_** ===")
#img = cv2.imread("tt.png", 0)
img = cv2.imread("user/aoi.png")
#temp = cv2.imread("tt_ball.png", 0)
temp = cv2.imread("user/aoi.png")
#img2 = img.copy()
#w, h = temp.shape[1], temp.shape[0]
#methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
#           'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']
#for method in methods:
#    img = img2.copy()
#     evalは未定義です
#     method = eval(method)
#    res = cv2.matchTemplate(img, temp, method)
#    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
#    print(res.shape, min_val, max_val, min_loc, max_loc)
#print()

print("=== matchShapes ===")
img = np.zeros((500, 500))
ellipse1 = cv2.ellipse(img.copy(), ((250, 250), (100, 200), 30), (255, 255, 255), -1)
cv2.imwrite("user/ell1.png", ellipse1)
ellipse2 = cv2.ellipse(img.copy(), ((250, 250), (260, 80), 30), (255, 255, 255), -1)
cv2.imwrite("user/ell2.png", ellipse2)
#ellipse1 = cv2.imread("ell1.png", 0)
ellipse1 = cv2.imread("user/ell1.png")
#ellipse2 = cv2.imread("ell2.png", 0)
ellipse2 = cv2.imread("user/ell2.png")
#_, eth1 = cv2.threshold(ellipse1, 127, 255, 0)
#_, eth2 = cv2.threshold(ellipse2, 127, 255, 0)
#Traceback (most recent call last):
#  File "/home/klab/badata/pythonwork/654737/conv.py", line 237, in <module>
#    cnt,_=cv2.findContours(eth1, 2 , 1 )
#cv2.error: OpenCV(4.4.0) /tmp/pip-install-1w4weig4/opencv-python/opencv/modules/imgproc/src/contours.cpp:197: error: (-210:Unsupported format or combination of formats) [Start]FindContours supports only CV_8UC1 images when mode != CV_RETR_FLOODFILL otherwise supports CV_32SC1 images only in function 'cvStartFindContours_Impl'
#cnt, _, = cv2.findContours(eth1, 2, 1)
#ecnt1 = cnt[0]
#cnt, _, = cv2.findContours(eth2, 2, 1)
#ecnt2 = cnt[0]
#ret = cv2.matchShapes(ecnt1, ecnt2, 1, 0.0)
#print(ret)
print()

print("=== dft & idft & magnitude ===")
#img = cv2.imread("tt.png", 0)
img = cv2.imread("user/aoi.png")
#Traceback (most recent call last):
#  File "/home/klab/badata/pythonwork/654737/conv.py", line 268, in <module>
#    dft=cv2.dft(np.float32(img),flags=cv2.DFT_COMPLEX_OUTPUT)
#cv2.error: OpenCV(4.4.0) /tmp/pip-install-1w4weig4/opencv-python/opencv/modules/core/src/dxt.cpp:3335: error: (-215:Assertion failed) type == CV_32FC1 || type == CV_32FC2 || type == CV_64FC1 || type == CV_64FC2 in function 'dft'
#dft = cv2.dft(np.float32(img), flags=cv2.DFT_COMPLEX_OUTPUT)
#magspec = 20 * np.log(cv2.magnitude(dft[:, :, 0], dft[:, :, 1]))
#print(dft.shape, magspec.shape)
#idft = cv2.idft(dft)
#magimg = cv2.magnitude(idft[:, :, 0], idft[:, :, 1])
#print(magimg.shape)
