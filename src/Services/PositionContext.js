import React, { createContext, useContext, useState } from 'react';

const PositionContext = createContext();

export const usePositionContext = () => {
  return useContext(PositionContext);
};

export const PositionProvider = ({ children }) => {
  const [positionData, setPositionData] = useState({
    x: 0,
    y: 0,
    z: 0,
    xRotation: 0,
    yRotation: 0,
    zRotation: 0,
  });
  
  const updatePositionData = (newData) => {
    setPositionData({ ...positionData, ...newData });
  };

  return (
    <PositionContext.Provider value={{ positionData, updatePositionData }}>
      {children}
    </PositionContext.Provider>
  );
};
