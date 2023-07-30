import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model1 = () => {
    const gltf = useLoader(GLTFLoader, "./Models/Poimandres.glb");
    return (
      <>
        <primitive object={gltf.scene} scale={0.4} />
        <meshStandardMaterial color={ 'red'} />
      </>
    );
  };

export default Model1;