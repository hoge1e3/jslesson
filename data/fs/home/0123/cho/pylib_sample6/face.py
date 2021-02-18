import cv2

face_cascade = cv2.CascadeClassifier("user/haarcascade_frontalface_default.xml")
src = cv2.imread('user/2020-11-30_16h13_39.png')
#http://localhost/fs/pub/533a250b/2020-11-30_12h54_46.png
#http://localhost/fs/pub/533a250b/2020-11-30_16h13_39.png
src_gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(src_gray)

for x, y, w, h in faces:
    cv2.rectangle(src, (x, y), (x + w, y + h), (255, 0, 0), 2)
    face = src[y: y + h, x: x + w]
    face_gray = src_gray[y: y + h, x: x + w]
    #eyes = eye_cascade.detectMultiScale(face_gray)
    #for ex, ey, ew, eh in eyes:
    #    cv2.rectangle(face, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)
cv2.imshow("face", src)
