import React, { createContext, useContext, useState } from 'react';

export const AllMeshDataContext = createContext();

export const useAllMeshDataContext = () => useContext(AllMeshDataContext);

export const AllMeshDataProvider = ({ children }) => {
  const [allMeshData, setAllMeshData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  console.log(selectedFiles);
  return (
    <AllMeshDataContext.Provider value={{ allMeshData, setAllMeshData, selectedFiles, setSelectedFiles }}>
      {children}
    </AllMeshDataContext.Provider>
  );
};
