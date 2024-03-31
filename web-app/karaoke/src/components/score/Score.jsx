// import React, { useState, useEffect } from "react";
// import Navbar from "../Sidebar";
// import CalculatingScore from "./CalculatingScoreAnimation";
// import singleLadiesImage from "../../assets/images/single_ladies.jpg"; 
// import {useNavigate } from "react-router-dom";

// const Score = () => {
//     // State to manage the visibility of CalculatingScore
//     const [showCalculating, setShowCalculating] = useState(true);
//     const [score, setScore] = useState(null); 
//     const navigate = useNavigate(); 
//     const [initialScoreDisplayed, setInitialScoreDisplayed] = useState(false);



//     const fetchScores = async () => {
//         try {
//             const response = await fetch('http://localhost:8080/get-scores');
//             const scores = await response.json();
//             setScore(scores.weighted_score); // Assume the response has a 'weighted_score' field
//             if (!initialScoreDisplayed) {
//                 setInitialScoreDisplayed(true); // Mark the initial score as displayed
//             }
//         } catch (error) {
//             console.error('Error fetching score:', error);
//             // Handle error, maybe set score to a default or show an error message
//         }
//     };



//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setShowCalculating(false);
//             fetchScores();
//         }, 10000);

//         return () => clearTimeout(timer);
//     }, []);

//     // Inline styles
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

//     const handleRestartClick = () => {
//         navigate(-1);
//     }

//     const handleLeaderClick = () => {
//         navigate("/leaderboard")
//     }

//     return(
//         <>
//              <>
//             <Navbar />
//             <div style={styles.scoreContainer}>
//                 <div style={styles.imageContainer}>
//                     <img src={singleLadiesImage} alt="Your Alt Text" style={styles.imgStyle} />
//                 </div>
//                 <div style={styles.scoreDisplay}>
//                     {showCalculating ? <CalculatingScore /> : (
//                         <>
//                             <div className="score-text" style={{ textAlign: 'center' }}>
//                                 <span style={styles.smallText}>Your</span>
//                                 <span style={styles.largeText}>
//                                     <b>{Math.ceil(score)}</b>
//                                 </span>
//                                 <span style={styles.smallText}>Score</span>
//                             </div>
//                             <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
//                                 <button className="blue-button" style={{ marginRight: '10px' }} onClick = {handleRestartClick}>RESTART →</button>
//                                  <button className="blue-button" onClick = {handleLeaderClick}>LEADERBOARD →</button>
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </>
//         </>
//     );
// }; 

// export default Score;
import React, { useState, useEffect } from "react";
import Navbar from "../Sidebar";
import CalculatingScore from "./CalculatingScoreAnimation";
import singleLadiesImage from "../../assets/images/single_ladies.jpg"; 
import { useNavigate } from "react-router-dom";

const Score = () => {
    const [showCalculating, setShowCalculating] = useState(true);
    const [score, setScore] = useState(null);
    const [scoreFetched, setScoreFetched] = useState(false); // Flag to track if score has been fetched
    const navigate = useNavigate(); 

    const fetchScores = async () => {
        // Check if score has already been fetched to avoid refetching
        if (!scoreFetched) {
            try {
                const response = await fetch('http://localhost:8080/get-scores');
                const scores = await response.json();
                setScore(scores.weighted_score); // Assume the response has a 'weighted_score' field
                setScoreFetched(true); // Mark score as fetched
            } catch (error) {
                console.error('Error fetching score:', error);
                // Handle error, maybe set score to a default or show an error message
            }
        }
    };

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
                                <span style={styles.smallText}>Your</span>
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
        </>
    );
}; 

export default Score;
