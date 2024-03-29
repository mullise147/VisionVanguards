import React, { useRef, useEffect } from 'react';

const AudioWave = () => {
  const canvasRef = useRef();
  const audioContextRef = useRef();
  const analyserRef = useRef();
  const animationFrameRef = useRef();

  useEffect(() => {
    const setCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Adjust the canvas to match the DPI scaling for clarity
        const scale = window.devicePixelRatio; 
        const width = canvas.offsetWidth * scale;
        const height = canvas.offsetHeight * scale;
        canvas.width = width;
        canvas.height = height;
        // Apply the scale to the drawing context to maintain visual clarity
        canvas.getContext('2d').scale(scale, scale);
      }
    };

    const activateMicrophoneAndVisualizeAudio = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 2048;
        }
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        draw();
      }
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      // Ensure the canvas size is correct for clear rendering
      setCanvasSize();

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height); // Clear the canvas for the next frame

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteTimeDomainData(dataArray);

      let gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(255, 77, 77, 1)');
      gradient.addColorStop(0.5, 'rgba(35, 215, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 77, 1)');

      ctx.lineWidth = 8; // Line width for a thicker wave
      ctx.strokeStyle = gradient;

      ctx.beginPath();

      const sliceWidth = width * 1.0 / bufferLength;
      let x = 0;
      // Centering the wave vertically
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (height / 2) * 0.5 + (height / 4); // Adjust y to center and limit vertical size

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2); // Ensure the line goes to the edge
      ctx.stroke();

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', setCanvasSize);
    activateMicrophoneAndVisualizeAudio();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
};

export default AudioWave;
