import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { MeshContext } from "../Services/MeshContext";

const FileList = ({ sendData }) => {
  const { selectedFiles, setSelectedFiles, selectedIndex, setSelectedIndex } = useContext(MeshContext);
  const [fileOptions, setFileOptions] = useState([]);
  const [addClicked, setAddClicked] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false); // New state variable

  useEffect(() => {
    axios
      .get("/Models") // You may need to replace this URL with the appropriate endpoint.
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

  const handleFileSelect = (selectedOption) => {
    setSelectedFiles(selectedOption);
    setSelectedIndex(selectedOption.length);
    setIsFileSelected(true); // Update the state when a file is selected
  };

  const handleAddClick = () => {
    if (isFileSelected) {
      sendData(selectedFiles); // Send data only if a file is selected
      setAddClicked(true);
    }
  };

  return (
    <div>
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
      {addClicked && <p>Data sent!</p>}
    </div>
  );
};

export default FileList;
