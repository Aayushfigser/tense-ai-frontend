// src/components/IdeasTab.js
import React, { useState, useEffect, useRef } from 'react';
import './IdeasTab.css'; // Importing the CSS for Ideas Tab
import { FaVolumeUp, FaEye, FaMicrophone, FaStop, FaQuestionCircle, FaChartLine, FaClock, FaEnvelope } from 'react-icons/fa';

const IdeasTab = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [userResponse, setUserResponse] = useState("");
    const [analysisResponse, setAnalysisResponse] = useState("Analysis results will appear here.");
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    const handleMicClick = () => {
        setIsListening(!isListening);
        if (!isListening) {
            setUserResponse("Listening... (Simulated response)");
            setTimeout(() => {
                setUserResponse("Here is the response from the assistant.");
            }, 2000);
        } else {
            setUserResponse("Stopped Listening.");
        }
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                processCameraFeed(stream);
            }
        } catch (error) {
            console.error("Error accessing camera: ", error);
        }
    };

    const processCameraFeed = (stream) => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        video.play();
        const detect = () => {
            if (video.paused || video.ended) return;

            // Draw the current frame to the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Analyze the image for some response (Simulated Analysis)
            analyzeFrame(context.getImageData(0, 0, canvas.width, canvas.height));

            requestAnimationFrame(detect);
        };

        detect();
    };

    const analyzeFrame = (imageData) => {
        // Simulate an analysis by generating a random response
        const responses = [
            "You are looking great today!",
            "Smile more!",
            "Looks like you're ready to take on the world!",
            "How about taking a break?",
            "Keep up the positive vibes!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setAnalysisResponse(randomResponse);
    };

    useEffect(() => {
        if (activeSection === 'vision') {
            startCamera();
        }
        // Cleanup function to stop the camera when the component unmounts or section changes
        return () => {
            if (videoRef.current) {
                const stream = videoRef.current.srcObject;
                if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                }
                videoRef.current.srcObject = null;
            }
        };
    }, [activeSection]);

    return (
        <div className="ideas-tab">
            <h2>We are family Dude! </h2>
            <div className="idea-section">
                <div className="card" onClick={() => handleSectionClick('voice')}>
                    <FaVolumeUp className="icon" />
                    <h3>Eternal Voice</h3>
                </div>
                <div className="card" onClick={() => handleSectionClick('vision')}>
                    <FaEye className="icon" />
                    <h3>Eternal Vision</h3>
                </div>
            </div>

            {activeSection === 'voice' && (
                <div id="eternalVoiceSection" className="sub-section">
                    <h3>Eternal Voice</h3>
                    <div className="mic-container">
                        <div className={`microphone ${isListening ? 'listening' : ''}`} onClick={handleMicClick}>
                            {isListening ? <FaStop className="mic-icon" /> : <FaMicrophone className="mic-icon" />}
                        </div>
                    </div>
                    <div className="user-response">
                        <p>{userResponse}</p>
                    </div>
                    <button onClick={() => console.log('Ask Doubts clicked')}>
                        <FaQuestionCircle className="button-icon" /> Ask Doubts
                    </button>
                    <button onClick={() => console.log('Track Reports clicked')}>
                        <FaChartLine className="button-icon" /> Track Reports
                    </button>
                    <button onClick={() => console.log('Set Alarm clicked')}>
                        <FaClock className="button-icon" /> Set Alarm
                    </button>
                    <button onClick={() => console.log('Send Email clicked')}>
                        <FaEnvelope className="button-icon" /> Send Email
                    </button>
                </div>
            )}

            {activeSection === 'vision' && (
                <div id="eternalVisionSection" className="sub-section">
                    <h3>Eternal Vision</h3>
                    <video ref={videoRef} className="video-feed" autoPlay muted />
                    <canvas ref={canvasRef} className="canvas" width="640" height="480" style={{ display: 'none' }} />
                    <div className="vision-options">
                        <button onClick={() => console.log('Analyze Future clicked')}>
                            <FaEye className="button-icon" /> Analyze Future
                        </button>
                        <button onClick={() => console.log('Set Goal clicked')}>
                            <FaChartLine className="button-icon" /> Set Goal
                        </button>
                        <button onClick={() => console.log('Track Progress clicked')}>
                            <FaChartLine className="button-icon" /> Track Progress
                        </button>
                    </div>
                    <div className="analysis-response">
                        <p>{analysisResponse}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdeasTab;
