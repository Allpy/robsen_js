import React, { useState, useEffect } from "react";
import { useContext } from "react";
import MeshAdd from "./Gui_Components/MeshAdd";
import MeshConfiguration from "./Gui_Components/MeshConfigrutaion";
import { GlobalContext } from "../Services/GlobalContext";

function SideBar() {
  const [activeTab, setActiveTab] = useState("Add");
  const { globalValue, setGlobalValue } = useContext(GlobalContext);
  const [localGlobalValue, setLocalGlobalValue] = useState(globalValue);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Define a function to handle the value change from MeshConfiguration
  const handleConfigurationChange = (value) => {
    // You can add any additional logic here if needed
    setLocalGlobalValue(value);
  };

  // Use useEffect to update the globalValue in the GlobalContext when localGlobalValue changes
  useEffect(() => {
    setGlobalValue(localGlobalValue);
    // The second parameter [] ensures this effect runs only once after initial render
  }, [localGlobalValue, setGlobalValue]);

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
      </nav>
      <div className="tab-content">
        {activeTab === "Add" && <MeshAdd />}
        {activeTab === "Configuration" && <MeshConfiguration onChange={handleConfigurationChange} />}
      </div>
    </div>
  );
}

export default SideBar;
