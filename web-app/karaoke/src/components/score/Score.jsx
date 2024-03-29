import React, { useState, useEffect } from "react";
import Navbar from "../Sidebar";
import CalculatingScore from "./CalculatingScoreAnimation";
import singleLadiesImage from "../../assets/images/single_ladies.jpg"; 
import {useNavigate } from "react-router-dom";

const Score = () => {
    // State to manage the visibility of CalculatingScore
    const [showCalculating, setShowCalculating] = useState(true);
    const [score, setScore] = useState(850); 
    const navigate = useNavigate(); 


    useEffect(() => {
        // Set a timeout to hide CalculatingScore after 5 seconds
        const timer = setTimeout(() => {
            setShowCalculating(false);
        }, 5000); // 5000 milliseconds = 5 seconds

        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []); // The empty dependency array ensures this effect runs only once after the initial render

    // Inline styles
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

    const handleRestartClick = () => {
        navigate(-1);
    }

    const handleLeaderClick = () => {
        navigate("/leaderboard")
    }

    return(
        <>
             <>
            <Navbar />
            <div style={styles.scoreContainer}>
                <div style={styles.imageContainer}>
                    <img src={singleLadiesImage} alt="Your Alt Text" style={styles.imgStyle} />
                </div>
                <div style={styles.scoreDisplay}>
                    {showCalculating ? <CalculatingScore /> : (
                        <>
                            <div className="score-text" style={{ textAlign: 'center' }}>
                                <span style={styles.smallText}>Your</span>
                                <span style={styles.largeText}><b>{score}</b></span>
                                <span style={styles.smallText}>Score</span>
                            </div>
                            <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                <button className="blue-button" style={{ marginRight: '10px' }} onClick = {handleRestartClick}>RESTART →</button>
                                 <button className="blue-button" onClick = {handleLeaderClick}>LEADERBOARD →</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
        </>
    );
}; 

export default Score;
