import React, { useState, useEffect, useRef } from "react";
import { Color } from "three";

function MeshConfiguration({ onChange }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [textInputValue, setTextInputValue] = useState("0");
  const [numberInputValue, setNumberInputValue] = useState(0);
  const [unit, setUnit] = useState("mm");
  const [temporaryRangeValue, setTemporaryRangeValue] = useState(0);
  const numberInputRef = useRef();
  const [isDirty, setIsDirty] = useState(false);
  const [previousValue, setPreviousValue] = useState(0); // Önceki değeri takip edecek değişken

  useEffect(() => {
    setSliderValue(temporaryRangeValue);
    setTextInputValue(temporaryRangeValue.toString());
    if (!isDirty) {
      setNumberInputValue(temporaryRangeValue);
    }
  }, [temporaryRangeValue, isDirty]);

  useEffect(() => {
    if (numberInputRef.current && temporaryRangeValue !== parseInt(numberInputRef.current.value)) {
      setTemporaryRangeValue(parseInt(numberInputRef.current.value));
    }
  }, [temporaryRangeValue]);

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setTemporaryRangeValue(value);
    setTextInputValue(value.toString());
    setNumberInputValue(value);
    onChange(value);
  };

  const handleTextInputChange = (e) => {
    const value = e.target.value;
    setTextInputValue(value);
    if (!isNaN(value)) {
      const numericValue = parseInt(value);
      setTemporaryRangeValue(numericValue);
      setNumberInputValue(numericValue);
    }
    setIsDirty(true);
  };

  const handleUnitChange = (newUnit) => {
    if (newUnit !== unit) {
      setUnit(newUnit);
      let newValue = sliderValue;
      if (unit === "mm" && newUnit === "-m") {
        newValue = sliderValue / 1000;
      } else if (unit === "mm" && newUnit === "-cm") {
        newValue = sliderValue / 10;
      } else if (unit === "-m" && newUnit === "mm") {
        newValue = sliderValue * 1000;
      } else if (unit === "-m" && newUnit === "cm") {
        newValue = sliderValue * 100;
      } else if (unit === "-cm" && newUnit === "mm") {
        newValue = sliderValue * 10;
      } else if (unit === "-cm" && newUnit === "m") {
        newValue = sliderValue / 100;
      }
      setSliderValue(newValue);
      setTemporaryRangeValue(newValue);
      setTextInputValue(newValue.toString());
      setNumberInputValue(newValue);
    }
  };

  const handleButtonClick = () => {
    setTemporaryRangeValue(sliderValue);
    setNumberInputValue(sliderValue);
    setIsDirty(false);
    onChange(sliderValue);
  };

  const handleCancelButtonClick = () => {
    setTemporaryRangeValue(previousValue); // Önceki değere geri dön
    setNumberInputValue(previousValue);
    setIsDirty(false); // İptal edildiğinde isDirty false yap
  };

  const handleUpdateButtonClick = () => {
    setPreviousValue(temporaryRangeValue); // Update düğmesine basıldığında geçerli değeri önceki değer olarak sakla
    handleButtonClick(); // Update işlevini çağır
  };

  return (
    <div>
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
          value={numberInputValue}
          onChange={handleTextInputChange}
          min={0}
          max={500}
        />
        <span className="input-group-text">{unit}</span>
        <div className="input-group-append">
          <button
            className={`btn btn-outline-light ${unit === "mm" ? "active" : ""}`}
            type="button"
            onClick={() => handleUnitChange("mm")}
          >
            mm
          </button>
          <button
            className={`btn btn-outline-light ${unit === "m" ? "active" : ""}`}
            type="button"
            onClick={() => handleUnitChange("m")}
          >
            m
          </button>
          <button
            className={`btn btn-outline-light ${unit === "cm" ? "active" : ""}`}
            type="button"
            onClick={() => handleUnitChange("cm")}
          >
            cm
          </button>
        </div>
      </div>
      <button onClick={handleUpdateButtonClick} type="button" className="btn btn-primary mt-3 ms-2">
        Update
      </button>
      <button onClick={handleCancelButtonClick} style={{backgroundColor:"red"}} type="button" className="btn btn-danger mt-3 ms-2 px-1 py-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
      </button>
    </div>
  );
}

export default MeshConfiguration;
