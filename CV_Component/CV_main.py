import cv2 as cv
import numpy as np

def main():
    cap = cv.VideoCapture(0)
    status = cap.isOpened()
    if status==False:
        print("Error while reading the video..!")
    while(True):
        retVal, frame = cap.read()
        if(retVal):
            cv.imshow("Video",frame)
            if(cv.waitKey(1)%256 == 27):
                break
        else:
            break
    cap.release()
    cv.destroyAllWindows()
    return

if __name__ == '__main__':
    main()