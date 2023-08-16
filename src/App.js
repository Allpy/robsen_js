import React, { Suspense, useContext, useState } from "react";


//My Components
import SideBar from "./components/GuiControl";
import ModelsDisplay from "./components/ModelsDisplay";


//Three Fiber Libs 
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, Grid} from "@react-three/drei";
import {useControls} from 'leva'

//My Context
import { MeshProvider } from "./Services/MeshContext";
import { usePositionContext } from "./Services/PositionContext";
import { MeshContext } from "./Services/MeshContext";



class PositionValues {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.rangeValue = 0;
  }
}

class RotationValues {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.rangeValueR = 0;
  }
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export default function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [positionValues, setPositionValues] = useState(new PositionValues());
  const [rotationValues, setRotationValues] = useState(new RotationValues());
  const [receivedTableData, setReceivedTableData] = useState([]);
  const { positionData } = usePositionContext();
  const [isAnimationRunning, setAnimationRunning] = useState(false); // Animasyon durumu
  const meshid = useState(0);
 


  const { gridSize, ...gridConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: '#6f6f6f',
    sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: '#9d4b4b',
    fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true
  })

  const handleReceivedTableData = (data) => {
    setReceivedTableData(data);
  };

  const updateSelectedFiles = (files) => {
    setSelectedFiles(files);
    setSelectedIndex(files.length);
  };

  const handleRangeChange = (updatedPositionValues) => {
    setPositionValues(updatedPositionValues);
  };

  const handleRangeChangeR = (updatedRotationValues) => {
    setRotationValues(updatedRotationValues);
  };

  const handleStartAnimation = () => {
    setAnimationRunning(true);
  };

  const handleStopAnimation = () => {
    setAnimationRunning(false);
  };
  
  return (
    <div className="d-flex" style={{ height: "100%" }}>
      <MeshProvider>
        <SideBar
          handleRangeChange={handleRangeChange}
          handleRangeChangeR={handleRangeChangeR}
          positionValues={positionValues}
          rotationValues={rotationValues}
          selectedFiles={selectedFiles}
          selectedIndex={selectedIndex}
          updateSelectedFiles={updateSelectedFiles}
          receivedTableData={receivedTableData}
          handleReceivedTableData={handleReceivedTableData}
        />
        
        <div className="d-flex flex-column">
          <button className="btn btn-success rounded-0" onClick={handleStartAnimation}>
            start
          </button>
          <button className="btn btn-danger rounded-0" onClick={handleStopAnimation}>
            stop
          </button>
        </div>
        <Canvas style={{ height: "100vh" }}>
          
          <Suspense fallback={null}>
            {selectedFiles.map((file, index) => (
              <ModelsDisplay
                key={index}
                id={meshid + index}
                meshisim={"/Models/" + file.value}
                rotasyon={[
                  degreesToRadians(rotationValues.x),
                  degreesToRadians(rotationValues.z),
                  degreesToRadians(rotationValues.y),
                ]}
                pozisyon={[
                  positionValues.x / 100,
                  positionValues.z / 100,
                  positionValues.y / 100,
                ]}
                isAnimationRunning={isAnimationRunning} 
              />
            ))}
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 0, 0]} />
            <pointLight position={[-5, 0, 0]} />
            <pointLight position={[0, 0, 10]} />
            <pointLight position={[0, 0, -10]} />
            <pointLight position={[0, 10, 0]} />
            <pointLight position={[0, -10, 0]} />
            <OrbitControls makeDefault />
            <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
              <GizmoViewport axisColors={['#9d4b4b', '#2f7f4f', '#3b5b9d']} labelColor="white" />
            </GizmoHelper>
            <Grid position={[0, 0, 0]} args={gridSize} {...gridConfig} />
          </Suspense>
          
        </Canvas>
        
      </MeshProvider>
    </div>
  );
}
