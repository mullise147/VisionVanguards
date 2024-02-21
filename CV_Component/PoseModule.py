import cv2 as cv
import mediapipe as mp
import math

class PoseDetector:
    def __init__(self, mode = False, upBody = False, smooth=True, detectionCon = 0.5, trackCon = 0.5):
        self.cap = cv.VideoCapture(0)
        self.mode = mode
        self.upBody = upBody
        self.smooth = smooth
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.upBody, self.smooth)

    def __del__(self):
        self.cap.release()

    def getFrame(self):
        success, img = self.cap.read()
        if success:
            img = self.findPose(img)
            self.getPosition(img)

            img = cv.flip(img, 1)
            cv.imshow("Image", img)

    def findPose(self, img, draw=True):
        imgRGB = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks, self.mpPose.POSE_CONNECTIONS)
                self.left_shoulder = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_SHOULDER]
                self.left_hip = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_HIP]
                self.left_elbow = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_ELBOW]
                self.left_wrist = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_WRIST]
                self.left_knee = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_KNEE]
                self.left_ankle = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.LEFT_ANKLE]


                self.right_shoulder = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_SHOULDER]
                self.right_hip = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_HIP]
                self.right_elbow = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_ELBOW]
                self.right_wrist = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_WRIST]
                self.right_knee = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_KNEE]
                self.right_ankle = self.results.pose_landmarks.landmark[self.mpPose.PoseLandmark.RIGHT_ANKLE]
        return img
    
    def angle_between_lines(self, x1, y1, x2, y2, x3, y3):
        # Calculate the slopes of the two lines
        slope1 = (y2 - y1) / (x2 - x1)
        slope2 = (y3 - y2) / (x3 - x2)
        
        # Calculate the angle between the two lines
        angle = math.atan2(slope2 - slope1, 1 + slope1 * slope2)
        
        # Convert the angle to degrees and return it
        return math.degrees(angle)

    def getPosition(self, img, draw=True):
        if self.results.pose_landmarks:            
            # finds bend in the left arm
            if self.results.pose_landmarks is not None:
                self.left_arm_bend = abs(self.angle_between_lines(self.left_shoulder.x, self.left_shoulder.y, self.left_elbow.x, self.left_elbow.y, self.left_wrist.x, self.left_wrist.y))
            else:
                self.left_arm_bend=0
            # print("Left arm bend :",self.left_arm_bend)
                
            # find height that left arm is raised
            if self.results.pose_landmarks is not None:
                self.left_arm_height = abs(self.angle_between_lines(self.left_hip.x, self.left_hip.y, self.left_shoulder.x, self.left_shoulder.y, self.left_elbow.x, self.left_elbow.y))
            else:
                self.left_arm_height=0
            # print("Left arm height:",self.left_arm_height)
                
            # finds bend in the left leg
            if self.results.pose_landmarks is not None:
                self.left_leg_bend = abs(self.angle_between_lines(self.left_hip.x, self.left_hip.y, self.left_knee.x, self.left_knee.y, self.left_ankle.x, self.left_ankle.y))
            else:
                self.left_leg_bend=0
            # print("Left leg bend :",self.left_leg_bend)
                
            # finds bend in the right arm
            if self.results.pose_landmarks is not None:
                self.right_arm_bend = abs(self.angle_between_lines(self.right_shoulder.x, self.right_shoulder.y, self.right_elbow.x, self.right_elbow.y, self.right_wrist.x, self.right_wrist.y))
            else:
                self.right_arm_bend=0
            # print("Right arm bend :",self.right_arm_bend)

            # find height that right arm is raised
            if self.results.pose_landmarks is not None:
                self.right_arm_height = abs(self.angle_between_lines(self.right_hip.x, self.right_hip.y, self.right_shoulder.x, self.right_shoulder.y, self.right_elbow.x, self.right_elbow.y))
            else:
                self.right_arm_height=0
            # print("Right arm height:",self.right_arm_height)
                
            # finds bend in the right leg
            if self.results.pose_landmarks is not None:
                self.right_leg_bend = abs(self.angle_between_lines(self.right_hip.x, self.right_hip.y, self.right_knee.x, self.right_knee.y, self.right_ankle.x, self.right_ankle.y))
            else:
                self.right_leg_bend=0
            # print("Right leg bend :",self.right_leg_bend)
                
    def yayPose(self):
        if ((self.left_arm_bend >= 0 and self.left_arm_bend <= 10) and (self.left_arm_height >= 20 and self.left_arm_height <= 40) and
            (self.right_arm_bend >= 0 and self.right_arm_bend <= 10) and (self.right_arm_height >= 20 and self.right_arm_height <= 40)):
            print("Yay pose")
        # else:
        #     print("...")

    def handsOnHipPose(self):
        if ((self.left_arm_bend >= 85 and self.left_arm_bend <= 115) and
            (self.right_arm_bend >= 85 and self.right_arm_bend <=115)):
            print("Hands on hip pose")
        # else:
        #     print("...")

    def leftOnHipRightOnHeadPose(self):
        if ((self.left_arm_bend >= 85 and self.left_arm_bend <= 115) and
            (self.right_arm_bend >= 55 and self.right_arm_bend <= 75) and (self.right_arm_height >= 25 and self.right_arm_height <= 55)):
            print("Left on hip right on head pose")
        # else:
        #     print("...")

    def rightOnHipLeftOnHeadPose(self):
        if ((self.right_arm_bend >= 85 and self.right_arm_bend <= 115) and
            (self.left_arm_bend >= 55 and self.left_arm_bend <= 75) and (self.left_arm_height >= 25 and self.left_arm_height <= 55)):
            print("Right on hip and left on head pose")
        # else:
        #     print("...")

    def leftFacingKenPose(self):
        if ((self.right_arm_height >= 130 and self.right_arm_height <= 160) and 
            (self.left_leg_bend >= 145 and self.left_leg_bend <= 175)):
            print("Left ken pose")
        # else:
        #     print("...")

    def rightFacingKenPose(self):
        if ((self.left_arm_height >= 130 and self.left_arm_height <= 160) and 
            (self.right_leg_bend >= 145 and self.right_leg_bend <= 175)):
            print("Right ken pose")
        # else:
        #     print("...")
            
    def leftLegYogaPose(self):
        if ((self.left_arm_bend >= 15 and self.left_arm_bend <= 45) and
            (self.right_arm_bend >= 15 and self.right_arm_bend <= 45) and
            (self.left_leg_bend >= 70 and self.left_leg_bend <= 100)):
            print("Left leg yoga pose")
        # else:
        #     print("...")

    def rightLegYogaPose(self):
        if ((self.left_arm_bend >= 15 and self.left_arm_bend <= 45) and
            (self.right_arm_bend >= 15 and self.right_arm_bend <= 45) and
            (self.right_leg_bend >= 70 and self.right_leg_bend <= 100)):
            print("Right leg yoga pose")
        # else:
        #     print("...")
            
    def leftGuitarLeftLegPose(self):
        if((self.left_arm_bend >= 65 and self.left_arm_bend <= 115) and
           (self.right_arm_bend >= 45 and self.right_arm_bend <= 80) and
           (self.right_leg_bend >= 20 and self.right_leg_bend <= 50)):
            print("Left guitar left leg pose")
        # else:
        #     print("...")
        
    def rightGuitarRightLegPose(self):
        if((self.right_arm_bend >= 65 and self.right_arm_bend <= 115) and
           (self.left_arm_bend >= 45 and self.left_arm_bend <= 80) and
           (self.left_leg_bend >= 20 and self.left_leg_bend <= 50)):
            print("Right guitar right leg pose")
        # else:
        #     print("...")

