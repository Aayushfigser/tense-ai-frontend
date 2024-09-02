// src/contexts/RoutineContext.js
import React, { createContext, useState, useContext } from 'react';

const RoutineContext = createContext();

export const useRoutine = () => {
  return useContext(RoutineContext);
};

export const RoutineProvider = ({ children }) => {
  const [routine, setRoutine] = useState([]);

  return (
    <RoutineContext.Provider value={{ routine, setRoutine }}>
      {children}
    </RoutineContext.Provider>
  );
};
