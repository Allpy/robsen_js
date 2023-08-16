//React Components
import React, { useState, useRef, useContext } from 'react';
import Select from 'react-select';

//My Context
import { useAllMeshDataContext } from '../../Services/AllMeshDataContext';


const MyComponent = (props) => {

  //Slider Position RangeInput Values
  const [temporaryXRangeValue, setTemporaryXRangeValue] = useState(0);
  const [temporaryYRangeValue, setTemporaryYRangeValue] = useState(0);
  const [temporaryZRangeValue, setTemporaryZRangeValue] = useState(0);
  
  
  //Slider Rotation RangeInput Values
  const [temporaryXRotationValue, setTemporaryXRotationValue] = useState(0);
  const [temporaryYRotationValue, setTemporaryYRotationValue] = useState(0);
  const [temporaryZRotationValue, setTemporaryZRotationValue] = useState(0);


  //MeshData Values
  const {selectedMeshName,setSelectedMeshName} = useState();
  const [activeMeshData,setActiveMeshData] = useState(null);
  const [globalMeshDataIndex,setglobalMeshDataIndex] = useState(null);
  
  //MeshData Context
  const { allMeshData, setAllMeshData, selectedFiles, setSelectedFiles } = useAllMeshDataContext();
 
  

  const numberXInputRef = useRef(null);
  const numberYInputRef = useRef(null);
  const numberZInputRef = useRef(null);  
  
  const handleXSliderChange = (e) => {
    setTemporaryXRangeValue(e.target.value);
    if (activeMeshData) {
      const updatedMeshData = {
        ...activeMeshData, // Önceki veriyi kopyala
        x: temporaryXRangeValue,
      };
  
      setActiveMeshData(updatedMeshData); // Kopyalanan veriyi güncelle
    }
  };

  const handleYSliderChange = (e) => {
    setTemporaryYRangeValue(e.target.value);
  };

  const handleZSliderChange = (e) => {
    setTemporaryZRangeValue(e.target.value);
  };

  const handleXRotationSliderChange = (e) => {
    setTemporaryXRotationValue(e.target.value);
  };

  const handleYRotationSliderChange = (e) => {
    setTemporaryYRotationValue(e.target.value);
  };

  const handleZRotationSliderChange = (e) => {
    setTemporaryZRotationValue(e.target.value);
  };

  const handleTextInputChange = (e, axis) => {
    const value = e.target.value;
    if (axis === 'x') {
      setTemporaryXRangeValue(value);
    } else if (axis === 'y') {
      setTemporaryYRangeValue(value);
    } else if (axis === 'z') {
      setTemporaryZRangeValue(value);
    }
  };
  

  const handleRotationInputChange = (e, axis) => {
    const value = e.target.value;
    if (axis === 'x') {
      setTemporaryXRotationValue(value);
    } else if (axis === 'y') {
      setTemporaryYRotationValue(value);
    } else if (axis === 'z') {
      setTemporaryZRotationValue(value);
    }
  };

  

  const handleUpdateButtonClick = () => {
    if (activeMeshData) {
      const updatedMeshData = {
        ...activeMeshData, // Önceki veriyi kopyala
        x: temporaryXRangeValue,
        y: temporaryYRangeValue,
        z: temporaryZRangeValue,
        xRotation: temporaryXRotationValue,
        yRotation: temporaryYRotationValue,
        zRotation: temporaryZRotationValue,
      };
  
      setActiveMeshData(updatedMeshData); // Kopyalanan veriyi güncelle
      allMeshData[globalMeshDataIndex]=activeMeshData;
      setAllMeshData(allMeshData);
    }
  };

    
   
    //React Select Optionsları
    const handleMeshSelectChange = (selectedOption) => {
      const selectedMeshName = selectedOption.value;
    
      const MeshDataIndex = props.selectedFiles.findIndex(item => item.value === selectedMeshName);
      
      setglobalMeshDataIndex(MeshDataIndex);
      const NewactiveMeshData = allMeshData[MeshDataIndex];
      console.log(NewactiveMeshData);
      setActiveMeshData(NewactiveMeshData);
    };
    
    console.log(allMeshData[1]);
    console.log(activeMeshData);
    console.log(globalMeshDataIndex);
    console.log(allMeshData);
  return (
    <div >
    <div >
        
      <h2 className='text-light'>Select the Mesh</h2>
      <Select 
        options={props.selectedFiles} 
        isMulti={false}
        value={selectedMeshName} 
        onChange={handleMeshSelectChange}
      />
      <h2 className="text-light py-2">Position</h2>
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
          <span className="input-group-text">X</span>
          <input
            ref={numberXInputRef}
            className="form-control"
            type="number"
            onChange={(e) => handleTextInputChange(e, 'x')}
            value={temporaryXRangeValue}
            min={0}
            max={500}
          />
          <span className="input-group-text">mm</span>
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
          <span className="input-group-text">Y</span>
          <input
            ref={numberYInputRef}
            className="form-control"
            type="number"
            onChange={(e) => handleTextInputChange(e, 'y')}
            value={temporaryYRangeValue}
            min={0}
            max={500}
          />
          <span className="input-group-text">mm</span>
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
          <span className="input-group-text">Z</span>
          <input
            ref={numberZInputRef}
            className="form-control"
            type="number"
            onChange={(e) => handleTextInputChange(e, 'z')}
            value={temporaryZRangeValue}
            min={0}
            max={500}
          />
          <span className="input-group-text">mm</span>
        </div>
      </div>

      <h2 className="text-light py-2">Rotation</h2>
      <div>
        <input
          className="form-range me-3"
          type="range"
          min={0}
          max={360}
          onChange={handleXRotationSliderChange}
          value={temporaryXRotationValue}
        />
        <div className="input-group mb-3">
          <span className="input-group-text">X</span>
          <input
            ref={numberXInputRef}
            className="form-control"
            type="number"
            onChange={(e) => handleRotationInputChange(e, 'x')}
            value={temporaryXRotationValue}
            min={0}
            max={360}
          />
          <span className="input-group-text">°</span>
        </div>
      </div>

      <div>
        <input
          className="form-range me-3"
          type="range"
          min={0}
          max={360}
          onChange={handleYRotationSliderChange}
          value={temporaryYRotationValue}
        />
        <div className="input-group mb-3">
          <span className="input-group-text">Y</span>
          <input
            ref={numberYInputRef}
            className="form-control"
            type="number"
            onChange={(e) => handleRotationInputChange(e, 'y')}
            value={temporaryYRotationValue}
            min={0}
            max={360}
          />
          <span className="input-group-text">°</span>
        </div>
      </div>

      <div>
        <input
          className="form-range me-3"
          type="range"
          min={0}
          max={360}
          onChange={handleZRotationSliderChange}
          value={temporaryZRotationValue}
        />
        <div className="input-group mb-3">
          <span className="input-group-text">Z</span>
          <input
            ref={numberZInputRef}
            className="form-control"
            type="number"
            onChange={(e) => handleRotationInputChange(e, 'z')}
            value={temporaryZRotationValue}
            min={0}
            max={360}
          />
          <span className="input-group-text">°</span>
        </div>
      </div>

    </div>
    
    <button
        onClick={handleUpdateButtonClick}
        type="button"
        className="btn btn-primary mt-3 ms-2"
      >
        Update
      </button>
      
    </div>
  );
};

export default MyComponent;
 





/* 
    
    
      const handleButtonClick = () => {
        // Delete logic here
      };
      <button
        onClick={handleButtonClick}
        style={{ backgroundColor: 'red' }}
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
    
    */