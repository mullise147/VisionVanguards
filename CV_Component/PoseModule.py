import cv2 as cv
import mediapipe as mp
import time
import math

def angle_between_lines(x1, y1, x2, y2, x3, y3):
    # Calculate the slopes of the two lines
    slope1 = (y2 - y1) / (x2 - x1)
    slope2 = (y3 - y2) / (x3 - x2)
    
    # Calculate the angle between the two lines
    angle = math.atan2(slope2 - slope1, 1 + slope1 * slope2)
    
    # Convert the angle to degrees and return it
    return math.degrees(angle)

class PoseDetector:
    def __init__(self, mode = False, upBody = False, smooth=True, detectionCon = 0.5, trackCon = 0.5):
        self.mode = mode
        self.upBody = upBody
        self.smooth = smooth
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.upBody, self.smooth)

    def findPose(self, img, draw=True):
        imgRGB = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)
        #print(results.pose_landmarks)
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks, self.mpPose.POSE_CONNECTIONS)
        return img

    def getPosition(self, img, draw=True):
        lmList= []
        if self.results.pose_landmarks:
            left_shoulder = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_SHOULDER]
            left_hip = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_HIP]
            left_elbow = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_ELBOW]
            left_wrist = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_WRIST]

            right_shoulder = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_SHOULDER]
            right_hip = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_HIP]
            right_elbow = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_ELBOW]
            right_wrist = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_WRIST]
            
            # finds bend in the left arm
            if self.results.pose_landmarks is not None:
                left_arm_bend = abs(angle_between_lines(left_shoulder.x, left_shoulder.y, left_elbow.x, left_elbow.y, left_wrist.x, left_wrist.y))
            else:
                left_arm_bend=0
            # print("Left Arm(Shoulder, Wrist) :",left_arm_bend)

            # find height that left arm is raised
            if self.results.pose_landmarks is not None:
                left_arm_height = abs(angle_between_lines(left_hip.x, left_hip.y, left_shoulder.x, left_shoulder.y, left_elbow.x, left_elbow.y))
            else:
                left_arm_height=0
            # print("Left Shoulder-Hip:",left_arm_height)
                
            # finds bend in the right arm
            if self.results.pose_landmarks is not None:
                right_arm_bend = abs(angle_between_lines(right_shoulder.x, right_shoulder.y, right_elbow.x, right_elbow.y, right_wrist.x, right_wrist.y))
            else:
                right_arm_bend=0
            # print("Right Arm(Shoulder, Wrist) :",right_arm_bend)

            # find height that right arm is raised
            if self.results.pose_landmarks is not None:
                right_arm_height = abs(angle_between_lines(right_hip.x, right_hip.y, right_shoulder.x, right_shoulder.y, right_elbow.x, right_elbow.y))
            else:
                right_arm_height=0
            # print("Right Shoulder-Hip:",right_arm_height)
                
            if ((left_arm_bend >= 80 and left_arm_bend <= 100) and (left_arm_height >= 115 and left_arm_height <= 135) and
            (right_arm_bend >= 80 and right_arm_bend <= 100) and (right_arm_height >= 115 and right_arm_height <= 135)):
                print("Got there!")
            else:
                print("Not quite there :(")


            # # angle3 between left parts points 24,12,14
            # right_hip = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.RIGHT_HIP]
            # right_elbow = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.RIGHT_ELBOW]
            
            # if results.pose_landmarks is not None:
            #     angle3 = abs(angle_between_lines(right_hip.x, right_hip.y, right_shoulder.x, right_shoulder.y, right_elbow.x, right_elbow.y))
            # else:
            #     angle3=0
            # print("Right Shoulder-Hip:",angle3)

            # # angle4 between left parts points 24,12,14
            # right_wrist = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.RIGHT_WRIST]
            
            # if results.pose_landmarks is not None:
            #     angle4 = abs(angle_between_lines(right_shoulder.x, right_shoulder.y, right_elbow.x, right_elbow.y, right_wrist.x, right_wrist.y))
            # else:
            #     angle4=0
            # print("Right Shoulder-Wrist:",angle4)
                


        #     for id, lm in enumerate(self.results.pose_landmarks.landmark):
        #         h, w, c = img.shape
        #         #print(id, lm)
        #         cx, cy = int(lm.x * w), int(lm.y * h)
        #         lmList.append([id, cx, cy])
        #         if draw:
        #             cv.circle(img, (cx, cy), 5, (255, 0, 0), cv.FILLED)
        # return lmList

def main():
    cap = cv.VideoCapture(0)
    pTime = 0
    detector = PoseDetector()
    while True:
        success, img = cap.read()
        if success:
            img = detector.findPose(img)
            lmList = detector.getPosition(img)
            # print(lmList)

            cTime = time.time()
            fps = 1 / (cTime - pTime)
            pTime = cTime

            img = cv.flip(img, 1)
            cv.putText(img, str(int(fps)), (50, 50), cv.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)
            cv.imshow("Image", img)
            if cv.waitKey(1) & 0xFF == ord('q'):
                break

if __name__ == "__main__":
    main()