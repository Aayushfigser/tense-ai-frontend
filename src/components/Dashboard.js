import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [pastData, setPastData] = useState('');
  const [presentData, setPresentData] = useState('');
  const [futureData, setFutureData] = useState('');
  const [idea, setIdea] = useState('');

  const analyzePast = async (text) => {
    try {
      const response = await axios.post('/api/gemini/analyze-past', { text });
      setPastData(response.data);
    } catch (error) {
      console.error("Error analyzing past:", error);
    }
  };

  const analyzePresent = async (text) => {
    try {
      const response = await axios.post('/api/gemini/analyze-present', { text });
      setPresentData(response.data);
    } catch (error) {
      console.error("Error analyzing present:", error);
    }
  };

  const analyzeFuture = async (text) => {
    try {
      const response = await axios.post('/api/gemini/analyze-future', { text });
      setFutureData(response.data);
    } catch (error) {
      console.error("Error analyzing future:", error);
    }
  };

  const generateIdea = async (prompt) => {
    try {
      const response = await axios.post('/api/chatgpt/idea', { prompt });
      setIdea(response.data);
    } catch (error) {
      console.error("Error generating idea:", error);
    }
  };

  // Example usage
  useEffect(() => {
    analyzePast("Example text for past analysis");
    analyzePresent("Example text for present analysis");
    analyzeFuture("Example text for future analysis");
    generateIdea("Give me a startup idea");
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Past Analysis</h2>
        <p>{pastData}</p>
      </div>
      <div>
        <h2>Present Analysis</h2>
        <p>{presentData}</p>
      </div>
      <div>
        <h2>Future Analysis</h2>
        <p>{futureData}</p>
      </div>
      <div>
        <h2>Startup Idea</h2>
        <p>{idea}</p>
      </div>
    </div>
  );
};

export default Dashboard;
