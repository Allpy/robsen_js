import React, { useState } from "react";

function SideBar({ onChange }) {
    const [sliderValue, setSliderValue] = useState(0);
    const [textInputValue, setTextInputValue] = useState("0");
    const [temporaryValue, setTemporaryValue] = useState(null);
    const [unit, setUnit] = useState("mm");
    const [showAddInputs, setShowAddInputs] = useState(false);
    const [showConfigureInputs, setShowConfigureInputs] = useState(false);
  
    const handleSliderChange = (e) => {
      const value = parseInt(e.target.value);
      setTemporaryValue(null); // Reset temporary value
      onChange(value);
      setSliderValue(value);
      setTextInputValue(value.toString()); // Update text input value as a string without "mm" suffix
    };
  
    const handleTextInputChange = (e) => {
      const value = e.target.value;
      setTextInputValue(value);
      if (!isNaN(value)) {
        const numericValue = parseInt(value);
        setTemporaryValue(numericValue); // Set temporary value without updating the slider
      }
    };
  
    const handleUnitChange = (newUnit) => {
      if (newUnit !== unit) {
        setUnit(newUnit);
        // Convert the value to the selected unit
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
        setSliderValue(Math.abs(newValue)); // Ensure the value is positive
        setTextInputValue(Math.abs(newValue).toString());
        onChange(Math.abs(newValue));
      }
    };
  
    const handleButtonClick = () => {
      if (temporaryValue !== null) {
        setSliderValue(Math.abs(temporaryValue)); // Ensure the value is positive
        onChange(Math.abs(temporaryValue));
        setTextInputValue(Math.abs(temporaryValue).toString()); // Update text input value as a string without "mm" suffix
      }
    };
  
    return (
      <div className="Sidebar bg-secondary px-5 py-5" style={{ width: "30%", height: "100%", left: 0 }}>
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${showAddInputs ? "active" : ""}`}
              style={{ color: showAddInputs ? "black" : "white" }}
              onClick={() => {
                setShowAddInputs(true);
                setShowConfigureInputs(false);
              }}
            >
              Add
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${showConfigureInputs ? "active" : ""}`}
              style={{ color: showConfigureInputs ? "black" : "white" }}
              onClick={() => {
                setShowAddInputs(false);
                setShowConfigureInputs(true);
              }}
            >
              Configure
            </button>
          </li>
        </ul>
  
        {showAddInputs && (
          <div>
            <input
              type="file"
              className="form-control mb-3"
              // Add any additional attributes or event handlers as needed for the file input
            />
            <button className="btn btn-primary" onClick={() => console.log("Add button clicked!")}>
              Add
            </button>
          </div>
        )}
  
        {showConfigureInputs && (
          <div>
            <input
              className="form-range me-3"
              type="range"
              min={0}
              max={500}
              id="slider"
              onChange={handleSliderChange}
              value={sliderValue}
            />
            <div className="input-group ps-2">
              <input
                className="form-control"
                type="number"
                value={textInputValue}
                onChange={handleTextInputChange}
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
            <button onClick={handleButtonClick} type="button" className="btn btn-primary mt-3 ms-2">
              Update
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default SideBar;