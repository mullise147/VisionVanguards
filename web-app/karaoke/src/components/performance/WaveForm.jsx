import React, { useRef, useEffect } from 'react';
import useSize from './useSize';

const WaveForm = () => {
  const canvasRef = useRef();
  const audioContextRef = useRef();
  const analyserRef = useRef();
  const animationFrameRef = useRef();
  const windowHeight = window.innerHeight; // Get the window height
  const [width, height] = useSize(); // Custom hook to manage canvas size

  useEffect(() => {
    const setCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Adjust the canvas to match the DPI scaling
        const scale = window.devicePixelRatio;
        canvas.width = width * scale;
        canvas.height = windowHeight * scale; // Set canvas height to window height
        canvas.getContext('2d').scale(scale, scale);
      }
    };

    const activateMicrophoneAndVisualizeAudio = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 2048; // Use a smaller FFT size for bars visualization
        }
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        draw();
      }
    };

    const draw = () => {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext('2d');
      if (!canvas) return;

      setCanvasSize();

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray); // Get frequency data instead of time domain

      canvasCtx.clearRect(0, 0, width, windowHeight); // Clear the canvas for the next frame

      let x = 0;
      const barWidth = (width / bufferLength) * 2.5;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = 1.5 * ((dataArray[i] / 255) * (height / 2));
        
        let gradient = canvasCtx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, 'rgba(255, 0, 255, 1)'); // Neon Pink
        gradient.addColorStop(0.5, 'rgba(0, 255, 255, 1)'); // Neon Cyan
        gradient.addColorStop(1, 'rgba(0, 255, 0, 1)'); // Neon Green

        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, windowHeight - barHeight, barWidth, barHeight); // Adjust y position
        x += barWidth + 1;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', () => {
      setCanvasSize();
      draw();
    });
    activateMicrophoneAndVisualizeAudio();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [width, windowHeight]); // Ensure effect runs when size changes

  return <canvas ref={canvasRef} style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: '0.5'}} />;
};

export default WaveForm;
