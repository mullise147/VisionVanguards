# Senior Design Report - SightStep by The Vision Vanguards

## Table of Contents

1. [Team Names and Advisor](#team-names-and-advisor)
2. [Project Description](#project-description)
3. [User Interface Specification](#user-interface-specification)
4. [Test Plan and Results](#test-plan-and-results)
5. [User Manual](#user-manual)
6. [Spring Final Presentation](#spring-final-presentation)
7. [Final Expo Poster](#final-expo-poster)
8. [Self-Assessment Essays](#self-assessment-essays)
9. [Summary of Hours and Justification](#summary-of-hours-and-justification)
10. [Summary of Expenses](#summary-of-expenses)
11. [Appendix](#appendix)

## Team Names and Advisor
- Team Members: Stephanie Mullins, Rob Kelly, Athulya Ganesh
- Advisor: Dr. Jilian Aurisano
- [Link to our Biographies](Biographies.md)
- [Link to Video Demo -- no audio available unfortunately](https://www.youtube.com/watch?v=l0enL6FKXBA)

## Project Description
Vision Vanguards aims to develop an integrated karaoke and movement web application, combining computer vision and audio processing technologies. The project involves implementing gesture and full-body skeletal tracking, alongside audio processing for lyrical pitch accuracy. The team has completed initial research, environment setup, and technology selection for the web interface. The envisioned outcome includes a fully functional platform with accurate scoring for singing and dance movements, a comprehensive lyrics module, and user management features. The project's success relies on the seamless execution of key tasks, including technology implementation and interface optimization.

## User Interface Specification

Functionality: 
- A user can sign up/login for the web application either using an email and password, or sign in through Google.
- A user can view the leaderboard that shows the top 5 scorers of the game, including details like their high score, the number of games played and tags associated with their performance.
- A user can also view their specific ranking and how they compare to others in the same league.
- A user can sign out/delete their own account.
- A user can start an audio performance, with a preview to check whether audio is functional. Once the performance starts, the user is able to view lyrics.
- Alternatively, a user can start an audio-video performance where they can follow along with lyrics while posing.
- Once the performance ends, a user can view their comprehensive score and their scores in various categories including posing, lyrics and pitch. They can also restart the performance, or view updates to the leaderboard.

User Interaction:
- Users can navigate the website using a combination of mouse clicks and keyboard inputs.
- Interactive elements such as buttons and links should provide visual feedback when clicked.
- Forms should validate user input in real-time and display error messages if necessary.

Visual Design Guides:
- The website will use a modern and clean design aesthetic.
- Color scheme: Predominantly blues, pinks and blacks and white.
- Typography: Rubix Mono for headings and Cousine for body text.

UI Design Mockups can be viewed on our Figma. Here are some screenshots of the app illustrating the color scheme, layout and some functionality: 
<img width="1468" alt="Screenshot 2024-04-11 at 2 53 29 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/c422e650-820e-46c9-af87-298d67d06329">

<img width="1470" alt="Screenshot 2024-04-11 at 2 53 55 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/d909f708-a62b-4b8e-ac7d-5c92bbd9f602">

<img width="1470" alt="Screenshot 2024-04-11 at 2 56 03 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/1cb75aa2-afb3-48fb-ab08-2b4c370d8a35">


## Test Plan and Results
[Full Test Plan and Results](Assignments/Test_Plan_Plus_Results.pdf)

## User Manual
### Table of Contents

a. Getting Started  
b. Signing Up/Login  
c. Viewing the Leaderboard  
d. Performing  
e. Viewing Scores  
f. Account Management  
g. FAQ

## a. Getting Started
To run the app, follow the instructions below: 

1. Clone this repository in your desired folder using the command ```git clone https://github.com/mullise147/VisionVanguards```.
2. After cloning, enter to the following directory: ```VisionVanguards/web-app/api``` and run this command: ```python3 main.py``` to start the Flask API. It may initially give you some errors about modules that need to be install. We recommend using the ```pip``` command to install the necessary libraries like openCV, Librosa, PyAudioProcessing and Flask. 
3. Now, enter the following directory: ```VisionVanguards/web-app/karaoke/src``` and run the following commands:
4. ```npm install``` to install all dependencies
5. ```npm run dev``` to start the application. Navigate to ```localhost:5173``` on a browser of your choice. 
6. Upon launching the SIGHTSTEP app, you will be greeted with a landing page showcasing our exciting features. Click on the "Get Started" button to begin your karaoke journey.
<img width="1468" alt="Screenshot 2024-04-11 at 2 53 29 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/57d6d685-6710-496d-82bf-8e895101a976">

## b. Signing Up/Login

### Creating an Account
- If you are a new user, click on the "Sign Up" option on the sign-up/sign-in page.
- Enter your email address and create a password, or sign up using your Google account for quick access.

### Signing In
- If you already have an account, simply enter your credentials (email and password) and click "Sign In".
- You can also sign in using your Google account if you have previously linked it.

<img width="1470" alt="Screenshot 2024-04-11 at 2 53 55 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/304c5307-a631-4018-9541-d375ff33e414">


## c. Viewing the Leaderboard

- Once logged in, navigate to the leaderboard section to see the top 5 performers.
- The leaderboard displays details such as high scores, the number of games played, and tags associated with each performer's performance.
- You can also view your specific ranking and compare yourself to others in the same league.
<img width="1469" alt="Screenshot 2024-04-11 at 2 54 05 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/56588787-0e17-4743-8ca6-5af8d3933eeb">

<img width="1469" alt="Screenshot 2024-04-11 at 2 54 13 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/008d78ed-87b0-418f-931b-39746bc08169">

## d. Performing
<img width="264" alt="Screenshot 2024-04-11 at 2 54 33 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/5626db28-84f5-4d0a-b7b9-067d7f0f0493">

### Audio Performance
- Start an audio performance by selecting the plus icon in the top right corner. 
- Before starting, preview the audio to ensure functionality.
- Once started, you can view lyrics and sing along with the music.
- Click the QUIT button to leave the performance early. 
<img width="1470" alt="Screenshot 2024-04-11 at 2 54 43 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/56e06bf3-452b-464a-8f96-988d40aade6e">

<img width="1470" alt="Screenshot 2024-04-11 at 2 54 50 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/31e6d153-0c00-47a0-b5f5-a422e2427942">

<img width="1470" alt="Screenshot 2024-04-11 at 2 55 02 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/fd286ed0-576f-4f28-ac1b-d94cf0391deb">

### Audio-Video Performance
- Alternatively, start an audio-video performance to follow along with lyrics while posing.
- Feel free to express yourself and have fun!

<img width="1470" alt="Screenshot 2024-04-11 at 2 55 37 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/ab4b6c54-e6fa-42ce-95d9-95fcaf18d368">

<img width="1470" alt="Screenshot 2024-04-11 at 2 55 47 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/b14abccc-ac34-4397-bfe4-026029ecf06b">


## e. Viewing Scores

- After your performance ends, view your comprehensive score breakdown.
- Scores are provided in various categories including posing, lyrics, and pitch.
- You can also restart the performance or check for updates on the leaderboard.

Audio score page: 
<img width="1470" alt="Screenshot 2024-04-11 at 2 55 19 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/d3a0fc36-7bca-46f1-88f8-1b81a26daeea">

Audio and Video score page: 
<img width="1470" alt="Screenshot 2024-04-11 at 2 56 03 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/14acf540-7425-44c4-b47c-bbdba6cee054">


## f. Account Management

<img width="207" alt="Screenshot 2024-04-11 at 2 54 21 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/e91f2c79-fa34-4014-a2c2-8f67ccf4cd42">

### Signing Out
- To sign out, simply click on the settings icon on the top right corner and select the "Sign Out" option.

### Deleting Account
- If you wish to delete your account,  simply click on the settings icon on the top right corner and select the "Delete Account" option which opens the popup below. 

<img width="421" alt="Screenshot 2024-04-11 at 2 54 27 PM" src="https://github.com/mullise147/VisionVanguards/assets/68687725/c4c83fe9-2779-4207-9cfb-443e47190721">

You will then be redirected to the landing page of the website. 

## g. FAQ

### Q: Can I use the karaoke app without creating an account?
A: No, an account is required to access the full features of the karaoke app, including saving performances and tracking scores.

### Q: Can I change my username?
A: No, at this moment you cannot update your username but we are working on it and it will be available soon! 

### Q: How often is the leaderboard updated?
A: The leaderboard is updated in real-time to reflect the latest performances and scores.

### Q: Can I suggest new songs to be added to the catalog?
A: Yes, we welcome song suggestions! Please reach out to our support team with your requests.

### Q: Is there a mobile app available?
A: Currently, we only offer a web-based application. However, stay tuned for updates on our mobile app development.


## Spring Final Presentation
[Spring Final Presentation](Assignments/Vision%20Vanguards%20Final%20Presentation.pdf)

## Final Expo Poster
[Final Expo Poster](Assignments/Expo%20Poster.pdf)

## Self-Assessment Essays

[Team Contract](Assignments/Vision%20Vanguards%20Team%20Contract.md)

[Link to Stephanie's Fall Essay](Assignments/Stephanie%20Mullins%20Capstone.md)
[Link to Stephanie's Spring Essay](Assignments/Mullins_Self_Assessment_WO_Team.pdf)

[Link to Rob's Fall Essay](Assignments/Rob%20Kelly%20Capstone.md)
[Link to Rob's Spring Essay](Assignments/Kelly_Self_Assessment.pdf)

[Link to Athulya's Fall Essay](Assignments/Athulya%20Ganesh%20Capstone.md)
[Link to Athulya's Spring Essay](Assignments/Athulya_Self_Assessment.pdf)

## Summary of Hours and Justification

### Athulya 
[Hours and Justification](Assignments/Ganesh_Hours_Justification.pdf)

### Stephanie 
[Hours and Justification](Assignments/Mullins_Hours_Justification.docx)

### Rob 
[Hours and Justification](Assignments/Kelly_Hours_Justification.pdf)

## Summary of Expenses
All the equipment needed for Vision Vanguard's project was already owned by the members. The needed hardware was:
- Laptop
- Laptop charger
- Monitor
- HDMI cable
- Extension cord
- Headphones

## Appendix
[Figma prototypes](https://www.figma.com/file/T7vnLTLLM7szsg422XGj29/Web-App-UI?type=design&node-id=0%3A1&mode=design&t=55rzAfCOAH3WwTt2-1) 

[Posing Component](CV_Component)

[Audio Component](AudioProcessing)

[Web Component](web-app)

[Link to deployed website](vision-vanguards.vercel.app)

[Trello Board](https://trello.com/invite/b/hlPpXafJ/ATTIb1c3854191bbb49b912e7f0724b880bd1F612ADC/vision-vanguards-senior-design)