def main():
    # Single Ladies first then maybe Macarena or Vogue
    camera = PoseDetector()
    
    while True:
        frame = camera.getFrame()
        
        if cv.waitKey(1) & 0xFF == ord('q'):
            break
    # self.cap = cv.VideoCapture(0)
    # # pTime = 0
    # # detector = PoseDetector()
    # while True:
    #     success, img = self.cap.read()
    #     if success:
    #         img = self.findPose(img)
    #         self.getPosition(img)
    #         # detector.yayPose()
    #         # detector.handsOnHipPose()
    #         # detector.leftOnHipRightOnHeadPose()
    #         # detector.rightOnHipLeftOnHeadPose()
    #         # detector.leftFacingKenPose()
    #         # detector.rightFacingKenPose()
    #         # detector.leftLegYogaPose()
    #         # detector.rightLegYogaPose()
    #         # detector.leftGuitarLeftLegPose()
    #         # detector.rightGuitarRightLegPose()

    #         cTime = time.time()
    #         fps = 1 / (cTime - pTime)
    #         pTime = cTime

    #         img = cv.flip(img, 1)
    #         cv.putText(img, str(int(fps)), (50, 50), cv.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)
    #         cv.imshow("Image", img)
    #         if cv.waitKey(1) & 0xFF == ord('q'):
    #             break
    return
    

if __name__ == "__main__":
    main()