// MeshContext.js
import React, { createContext, useState } from "react";

export const MeshContext = createContext();

export const MeshProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
    console.log(selectedFiles);
  return (
    <MeshContext.Provider
      value={{ selectedFiles, setSelectedFiles, selectedIndex, setSelectedIndex }}
    >
      {children}
    </MeshContext.Provider>
  );
};
