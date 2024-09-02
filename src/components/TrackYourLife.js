import React, { useState } from 'react';
import axios from 'axios';

const TrackYourLife = ({ userId }) => {
    const [progress, setProgress] = useState([]);

    const handleTrackLife = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/track-your-life', { userId });
            setProgress(res.data.data.progress);
        } catch (error) {
            console.error('Error tracking life progress:', error);
        }
    };

    return (
        <div>
            <h2>Track Your Life</h2>
            <button onClick={handleTrackLife}>Track Progress</button>
            {progress.length > 0 && (
                <div>
                    <h3>Your Progress:</h3>
                    <ul>
                        {progress.map((entry, index) => (
                            <li key={index}>{`${entry.date}: ${entry.task} - ${entry.status}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TrackYourLife;
