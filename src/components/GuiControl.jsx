import React, { useState } from "react";
import MeshAdd from "./Gui_Components/MeshAdd";
import MeshConfiguration from "./Gui_Components/MeshConfigrutaion";
import FileList from "./FileList";

function SideBar({ selectedFiles, selectedIndex, updateSelectedFiles, handleRangeChange, rangeValue }) {
  const [activeTab, setActiveTab] = useState("Add");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="Sidebar bg-secondary px-5 py-5" style={{ width: "30%", height: "100%", left: 0 }}>
      <nav className="nav nav-tabs mb-4">
        <button
          className={`nav-link ${activeTab === "Add" ? "active text-black" : "text-white"}`}
          onClick={() => handleTabClick("Add")}
        >
          Add
        </button>
        <button
          className={`nav-link ${activeTab === "Configuration" ? "active text-black" : "text-white"}`}
          onClick={() => handleTabClick("Configuration")}
        >
          Configuration
        </button>
        <button
          className={`nav-link ${activeTab === "FileList" ? "active text-black" : "text-white"}`}
          onClick={() => handleTabClick("FileList")}
        >
          FileList
        </button>
      </nav>
      <div className="tab-content">
        {activeTab === "Add" && <MeshAdd />}
        {activeTab === "Configuration" && <MeshConfiguration onChange={handleRangeChange} rangeValue={rangeValue} />}
        {activeTab === "FileList" && (
          <FileList selectedFiles={selectedFiles} selectedIndex={selectedIndex} sendData={updateSelectedFiles} />
        )}
      </div>
    </div>
  );
}

export default SideBar;
