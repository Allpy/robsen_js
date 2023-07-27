import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useContext } from "react";
import { Controls, useControl } from 'react-three-gui';
import React, { useState } from 'react';

// MY Apps
import Model2 from "./components/Model2Display.jsx";
import Model1 from "./components/Model1Display.jsx";
import SideBar from './components/GuiControl.jsx';
import { GlobalContext } from './Services/GlobalContext.js';

export default function App() {
  // const [globalValue, setGlobalValue] = useState(0); // Global değişken
  const { setGlobalValue} = useContext(GlobalContext)
  const updateGlobalValue = (value) => {
    // Değerleri -2 ve 2 arasında eşitleyin (mapRange fonksiyonu gerekli)
    const mappedValue = mapRange(value, 0, 500, -2, 0.254);
    setGlobalValue(mappedValue);
    console.log(value);
  };
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };
  
  return (
    <div className='d-flex' style={{height:"100%"}}>
      <SideBar onChange={updateGlobalValue}/>
      <Canvas>
        <Suspense fallback={null}>
          <Model1 />
          <Model2 />
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
    </div>
  )
}