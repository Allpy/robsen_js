import React, { useState, useEffect, useRef } from "react";

class RotationValues {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
}

function MeshRotation({ onChange, rotationValues }) {
  const [temporaryXRangeValue, setTemporaryXRangeValue] = useState(
    rotationValues ? rotationValues.x : 0
  );
  const [temporaryYRangeValue, setTemporaryYRangeValue] = useState(
    rotationValues ? rotationValues.y : 0
  );
  const [temporaryZRangeValue, setTemporaryZRangeValue] = useState(
    rotationValues ? rotationValues.z : 0
  );
  const numberXInputRef = useRef();
  const numberYInputRef = useRef();
  const numberZInputRef = useRef();
  const [isDirty, setIsDirty] = useState(false);
  const [previousRotationValues, setPreviousRotationValues] = useState(
    rotationValues || new RotationValues()
  );

  useEffect(() => {
    setTemporaryXRangeValue(rotationValues ? rotationValues.x : 0);
    setTemporaryYRangeValue(rotationValues ? rotationValues.y : 0);
    setTemporaryZRangeValue(rotationValues ? rotationValues.z : 0);

    if (!isDirty) {
      numberXInputRef.current.value = rotationValues ? rotationValues.x : 0;
      numberYInputRef.current.value = rotationValues ? rotationValues.y : 0;
      numberZInputRef.current.value = rotationValues ? rotationValues.z : 0;
    }
  }, [rotationValues, isDirty]);

  const handleXSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setTemporaryXRangeValue(value);
    numberXInputRef.current.value = value;
    setIsDirty(true);

    const updatedRotationValues = {
      ...previousRotationValues,
      x: value,
    };
    onChange(updatedRotationValues);
  };

  const handleYSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setTemporaryYRangeValue(value);
    numberYInputRef.current.value = value;
    setIsDirty(true);

    const updatedRotationValues = {
      ...previousRotationValues,
      y: value,
    };
    onChange(updatedRotationValues);
  };

  const handleZSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setTemporaryZRangeValue(value);
    numberZInputRef.current.value = value;
    setIsDirty(true);

    const updatedRotationValues = {
      ...previousRotationValues,
      z: value,
    };
    onChange(updatedRotationValues);
  };

  const handleTextInputChange = (e, coordinate) => {
    const value = e.target.value;
    const numericValue = parseInt(value);
    setIsDirty(true);

    if (!isNaN(numericValue)) {
      const updatedRotationValues = {
        ...previousRotationValues,
        [coordinate]: numericValue,
      };
      onChange(updatedRotationValues);
    }
  };

  const handleButtonClick = () => {
    setTemporaryXRangeValue(previousRotationValues.x);
    setTemporaryYRangeValue(previousRotationValues.y);
    setTemporaryZRangeValue(previousRotationValues.z);
    setIsDirty(false);
    onChange(previousRotationValues);
  };

  const handleUpdateButtonClick = () => {
    const updatedValues = {
      ...previousRotationValues,
      x: temporaryXRangeValue,
      y: temporaryYRangeValue,
      z: temporaryZRangeValue,
    };

    setPreviousRotationValues(updatedValues);
    setIsDirty(false);
  };

  return (
    <div>
      <h2 className="text-light py-2">Rotation</h2>
      <div>
        <input
          className="form-range me-3"
          type="range"
          min={0}
          max={500}
          onChange={handleXSliderChange}
          value={temporaryXRangeValue}
        />
         <div className="input-group mb-3">
        <span class="input-group-text">X</span>
        <input
          ref={numberXInputRef}
          className="form-control"
          type="number"
          onChange={(e) => handleTextInputChange(e, "x")}
          value={temporaryXRangeValue}
          min={0}
          max={500}
        />
        <span class="input-group-text">°</span>
        </div>
        
      </div>
      <div>
       
        <input
          className="form-range me-3"
          type="range"
          min={0}
          max={500}
          onChange={handleYSliderChange}
          value={temporaryYRangeValue}
        />
        <div className="input-group mb-3">
        <span class="input-group-text">Y</span>
        <input
          ref={numberYInputRef}
          className="form-control"
          type="number"
          onChange={(e) => handleTextInputChange(e, "y")}
          value={temporaryYRangeValue}
          min={0}
          max={500}
        />
        <span class="input-group-text">°</span>
        </div>
        
      </div>
      <div>
        
      <input
          className="form-range me-3"
          type="range"
          min={0}
          max={500}
          onChange={handleZSliderChange}
          value={temporaryZRangeValue}
        />
    
        
        <div className="input-group mb-3">
        <span class="input-group-text">Z</span>
        <input
          ref={numberZInputRef}
          className="form-control"
          type="number"
          onChange={(e) => handleTextInputChange(e, "z")}
          value={temporaryZRangeValue}
          min={0}
          max={500}
        />
        <span class="input-group-text">°</span>
        </div>
        
      </div>
      <button
        onClick={handleUpdateButtonClick}
        type="button"
        className="btn btn-primary mt-3 ms-2"
      >
        Update
      </button>
      <button
        onClick={handleButtonClick}
        style={{ backgroundColor: "red" }}
        type="button"
        className="btn btn-danger mt-3 ms-2 px-1 py-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
    </div>
  );
}

export default MeshRotation;
