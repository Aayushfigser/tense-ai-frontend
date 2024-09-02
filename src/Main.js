import React, { useState } from 'react';
import PastTab from './PastTab';
import PresentTab from './PresentTab';
import FutureTab from './FutureTab';

const Main = () => {
    const [activeTab, setActiveTab] = useState('past');

    return (
        <div>
            <nav>
                <button onClick={() => setActiveTab('past')}>Past</button>
                <button onClick={() => setActiveTab('present')}>Present</button>
                <button onClick={() => setActiveTab('future')}>Future</button>
            </nav>
            <div>
                {activeTab === 'past' && <PastTab />}
                {activeTab === 'present' && <PresentTab />}
                {activeTab === 'future' && <FutureTab />}
            </div>
        </div>
    );
};

export default Main;
