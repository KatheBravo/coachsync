// src/components/CoachInfo.jsx
import { createContext, useContext, useState } from 'react';

const CoachContext = createContext();

export const CoachProvider = ({ children }) => {
  const [coachId, setCoachId] = useState('');
  const [clients, setClients] = useState([]);

  return (
    <CoachContext.Provider value={{ coachId, setCoachId, clients, setClients }}>
      {children}
    </CoachContext.Provider>
  );
};

export const useCoach = () => {
  const context = useContext(CoachContext);
  console.log('useCoach context:', context);
  if (!context) {
    throw new Error('useCoach debe usarse dentro de CoachProvider');
  }
  return context;
};
