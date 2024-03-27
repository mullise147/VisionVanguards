import React, { useState, useEffect } from 'react';

const AudioVideo = () => {
    const [lyrics, setLyrics] = useState([]);
    const [lyricsTimings, setLyricsTimings] = useState([]);
    const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
    const [countdown, setCountdown] = useState(3);
    const [performanceComplete, setPerformanceComplete] = useState(false);
    const [score, setScore] = useState(null);

    useEffect(() => {
        if (countdown === 0) {
            startPerformance();
        } else if (countdown > 0) {
            setTimeout(() => setCountdown(countdown - 1), 1000);
        }
    }, [countdown]);

    useEffect(() => {
        fetchLyrics();
        fetchLyricsTimings();
    }, []);

    useEffect(() => {
        if (performanceComplete) {
            fetchScores();
        }
    }, [performanceComplete]);

    const fetchLyrics = async () => {
        const response = await fetch('http://localhost:8080/lyrics');
        const data = await response.text();
        setLyrics(data.split('\n'));
    };

    const fetchLyricsTimings = async () => {
        const response = await fetch('http://localhost:8080/lyrics-timings');
        const data = await response.text();
        setLyricsTimings(data.split('\n').map(time => parseInt(time, 10)));
    };

    const startPerformance = async () => {
        await fetch('http://localhost:8080/start-performance', { method: 'POST' });
        lyricsTimings.forEach((time, index) => {
            setTimeout(() => {
                setCurrentLyricIndex(index);
            }, time * 1000);
        });
    };

    const fetchScores = async () => {
        const response = await fetch('http://localhost:8080/get-scores');
        const scores = await response.json();
        setScore(scores.weighted_score);
        setPerformanceComplete(false);
    };

    const getNextLyric = () => {
        return lyrics[currentLyricIndex + 1];
    };

    return (
        <div>
            {countdown > 0 && <h2>{countdown}</h2>}
            {countdown === 0 && <h2>START</h2>}
            {countdown === null && (
                <>
                    <h2>Current Lyric: {lyrics[currentLyricIndex]}</h2>
                    <h3>Next Lyric: {getNextLyric()}</h3>
                    {performanceComplete ? (
                        <div>Performance Complete, Calculating Score...</div>
                    ) : (
                        <button onClick={() => setPerformanceComplete(true)}>End Performance</button>
                    )}
                    {score && <div>Your Score: {score}</div>}
                </>
            )}
        </div>
    );
};

export default AudioVideo;