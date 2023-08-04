import React, { useState, useEffect, useRef } from "react";

function MeshConfiguration({ onChange, rangeValue }) {
  const [temporaryRangeValue, setTemporaryRangeValue] = useState(rangeValue || 0);
  const numberInputRef = useRef();
  const [isDirty, setIsDirty] = useState(false);
  const [previousValue, setPreviousValue] = useState(rangeValue || 0);

  useEffect(() => {
    setTemporaryRangeValue(rangeValue);
    if (!isDirty) {
      numberInputRef.current.value = rangeValue;
    }
  }, [rangeValue, isDirty]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setTemporaryRangeValue(value);
    numberInputRef.current.value = value;
    setIsDirty(true);
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTemporaryRangeValue(value);
    if (!isNaN(value)) {
      const numericValue = parseInt(value);
      setTemporaryRangeValue(numericValue);
    }
    setIsDirty(true);
  };

  const handleButtonClick = () => {
    setTemporaryRangeValue(previousValue);
    setIsDirty(false);
    onChange(previousValue);
  };

  const handleUpdateButtonClick = () => {
    setPreviousValue(temporaryRangeValue);
    handleButtonClick();
  };

  return (
    <div>
      <h2 className="text-light py-2">Position</h2>
      <input
        className="form-range me-3"
        type="range"
        min={0}
        max={500}
        id="slider"
        onChange={handleSliderChange}
        value={temporaryRangeValue}
      />
      <div className="input-group ps-2">
        <input
          ref={numberInputRef}
          className="form-control"
          type="number"
          onChange={handleTextInputChange}
          value={temporaryRangeValue}
          min={0}
          max={500}
        />
        <span className="input-group-text">mm</span>
      </div>
      <button onClick={handleUpdateButtonClick} type="button" className="btn btn-primary mt-3 ms-2">
        Update
      </button>
      <button onClick={handleButtonClick} style={{ backgroundColor: "red" }} type="button" className="btn btn-danger mt-3 ms-2 px-1 py-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </div>
  );
}

export default MeshConfiguration;
