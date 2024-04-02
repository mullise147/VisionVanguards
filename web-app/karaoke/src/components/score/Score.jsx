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
            fontSize: '30px', // Small font size
        },
        largeText: {
            display: 'block',
            fontSize: '100px', // Large font size
            margin: '20px 0',
        }
    };

    import React, { useState, useEffect } from "react";
    import Navbar from "../Sidebar";
    import CalculatingScore from "./CalculatingScoreAnimation";
    import singleLadiesImage from "../../assets/images/single_ladies.jpg"; 
    import { useNavigate, useLocation } from "react-router-dom";
    import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions
    import { auth } from '../../firebase'; // Import Firebase auth
    import ScoreMeter from "./ScoreMeter";

const Score = () => {
    const [showCalculating, setShowCalculating] = useState(true);
    const [score, setScore] = useState(null);
    const [scoreFetched, setScoreFetched] = useState(false);
    const navigate = useNavigate(); 
    const db = getFirestore(); // Initialize Firestore
    const [cv_score, setCVscore] = useState(null); 
    const [lyrics_score, setLyricsScore] = useState(null); 
    const[pitch_score, setPitchScore] = useState(null); 
    const location = useLocation(); 
    const navigatedFromAudioVideo = location.state?.from === "/audio-video";


    const fetchScores = async () => {
        if (!scoreFetched) {
            try {
                const response = await fetch('http://localhost:8080/get-scores');
                const newScore = await response.json();
                
                setScore(Number.isNaN(newScore.weighted_score) ? 0 : Math.ceil(+newScore.weighted_score));
                setCVscore(Number.isNaN(newScore.cv_score) ? 0 : Math.ceil(+newScore.cv_score));
                setLyricsScore(Number.isNaN(newScore.lyrics_score) ? 0 : Math.ceil(+newScore.lyrics_score));
                setPitchScore(Number.isNaN(newScore.pitch_score) ? 0 : Math.ceil(+newScore.pitch_score));

                const existingScore = await getFirestoreScore(); // Fetch existing score from Firestore
                if (newScore.weighted_score > existingScore) { // Compare with existing score
                    await updateFirestoreScore(Math.ceil(newScore.weighted_score)); // Update score in Firestore
                }
                setScoreFetched(true);
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
            const userDocRef = doc(db, 'users', auth.currentUser.uid); // Replace 'USER_ID_HERE' with the actual user ID
            await updateDoc(userDocRef, { score: newScore });
        } catch (error) {
            console.error('Error updating score in Firestore:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCalculating(false);
            if (!scoreFetched) { fetchScores(); }
        }, 10000);

        return () => clearTimeout(timer);
    }, []);



    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCalculating(false);
            if (!scoreFetched) {fetchScores();}
        }, 10000); // Delay changed to 10 seconds for demonstration

        return () => clearTimeout(timer);
    }, []);

    // Styles unchanged

    const handleRestartClick = () => navigate(-1);
    const handleLeaderClick = () => navigate("/leaderboard");

    return (
        <>
            <Navbar />
            <div style={styles.scoreContainer}>
                <div style={styles.imageContainer}>
                    <img src={singleLadiesImage} alt="Performance" style={styles.imgStyle} />
                </div>
                <div style={styles.scoreDisplay}>
                    {showCalculating ? <CalculatingScore /> : (
                        <>
                            <div className="score-text" style={{ textAlign: 'center' }}>
                                <span style={styles.smallText}>Total</span>
                                <span style={styles.largeText}>
                                    <b>{Math.ceil(score)}</b>
                                </span>
                                <span style={styles.smallText}>Score</span>
                            </div>

                            <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                <button className="blue-button" style={{ marginRight: '10px' }} onClick={handleRestartClick}>RESTART →</button>
                                <button className="blue-button" onClick={handleLeaderClick}>LEADERBOARD →</button>
                            </div>
                            
                        </>
                    )}
                </div>
            </div>
            {showCalculating ? <CalculatingScore /> : (
            <div className="score-container">
                        {
                navigatedFromAudioVideo && (
                    <div className="score-meter">
                        <ScoreMeter widthPerc={cv_score} title="CV Score" gradient={true} />
                    </div>
                )
            }
            <div className="score-meter">
                <ScoreMeter widthPerc={pitch_score} title="Pitch Score" gradient={true} />
            </div>
            <div className="score-meter">
                <ScoreMeter widthPerc={lyrics_score} title="Lyrics Score" gradient={true} />
            </div>
            <div className="score-meter">
                <ScoreMeter widthPerc={score} title="Total Score" gradient={true} />
            </div>
        </div>)}

        </>
    );
}; 

export default Score;
