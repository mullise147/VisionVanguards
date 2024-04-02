import React from 'react';
import './score.css'; // Make sure this path is correct for your CSS

// ScoreMeter component
const ScoreMeter = ({ widthPerc, title, gradient = false }) => {
  const radius = 65;
  const dashArray = Math.PI * radius * (widthPerc / 100);

  return (
    <div className="score-wrap">
      <div className="score">
        <div className="score-bar">
          <div className="placeholder">
            <svg width="200" height="120">
              {/* Placeholder circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                strokeWidth="25"
                strokeLinecap="round"
                strokeDashoffset={-Math.PI * radius}
                strokeDasharray={`${Math.PI * radius * 2} 10000`}
                stroke='#e5e5e5'
              />
            </svg>
          </div>
          <div className="score-circle">
            <svg width="200" height="120">
              {/* Colored circle representing the score */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                strokeWidth="25"
                strokeLinecap="round"
                strokeDashoffset={-Math.PI * radius}
                strokeDasharray={`${dashArray} 10000`}
                stroke={gradient ? 'url(#score-gradient)' : '#e5e5e5'}
              />
              {gradient && (
                <defs>
                  <linearGradient id="score-gradient">
                    <stop offset="0%" stopColor="red" />
                    <stop offset="25%" stopColor="orange" />
                    <stop offset="50%" stopColor="yellow" />
                    <stop offset="100%" stopColor="green" />
                  </linearGradient>
                </defs>
              )}
            </svg>
          </div>
        </div>
        <div className="score-value">
          <div className="score-name">{title}</div>
          <div className="score-number">{Math.round(widthPerc)}%</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;
