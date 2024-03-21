import cv2 as cv
import mediapipe as mp
import math
import time

class PoseDetector:
    def __init__(self, mode = False, upBody = False, smooth=True, detectionCon = 0.5, trackCon = 0.5):
        self.cap = cv.VideoCapture(0)
        self.mode = mode
        self.upBody = upBody
        self.smooth = smooth
        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.upBody, self.smooth)
        self.score = 0
        self.rightHOH1 = self.leftHOH1 = self.rightHOH2 = self.leftHOH2 = 0
        self.yayP = self.HOH = self.rightDivaP = self.leftPush = self.rightBack = 0
        self.leftRing1 = self.rightRing1 = self.leftRing2 = self.rightRing2 = 0
        self.leftOh1 = self.rightOh1 = self.leftOh2 = 0
        self.rightRing3 = self.leftRing3 = self.rightRing4 = self.leftRing4 = 0

    def __del__(self):
        self.cap.release()

    def getFrame(self):
        start_time = time.time()
        while True:
            success, frame = self.cap.read()
            if success:
                frame = self.findPose(frame)
                self.getPosition(frame)
                frame = cv.flip(frame, 1)
                ret, buffer = cv.imencode('.jpg', frame)
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
                if start_time <= time.time() < start_time+4 and self.rightHOH1 != 1:
                    self.rightHOH1 = self.rightHandOnHip()
                    self.score += self.rightHOH1
                elif start_time+4 <= time.time() <= start_time+6 and self.leftHOH1 != 1:
                    self.leftHOH1 = self.leftHandOnHip()
                    self.score += self.leftHOH1
                elif start_time+7 <= time.time() <= start_time+8 and self.rightHOH2 != 1:
                    self.rightHOH2 = self.rightHandOnHip()
                    self.score += self.rightHOH2
                elif start_time+9 <= time.time() < start_time+10 and self.leftHOH2 != 1:
                    self.leftHOH2 = self.leftHandOnHip()
                    self.score += self.leftHOH2
                elif start_time+10 <= time.time() < start_time+12 and self.yayP != 1:
                    self.yayP = self.yay()
                    self.score += self.yayP
                elif start_time+12 <= time.time() <= start_time+16 and self.HOH != 1:
                    self.HOH = self.handsOnHip()
                    self.score += self.HOH
                elif start_time+17 <= time.time() <= start_time+21 and self.rightDivaP != 1:
                    self.rightDivaP = self.rightDiva()
                    self.score += self.rightDivaP
                elif start_time+22 <= time.time() <= start_time+26 and self.leftPush != 1:
                    self.leftPush = self.leftPushAway()
                    self.score += self.leftPush
                elif start_time+27 <= time.time() <= start_time+31 and self.rightBack != 1:
                    self.rightBack = self.rightBreakBack()
                    self.score += self.rightBack
                elif start_time+32 <= time.time() <= start_time+33 and self.leftRing1 != 1:
                    self.leftRing1 = self.leftRingOnIt()
                    self.score += self.leftRing1
                elif start_time+34 <= time.time() <= start_time+36 and self.rightRing1 != 1:
                    self.rightRing1 = self.rightRingOnIt()
                    self.score += self.rightRing1
                elif start_time+37 <= time.time() <= start_time+38 and self.leftRing2 != 1:
                    self.leftRing2 = self.leftRingOnIt()
                    self.score += self.leftRing2
                elif start_time+39 <= time.time() <= start_time+41 and self.rightRing2 != 1:
                    self.rightRing2 = self.rightRingOnIt()
                    self.score += self.rightRing2
                elif start_time+42 <= time.time() <= start_time+44 and self.leftOh1 != 1:
                    self.leftOh1 = self.leftOhOhOh()
                    self.score += self.leftOh1
                elif start_time+45 <= time.time() <= start_time+47 and self.rightOh1 != 1:
                    self.rightOh1 = self.rightOhOhOh()
                    self.score += self.rightOh1
                elif start_time+48 <= time.time() <= start_time+51 and self.leftOh2 != 1:
                    self.leftOh2 = self.leftOhOhOh()
                    self.score += self.leftOh2
                elif start_time+52 <= time.time() <= start_time+53 and self.rightRing3 != 1:
                    self.rightRing3 = self.rightRingOnIt()
                    self.score += self.rightRing3
                elif start_time+54 <= time.time() <= start_time+55 and self.leftRing3 != 1:
                    self.leftRing3 = self.leftRingOnIt()
                    self.score += self.leftRing3
                elif start_time+56 <= time.time() <= start_time+58 and self.rightRing4 != 1:
                    self.rightRing4 = self.rightRingOnIt()
                    self.score += self.rightRing4
                elif start_time+59 <= time.time() <= start_time+60 and self.leftRing4 != 1:
                    self.leftRing4 = self.leftRingOnIt()
                    self.score += self.leftRing4
    
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
                
    def rightBreakBack(self):
        if (80 <= self.left_arm_bend <= 120 and
            0 <= self.right_leg_bend <= 40):
            print("right break back")
            return 1
        else:
            print("right back")

    def rightDiva(self):
        if (70 <= self.right_arm_bend <= 110 and
            75 <= self.left_arm_bend <= 125 and
            5 <= self.right_leg_bend <= 35):
            print("right diva pose")
            return 1
        else:
            print("right diva")

    def leftHandOnHip(self):
        if (75 <= self.left_arm_bend <= 125):
            print("left hand on hip pose")
            return 1
        else:
            print("left HOH")

    def rightHandOnHip(self):
        if (75 <= self.right_arm_bend <= 125):
            print("right hand on hip pose")
            return 1
        else:
            print("right HOH")

    def leftRingOnIt(self):
        if (100 <= self.left_arm_bend <= 140 and 105 <= self.left_arm_height <= 145 and
        75 <= self.right_arm_bend <=125):
            print("left ring on it pose")
            return 1
        else:
            print("left rink")

    def rightRingOnIt(self):
        if (90 <= self.right_arm_bend <= 150 and 95 <= self.right_arm_height <= 155 and
        65 <= self.left_arm_bend <=135):
            print("right ring on it pose")
            return 1
        else:
            print("right ring")  

    def leftPushAway(self):
        if (50 <= self.left_arm_bend <= 90 and
        70 <= self.right_arm_height <= 110 and
        10 <= self.right_leg_bend <= 50):
            print("left push away pose")
            return 1
        else:
            print("left push")
        
    def leftOhOhOh(self):
        if (120 <= self.right_arm_height <= 170 and 
        135 <= self.left_leg_bend <= 185):
            print("Left oh oh oh pose")
            return 1
        else:
            print("left oh")

    def rightOhOhOh(self):
        if (120 <= self.left_arm_height <= 170 and 
        135 <= self.right_leg_bend <= 185):
            print("Right oh oh oh pose")
            return 1
        else:
            print("right oh")

    def yay(self):
        if (0 <= self.left_arm_bend <= 20 and 10 <= self.left_arm_height <= 50 and
        0 <= self.right_arm_bend <= 20 and 10 <= self.right_arm_height <= 50):
            print("Yay pose")
            return 1
        else:
            print("yay")

    def handsOnHip(self):
        if (75 <= self.left_arm_bend <= 125 and
        75 <= self.right_arm_bend <=125):
            print("Hands on hip pose")
            return 1
        else:
            print("HOH")

    def leftBreakBack(self):
        if (80 <= self.right_arm_bend <= 120 and
            0 <= self.left_leg_bend <= 40):
            print("left break back")
        else:
            print("...")
                
    def leftDiva(self):
        if (70 <= self.left_arm_bend <= 110 and
            75 <= self.right_arm_bend <= 125 and
            5 <= self.left_leg_bend <= 35):
            print("left diva pose")
        else:
            print("...")

    def bentArmsAboveHead(self):
        if (10 <= self.right_arm_height <= 50 and 100 <= self.right_arm_bend <= 140 and
        10 <= self.left_arm_height <= 50 and 100 <= self.left_arm_bend <= 140):
            print("bent arms above head pose")
            return 1
        else:
            print("...")

    def rightPushAway(self):
        if (50 <= self.right_arm_bend <= 90 and
        70 <= self.left_arm_height <= 110 and
        10 <= self.left_leg_bend <= 50):
            print("right push away pose")
        else:
            print("...")

    def armsOut(self):
        if (65 <= self.left_arm_height <= 105 and
        65 <= self.right_arm_height <= 105):
            print("arms out pose")
        else:
            print("...")

    def leftOnHipRightOnHead(self):
        if (75 <= self.left_arm_bend <= 125 and
        45 <= self.right_arm_bend <= 85 and 15 <= self.right_arm_height <= 65):
            print("Left on hip right on head pose")
        else:
            print("...")

    def rightOnHipLeftOnHead(self):
        if (75 <= self.right_arm_bend <= 125 and
        45 <= self.left_arm_bend <= 85 and 15 <= self.left_arm_height <= 65):
            print("Right on hip and left on head pose")
        else:
            print("...")

    def leftYoga(self):
        if (5 <= self.left_arm_bend <= 55 and
        5 <= self.right_arm_bend <= 55 and
        60 <= self.left_leg_bend <= 110):
            print("Left leg yoga pose")
        else:
            print("...")

    def rightYoga(self):
        if (5 <= self.left_arm_bend <= 55 and
        5 <= self.right_arm_bend <= 55 and
        60 <= self.right_leg_bend <= 110):
            print("Right leg yoga pose")
        else:
            print("...")

    def leftGuitarLeftLeg(self):
        if(55 <= self.left_arm_bend <= 125 and
        35 <= self.right_arm_bend <= 90 and
        10 <= self.right_leg_bend <= 60):
            print("Left guitar left leg pose")
        else:
            print("...")

    def rightGuitarRightLeg(self):
        if(55 <= self.right_arm_bend <= 125 and
        35 <= self.left_arm_bend <= 90 and
        10 <= self.left_leg_bend <= 60):
            print("Right guitar right leg pose")
        else:
            print("...")
