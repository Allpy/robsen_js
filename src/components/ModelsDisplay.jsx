import React, { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelsDisplay = (props) => {
  const [clicked, setClicked] = useState(false);
  const [lastValue, setLastValue] = useState([0, 0, 0]); // Default olarak [0, 0, 0] olacak

  const handleClick = () => {
    setClicked(!clicked);
  };

  const gltf = useLoader(GLTFLoader, props.meshisim);

  // Cismin tıklanma durumuna göre pozisyonu ayarla
  const position = clicked ? props.pozisyon : lastValue;

  // Cismin tıklanma durumuna göre lastValue'yu güncelle
  const updateLastValue = () => {
    if (!clicked) {
      setLastValue([...props.pozisyon]); // Spread operatörüyle props.pozisyon değerini lastValue'ya kopyalıyoruz
    }
  };

  return (
    <>
      <primitive
        object={gltf.scene}
        position={position}
        scale={0.4}
        onClick={() => {
          handleClick();
          updateLastValue();
        }}
      />
      <meshStandardMaterial />
    </>
  );
};

export default ModelsDisplay;
