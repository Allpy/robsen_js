import React, { useState } from "react";
import MeshLoad from "./Gui_Components/MeshLoad";
import MeshManipulation from "./Gui_Components/MeshManipulation";
import MeshAdd from "./Gui_Components/MeshAdd";
import MeshRotation from "./Gui_Components/MeshRotation";

function SideBar({ 
    selectedFiles, 
    selectedIndex, 
    updateSelectedFiles,
    handleRangeChange,
    handleRangeChangeR, 
    positionValues, 
    rotationValues,
    receivedTableData,
    handleReceivedTableData
  }) {
  const [activeTab, setActiveTab] = useState("Add");
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  
  return (
    <div className="Sidebar bg-secondary px-5 py-5" style={{ width: "30%", height:"100vh", left: 0 }}>
      <div className="container position-relative"><img src="img/download.png" className="mt-3 mb-5 ms-4 me-auto" style={{width:"400px"}} alt="" /></div>
    <nav className="nav nav-tabs mb-4">
      <button
        className={`nav-link ${activeTab === "Add" ? "active text-black" : "text-white"}`}
        onClick={() => handleTabClick("Add")}
      >
        Load
      </button>
      <button
        className={`nav-link ${activeTab === "Configuration" ? "active text-black" : "text-white"}`}
        onClick={() => handleTabClick("Configuration")}
      >
        Manipulation
      </button>
      <button
        className={`nav-link ${activeTab === "MeshAdd" ? "active text-black" : "text-white"}`}
        onClick={() => handleTabClick("MeshAdd")}
      >
        Add
      </button>
      
    </nav>
      <div className="tab-content">
        {activeTab === "Add" && <MeshLoad />}
        {activeTab === "Configuration" && (
          <MeshManipulation onChange={handleRangeChange} tableData={receivedTableData} positionValues={positionValues} /> )}
        {activeTab === "MeshAdd" && (
          <MeshAdd
            selectedFiles={selectedFiles}
            selectedIndex={selectedIndex}
            sendData={updateSelectedFiles}
            receivedTableData={receivedTableData}  
            handleReceivedTableData={handleReceivedTableData}  
          />
        )}
        {activeTab === "Configuration" && (
          <MeshRotation onChange={handleRangeChangeR} positionValues={rotationValues} /> 
        )}
      </div>
    </div>
  );
}

export default SideBar;
