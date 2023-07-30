import React, { useContext } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GlobalContext } from "../Services/GlobalContext";

const Model2 = () => {
  const { globalValue } = useContext(GlobalContext);
  const gltf = useLoader(GLTFLoader, "./Models/Upperglb.glb");
  console.log(globalValue)
  return (
    <>
      <primitive object={gltf.scene} position={[0, Number(globalValue), 0]} scale={0.4} />
      <meshStandardMaterial color={"red"} />
    </>
  );
};

export default Model2;
