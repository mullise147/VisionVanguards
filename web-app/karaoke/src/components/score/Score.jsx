import React, { useState, useEffect } from "react";
import Navbar from "../Sidebar";
import CalculatingScore from "./CalculatingScoreAnimation";
import singleLadiesImage from "../../assets/images/single_ladies.jpg"; 
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { auth } from '../../firebase'; // Import Firebase auth
import ScoreMeter from "./ScoreMeter";
import Confetti from 'react-confetti'; 
import useSize from "../performance/useSize";

const styles = {
        scoreContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
        },
        imageContainer: {
            marginRight: '100px', // Adds some space between the image and the score
        },
        imgStyle: {
            width: '500px', // Adjust the size of your image
            height: 'auto',
            borderRadius: '5px'
        },
        scoreDisplay: {
            textAlign: 'center',
        },
        smallText: {
            display: 'block',
            fontSize: '25px', // Small font size
            fontFamily: "Rubik Mono One, monospace"
        },
        largeText: {
            display: 'block',
            fontSize: '120px', // Large font size
            margin: '20px 0',
            fontFamily: "Rubik Mono One, monospace"
        }
    };


const Score = () => {
    const [showCalculating, setShowCalculating] = useState(true);
    const [score, setScore] = useState();
    const [scoreFetched, setScoreFetched] = useState(false);
    const navigate = useNavigate(); 
    const db = getFirestore(); // Initialize Firestore
    const [cv_score, setCVscore] = useState(null); 
    const [lyrics_score, setLyricsScore] = useState(null); 
    const[pitch_score, setPitchScore] = useState(null); 
    const location = useLocation(); 
    const navigatedFromAudioVideo = location.state?.from === "/audio-video";

    const timeOnPage = location.state?.timeOnPage || 73; // With option

    const praiseMessages = [
        "excellent", "awesome", "fantastic", "terrific", "superb", 
        "outstanding", "impressive", "bravo", "amazing", "great", 
        "super", "fabulous", "splendid", "magnificent", "stellar", 
        "phenomenal", "incredible", "sensational", "dazzling", "exceptional", 
        "marvelous", "remarkable", "perfect", "tremendous", "unbelievable", 
        "fantabulous", "awesome", "exceptional", "stellar", "outstanding", 
        "superb", "amazing", "impressive", "fabulous", "great", 
        "bravo", "wonderful", "phenomenal", "excellent", "terrific", "newbie", "intermediate", "pro", "expert"
      ];
      const { width, height } = useSize();


const colors = 
[
    "#FFD600",
    "#C6FF00",
    "#795548",
    "#03A9F4",
    "#AA00FF",
    "#9C27B0",
    "#009688",
    "#9E9E9E",
    "#7BDCB5",
    "#6200EA",
    "#00B0FF",
    "#FF6D00",
    "#00A6ED",
    "#673AB7",
    "#76FF03",
    "#00BCD4",
    "#3F51B5",
    "#FF5722",
    "#FF5733",
    "#FF5252",
    "#FF1744",
    "#D500F9",
    "#4CAF50",
    "#F50057",
    "#ff6ac1",
    "#00E5FF",
    "#FFB400",
    "#F78DA7",
    "#64DD17",
    "#FF9800",
    "#FFEB3B",
    "#9900EF",
    "#2196F3",
    "#FFC107",
    "#8BC34A",
    "#607D8B",
    "#1DE9B6",
    "#E91E63",
    "#304FFE",
    "#F6511D", 
    "volcano", 
    "lime", 
    "gold", 
    "cyan" 
]


        const randomPraises = []; 
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * praiseMessages.length);
        randomPraises.push(praiseMessages[randomIndex]);
      }
      const uniqueRandomPraises = [...new Set(randomPraises)];


    const updateFirestoreTags = async (newTags) => {
        try {
            const userDocRef = doc(db, 'users', auth.currentUser.uid); // Get the document reference
            const userDocSnap = await getDoc(userDocRef); // Fetch the document
    
            if (userDocSnap.exists()) {
                const currentData = userDocSnap.data(); // Get current data from the document
                const newNumGames = currentData.numGames ? currentData.numGames + 1 : 1; // Increment numGames or initialize it
    
                await updateDoc(userDocRef, {
                    tags: newTags, // Update the 'tags' field with new values
                    numGames: newNumGames // Update the 'numGames' field
                });
            } else {
                console.log('Document does not exist!'); // Handle the case where the document doesn't exist
            }
        } catch (error) {
            console.error('Error updating tags in Firestore:', error);
        }
    };
    

    const fetchScores = async (timeOnPage) => {
        if (!scoreFetched) {
          try {
            const response = await fetch('http://localhost:8080/get-scores');
            const newScore = await response.json();
      
            // Ensure we have a newScore object before proceeding
            if (newScore) {
              const weightedScore = Number.isNaN(newScore.weighted_score) ? 0 : Math.ceil(newScore.weighted_score);
              const cvScore = Number.isNaN(newScore.cv_score) ? 0 : Math.ceil(newScore.cv_score);
              const lyricsScore = Number.isNaN(newScore.lyrics_score) ? 0 : Math.ceil(newScore.lyrics_score);
              const pitchScore = Number.isNaN(newScore.pitch_score) ? 0 : Math.ceil(newScore.pitch_score);
      
              // Update component state with these values
              setScore(weightedScore);
              setCVscore(cvScore);
              setLyricsScore(lyricsScore);
              setPitchScore(pitchScore);
      
              const existingScore = await getFirestoreScore(); // Fetch existing score from Firestore
              
              const multiplier = Math.ceil((timeOnPage - 10)/63); 
              const totalWeighter = multiplier * weightedScore; 
              if (totalWeighter> existingScore) {
                await updateFirestoreScore(totalWeighter);
              }
              
              await updateFirestoreTags(uniqueRandomPraises);
      
              setScoreFetched(true);
            }
          } catch (error) {
            console.error('Error fetching score:', error);
          }
        }
      };
      

    const getFirestoreScore = async () => {
        try {
            const userDocRef = doc(db, 'users', auth.currentUser.uid); 
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                return userDocSnap.data().score;
            } else {
                console.error('User document not found in Firestore.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching score from Firestore:', error);
            return null;
        }
    };

    const updateFirestoreScore = async (newScore) => {
        try {
            const userDocRef = doc(db, 'users', auth.currentUser.uid); 
            await updateDoc(userDocRef, { score: newScore });
        } catch (error) {
            console.error('Error updating score in Firestore:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCalculating(false);
            if (!scoreFetched) {fetchScores(timeOnPage);}
        }, 0); // Delay changed to 10 seconds for demonstration

        return () => clearTimeout(timer);
    }, [scoreFetched]); // Add scoreFetched to dependency array if its changes should trigger the effect
  

    // Styles unchanged

    const handleRestartClick = () => navigate(-1);
    const handleLeaderClick = () => navigate("/leaderboard");

    
