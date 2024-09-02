// src/components/ChatGPT.js
import React, { useEffect, useState } from 'react';
import { getChatGPTData } from '../api/chatgptService';

const ChatGPT = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getChatGPTData().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>ChatGPT Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ChatGPT;
