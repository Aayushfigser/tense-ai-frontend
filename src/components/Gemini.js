// src/components/Gemini.js
import React, { useEffect, useState } from 'react';
import { getGeminiData } from '../api/geminiService';

const Gemini = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getGeminiData().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Gemini Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Gemini;
