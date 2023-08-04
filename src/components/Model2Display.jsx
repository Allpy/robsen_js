import React, { useContext, useState, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GlobalContext } from "../Services/GlobalContext";


const Model2 = (props) => {
  const { globalValue } = useContext(GlobalContext);
  const gltf = useLoader(GLTFLoader, props.meshisim);
  const [clicked, setClicked] = useState(false);
  const lastPositionRef = useRef([0, 0, 0]);  
  

  
  const handleModelClick = () => {
    setClicked((prevState) => !prevState);
  };

  let position;
  if (clicked) {
    position = [0, Number(globalValue), 0];
  } else {
    position = lastPositionRef.current;
  }

  // Son pozisyonu güncelle
  lastPositionRef.current = position;

  return (
    <>
      <primitive object={gltf.scene} position={props.pozisyon} scale={0.4} onClick={handleModelClick} />
      <meshStandardMaterial color={clicked ? "red" : "blue"} />
    </>
  );
};

export default Model2;
