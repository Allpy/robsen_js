import React, { Suspense, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


// MY Apps
import Model2 from "./components/Model2Display.jsx";
import Model1 from "./components/Model1Display.jsx";
import SideBar from "./components/GuiControl.jsx";


export default function App() {
  
  return (
    <div className="d-flex" style={{ height: "100%" }}>
      <SideBar />
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
  );
}
