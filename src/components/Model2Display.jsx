import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useContext } from 'react';
import { GlobalContext } from "../Services/GlobalContext";
const Model2 = () => {
    const gltf = useLoader(GLTFLoader, "./Upperglb.glb");
    const { globalValue } = useContext(GlobalContext);
    
    return (
      <>
        <primitive object={gltf.scene} position={[0,Number(globalValue),0]} scale={0.4}  />
        <meshStandardMaterial color={'red'} />
      </>
    );
  };
export default Model2;