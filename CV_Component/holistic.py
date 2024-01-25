import cv2
import mediapipe as mp
import math
import time

def angle_between_lines(x1, y1, x2, y2, x3, y3):
    # Calculate the slopes of the two lines
    slope1 = (y2 - y1) / (x2 - x1)
    slope2 = (y3 - y2) / (x3 - x2)
    
    # Calculate the angle between the two lines
    angle = math.atan2(slope2 - slope1, 1 + slope1 * slope2)
    
    # Convert the angle to degrees and return it
    return math.degrees(angle) 

class HolisticDetector:
    def __init__(self, detectionCon=0.5, trackCon=0.5):
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_drawing_styles = mp.solutions.drawing_styles
        self.mp_holistic = mp.solutions.holistic
        self.holistic = self.mp_holistic.Holistic()
        self.videoDetection()

    def videoDetection(self):
        cap = cv2.VideoCapture(0)
        pTime = 0
        while True:
            success, image = cap.read()
            if success:
                image, results = self.findPose(image)
            
                self.detectPose(results)

                cTime = time.time()
                fps = 1 / (cTime - pTime)
                pTime = cTime

                image = cv2.flip(image, 1)
                cv2.putText(image, str(int(fps)), (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)
                cv2.imshow('MediaPipe Holistic', image)
                if cv2.waitKey(5) & 0xFF == 27:
                    break


    def findPose(self, image):
        # To improve performance, optionally mark the image as not writeable to
        # pass by reference.
        image.flags.writeable = False
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = self.holistic.process(image)

        # Draw landmark annotation on the image.
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        self.mp_drawing.draw_landmarks(
            image,
            results.pose_landmarks,
            self.mp_holistic.POSE_CONNECTIONS,
            landmark_drawing_spec=self.mp_drawing_styles
            .get_default_pose_landmarks_style())
        return image, results

    def detectPose(self, results):
        # Get the coordinates of the left shoulder and right shoulder
        left_shoulder = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.RIGHT_SHOULDER]
        
        # angle1 between left parts points 11,13,15
        # left_shoulder = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.LEFT_SHOULDER]
        left_elbow = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.LEFT_ELBOW]
        left_wrist = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.LEFT_WRIST]
        
        if results.pose_landmarks is not None:
            angle1 = abs(angle_between_lines(left_shoulder.x, left_shoulder.y, left_elbow.x, left_elbow.y, left_wrist.x, left_wrist.y))
        else:
            angle1=0
        print("Left Arm(Shoulder, Wrist) :",angle1)
        
        # angle2 between left parts points 23,11,13
        left_hip = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.LEFT_HIP]
        
        if results.pose_landmarks is not None:
            angle2 = abs(angle_between_lines(left_hip.x, left_hip.y,left_shoulder.x, left_shoulder.y, left_elbow.x, left_elbow.y))
        else:
            angle2=0
        print("Left Shoulder-Hip:",angle2)

        # angle3 between left parts points 24,12,14
        right_hip = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.RIGHT_HIP]
        right_elbow = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.RIGHT_ELBOW]
        
        if results.pose_landmarks is not None:
            angle3 = abs(angle_between_lines(right_hip.x, right_hip.y, right_shoulder.x, right_shoulder.y, right_elbow.x, right_elbow.y))
        else:
            angle3=0
        print("Right Shoulder-Hip:",angle3)

        # angle4 between left parts points 24,12,14
        right_wrist = results.pose_landmarks.landmark[self.mp_holistic.PoseLandmark.RIGHT_WRIST]
        
        if results.pose_landmarks is not None:
            angle4 = abs(angle_between_lines(right_shoulder.x, right_shoulder.y, right_elbow.x, right_elbow.y, right_wrist.x, right_wrist.y))
        else:
            angle4=0
        print("Right Shoulder-Wrist:",angle4)

def main():
    HolisticDetector()
    
            
if __name__ == "__main__":
    main()