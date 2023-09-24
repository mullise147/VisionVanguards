### Computer Vision Tasks (Stephanie):
- Research technologies (gesture recognition, skeleton detection, skeleton tracking w/ comparison to given position) and how others have done problems like our project with a focus on gesture recognition and tracking.
- Implement gesture recognition for basic hand signals (picture then live video).
- Expand gesture recognition to include gesture tracking of hand signals (recorded then live video).
- Research technologies for skeleton recognition and tracking and see how others have implemented the problem.
- Implement skeleton detection  to see if a human can get recognized as a skeletal figure (picture then live video).
- Expand skeleton detection to include skeletal tracking to convert the whole human body to a skeletal figure (recorded then live video).
- Implement skeletal tracking correctness compared to given positions to calculate graded score.

### Audio Processing Tasks (Rob):
- Research various audio processing libraries (as well as experiment with them) in order to find the best library for the needs of the project
Some libraries to consider include Speech Recognition, Librosa, IPython, TorchAudio, PyAudio
- After selecting the best library for the project, implement it within the team project
  - In particular, implement audio processing tool so that it can be manipulated in various ways that will be necessary for the project
- Research methods of implementing audio to text transcription
- Research various methods to implement pitch detection within the project (used to determine the accuracy of the pitch of the user compared to the audio file of the song)
- Implement both of the above features to be able to determine a user’s lyrical and pitch accuracy
- Using the above features, implement algorithm to compute composite accuracy of a user’s singing on a given song

### Web Interface Tasks (Athulya): 
- Research and select appropriate frontend and backend technologies for the web app, as well as database options (consider both local and cloud services for scalability) and suitable APIs for feature integration
- Develop page-by-page wireframes and prototypes using Figma, including the landing page, performance options, lyrics display, gesture list, scoring interface, and leaderboard
- Set up the development environment, including configuring the chosen frontend and backend frameworks
- Prepare the server and database environment, ensuring proper access and security settings
- Develop the initial skeleton of the web app with basic navigation and structure, including landing page for user selections and different interfaces for audio-only and audio-video performances
- Implement performance recording and playback functionality
- Develop the module to display lyrics on the screen in sync with the chosen song, ensuring that the GUI is user-friendly
- Create a module that lists gestures for users to follow along during performances
- Implement features to highlight or track user gestures in real-time
- Develop a scoring system to evaluate user performances, as well as a leaderboard for users to view their performance in relation to others
- Develop user registration and login pages to save user information securely
- Set up the backend database, either locally or using a cloud service, to store user profiles, scores, and song information
- Perform comprehensive testing at each development stage, including unit testing, integration testing, and user testing
- Deploy the web application within the specified timeline using a hosting service like Vercel or Netlify

### Combined Tasks: 
- Hook package containing all of the audio processing logic into the project web application
- Combine computer vision aspects with audio and website portions
- Implement an algorithm to calculate composite scores of audio and visual aspects of performance
