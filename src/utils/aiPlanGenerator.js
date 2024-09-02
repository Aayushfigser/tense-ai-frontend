// src/utils/aiPlanGenerator.js

export const generateAIPlan = (goals) => {
    // Simulate AI plan generation based on goals
    const plans = {
      study: [
        { task: 'Read Chapter 1', time: '2h', progress: 0 },
        { task: 'Solve Exercises', time: '1h', progress: 0 },
      ],
      workout: [
        { task: 'Morning Run', time: '30m', progress: 0 },
        { task: 'Strength Training', time: '1h', progress: 0 },
      ],
    };
  
    return plans[goals] || [];
  };
  