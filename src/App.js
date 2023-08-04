import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// MY Apps

import SideBar from "./components/GuiControl.jsx";
import { MeshProvider } from "./Services/MeshContext.js";
import ModelsDisplay from "./components/ModelsDisplay.jsx";


export default function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [rangeValue, setRangeValue] = useState(0);

  const handleRangeChange = (value) => {
    setRangeValue(value);
  };
  // Received the select CAD data
  const updateSelectedFiles = (files) => {
    setSelectedFiles(files);
    setSelectedIndex(files.length);
  };

  return (
    <div className="d-flex" style={{ height: "100%" }}>
      <MeshProvider>
        <SideBar
          handleRangeChange={handleRangeChange} 
          rangeValue={rangeValue}
          selectedFiles={selectedFiles}
          selectedIndex={selectedIndex}
          updateSelectedFiles={updateSelectedFiles}
        />
         
        <Canvas>
          <Suspense fallback={null}>
            
          {selectedFiles && selectedFiles.map((file,index)=><ModelsDisplay key={index} meshisim={"/Models/"+file.value} pozisyon={[0,rangeValue,0]}/>)}
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 0, 0]} />
            <pointLight position={[-5, 0, 0]} />
            <pointLight position={[0, 0, 10]} />
            <pointLight position={[0, 0, -10]} />
            <pointLight position={[0, 10, 0]} />
            <pointLight position={[0, -10, 0]} />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </MeshProvider>
    </div>
  );
}
