import React, { useState } from 'react';
import axios from 'axios';



const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLoadClick = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('stlFile', selectedFile);

      axios.post('http://localhost:5000/api/upload', formData)
        .then(response => {
          console.log('Dosya yüklendi:', response.data);
        })
        .catch(error => {
          console.error('Dosya yüklenirken bir hata oluştu:', error);
        });
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Dosya Yükleme</h5>
        
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">Dosya Seçin (.stl)</label>
          <input
            type="file"
            className="form-control"
            id="fileInput"
            accept=".stl"
            onChange={handleFileChange}
          />
          
        </div>
        <button className="btn btn-primary" onClick={handleLoadClick}>Yükle</button>
      </div>
    </div>
  );
};

export default FileUpload;
