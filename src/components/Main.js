import React, { useState } from 'react';
import PastTab from './Past';
import PresentTab from './Present';
import FutureTab from './Future';
import TrackYourLife from './TrackYourLife';

const Main = () => {
    const [activeTab, setActiveTab] = useState('past');
    const userId = 'exampleUserId'; // Replace with actual user ID logic

    return (
        <div>
            <nav>
                <button onClick={() => setActiveTab('past')}>Past</button>
                <button onClick={() => setActiveTab('present')}>Present</button>
                <button onClick={() => setActiveTab('future')}>Future</button>
                <button onClick={() => setActiveTab('track')}>Track Your Life</button>
            </nav>
            <div>
                {activeTab === 'past' && <PastTab />}
                {activeTab === 'present' && <PresentTab />}
                {activeTab === 'future' && <FutureTab />}
                {activeTab === 'track' && <TrackYourLife userId={userId} />}
            </div>
        </div>
    );
};

export default Main;
