import React, { useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";

const ModelsDisplay = (props) => {
  const [clicked, setClicked] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [lastValue, setLastValue] = useState([0, 0, 0]);

  const [xTranslation, setXTranslation] = useState(0);
  const [yTranslation, setYTranslation] = useState(0);

  const movements = [
    [2.5, 0, 5],
    [2.5, 2.5, 5],
    [0, 2.5, 5],
    [0, 0, 5],
  ];

  const shouldAnimate = props.isAnimationRunning && (!clicked || animationIndex !== 0);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const updateLastValue = () => {
    if (!clicked) {
      setLastValue([
        lastValue[0] + xTranslation,
        lastValue[1] - yTranslation,
        lastValue[2],
      ]);
    }
  };
    

  const geometry = useLoader(STLLoader, props.meshisim);

  const position = shouldAnimate ? [lastValue[0] + xTranslation, lastValue[1] - yTranslation, lastValue[2]] : clicked ? props.position : lastValue;

  const rotation = shouldAnimate ? props.rotasyon : lastValue;

  useEffect(() => {
    let animationFrameId;

    const animateMovements = () => {
      if (shouldAnimate) {
        const targetPosition = movements[animationIndex];
        if (
          Math.abs(xTranslation - targetPosition[0]) > 0.02 ||
          Math.abs(yTranslation - targetPosition[1]) > 0.02
        ) {
          setXTranslation((prevX) =>
            Math.abs(prevX - targetPosition[0]) > 0.01
              ? prevX + (targetPosition[0] - prevX) * 0.02
              : targetPosition[0]
          );
          setYTranslation((prevY) =>
            Math.abs(prevY - targetPosition[1]) > 0.02
              ? prevY + (targetPosition[1] - prevY) * 0.02
              : targetPosition[1]
          );
        } else {
          setAnimationIndex((prevIndex) =>
            prevIndex === movements.length - 1 ? 0 : prevIndex + 1
          );
        }

        animationFrameId = requestAnimationFrame(animateMovements);
      }
    };

    if (shouldAnimate) {
      animationFrameId = requestAnimationFrame(animateMovements);
    } else if (!shouldAnimate && (xTranslation !== 0 || yTranslation !== 0)) {
      setXTranslation(0);
      setYTranslation(0);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldAnimate, xTranslation, yTranslation, animationIndex]);

  const color = clicked ? 0x08c918 : 0x224449;
  const material = new THREE.MeshStandardMaterial({ color });

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={clicked?props.pozisyon:position}
      rotation={clicked?props.rotasyon : [0,0,0]}
      scale={0.01}
      onClick={() => {
        handleClick();
        updateLastValue();
      }}
    />
  );
};

export default ModelsDisplay;