const PraiseButtons = ({ praises }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
    }}>

{
  praises.map((praise, index) => {
    const colorIndex = Math.floor(Math.random() * colors.length); // Select a random index for the color
    const color = colors[colorIndex]; // Get the color at the randomly selected index
    
    return (
      <div key={index} style={{
          padding: '10px 20px',
          borderRadius: '5px', // Small radius for a rectangular look
          background: color, // Use random color from colors array
          color: 'white',
          fontSize: '20px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          textTransform: 'uppercase' // for white text in uppercase
      }}>
          {praise}
      </div>
    );
  })
}
    </div>
);

    return (
        <>
        <Confetti width={width} height={height}></Confetti>
    <div className = "background">
         <Navbar />
            <div style={styles.scoreContainer}>
                <div style={styles.imageContainer}>
                    <img src={singleLadiesImage} alt="Performance" style={styles.imgStyle} />
                </div>
                <div style={styles.scoreDisplay}>
                    {showCalculating ? <CalculatingScore /> : (
                        <>
                            <div className="score-text" style={{ textAlign: 'center' }}>
                                <span style={styles.smallText}>Your</span>
                                <span style={styles.largeText}>
                                <b>{isNaN(score) || score === undefined ? <CalculatingScore/> : Math.ceil(Math.ceil(score) * Math.ceil((timeOnPage-10)/63))}</b>
                                </span>
                                <span style={styles.smallText}>Score</span>
                            </div>

                            <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                <button className="blue-button" style={{ marginRight: '10px' }} onClick={handleRestartClick}>RESTART →</button>
                                <button className="blue-button" onClick={handleLeaderClick}>LEADERBOARD →</button>
                            </div>
                            <PraiseButtons praises={uniqueRandomPraises} />

                            
                        </>
                    )}
                </div>
            </div>

            <div>
            {showCalculating || isNaN(score) || score === undefined ? (
                <div className = "background"></div>
            ) : (
                <div className="score-container">
                    {/* {navigatedFromAudioVideo && ( */}
                        <div className="score-meter">
                            <ScoreMeter widthPerc={cv_score} title="Video Score" gradient={true} />
                        </div>
                    {/* )} */}
                    <div className="score-meter">
                        <ScoreMeter widthPerc={pitch_score} title="Pitch Score" gradient={true} />
                    </div>
                    <div className="score-meter">
                        <ScoreMeter widthPerc={lyrics_score} title="Lyrics Score" gradient={true} />
                    </div>
                    {/* <div className="score-meter">
                        <ScoreMeter widthPerc={score} title="Total Score" gradient={true} />
                    </div> */}
                </div>
            )}
        </div>
        <div className = "background"></div>


        </div>
        </>
    );

}; 

export default Score;
