import React, { useState, useEffect, useRef, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useAllMeshDataContext } from "../../Services/AllMeshDataContext";
import DefaultMesh from "./DefaultMesh";

const MeshAdd = ({ sendData, receivedTableData }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { allMeshData, setAllMeshData } = useAllMeshDataContext();
  const [fileOptions, setFileOptions] = useState([]);
  const [addClicked, setAddClicked] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const idCounter = useRef(0);

  useEffect(() => {
    axios
      .get("/Models")
      .then((response) => {
        const options = response.data.map((fileName) => ({
          value: fileName,
          label: fileName,
        }));
        setFileOptions(options);
      })
      .catch((error) => {
        console.error("An error occurred while fetching file names:", error);
      });
  }, []);

  useEffect(() => {
    const meshDataArray = selectedFiles.map((file) => {
      const meshData = {
        id: idCounter.current,
        meshName: file.label,
        x: 0,
        y: 0,
        z: 0,
        xRotation: 0,
        yRotation: 0,
        zRotation: 0,
      };
      idCounter.current++;
      return meshData;
    });

    setAllMeshData(meshDataArray);
  }, [selectedFiles, setAllMeshData]);

  useEffect(() => {
    // Update allMeshData with selectedFiles here
    setAllMeshData((prevAllMeshData) => ({
      ...prevAllMeshData,
      selectedFiles,
    }));
  }, [selectedFiles, setAllMeshData]);

  const handleFileSelect = (selectedOption) => {
    setSelectedFiles(selectedOption);
    setSelectedIndex(selectedOption.length);
    setIsFileSelected(true);
  };

  const handleAddClick = () => {
    if (isFileSelected) {
      sendData(selectedFiles);
      setAddClicked(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="text-light">Dosya Listesi:</h2>
        <Select
          className="py-3"
          isMulti
          options={fileOptions}
          value={selectedFiles}
          onChange={handleFileSelect}
        />
        <p>Seçilen Dosya Sayısı: {selectedIndex}</p>
        <button className="btn btn-primary" onClick={handleAddClick}>
          Add
        </button>
      </div>
      <hr />
      <div className="row">
        <DefaultMesh selectedFiles={selectedFiles}/>
      </div>
    </div>
  );
};

export default MeshAdd;
