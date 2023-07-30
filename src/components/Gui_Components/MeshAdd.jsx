import React, { useState } from "react";

function MeshAdd() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleAddButtonClick = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("myFile", selectedFile);

      fetch("/api/uploadfile", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully!");
            // Perform any other actions you want after successful file upload
          } else {
            console.error("File upload failed!");
            // Handle error case if needed
          }
        })
        .catch((error) => {
          console.error("Error during file upload:", error);
          // Handle error case if needed
        });
    }
  };

  return (
    <div>
      <input
        type="file"
        className="form-control mb-3"
        onChange={handleFileChange}
      />
      <button className="btn btn-primary" onClick={handleAddButtonClick}>
        Add
      </button>
    </div>
  );
}

export default MeshAdd;
