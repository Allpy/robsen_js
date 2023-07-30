// GlobalContext.js

import React, { createContext, useState } from "react";

// createContext ile bir context oluşturuyoruz
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [globalValue, setGlobalValue] = useState(0);

  // Min ve Max değerleri buradan değiştirerek dönüşüm aralığını ayarlayabilirsiniz
  const minOriginalValue = 0;
  const maxOriginalValue = 500;
  const minMappedValue = -2;
  const maxMappedValue = 0.257;

  // Bu fonksiyon, gelen değeri istediğiniz aralığa dönüştürmek için kullanılabilir
  const mapValueToRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  };

  // Bu fonksiyon, gelen değeri dönüştürüp globalValue'yu güncellemek için kullanılır
  const updateGlobalValue = (newValue) => {
    // Ensure the newValue is within the range of 0 to 500
    const constrainedValue = Math.min(Math.max(newValue, minOriginalValue), maxOriginalValue);

    // Manually specify the mapping from the range of 0 to 500 to the range of -2 to 2
    const mappedValue = mapValueToRange(constrainedValue, minOriginalValue, maxOriginalValue, minMappedValue, maxMappedValue);

    setGlobalValue(mappedValue);
  };

  return (
    // GlobalContext.Provider ile context'in değerini ve fonksiyonları sağlıyoruz
    <GlobalContext.Provider value={{ globalValue, setGlobalValue: updateGlobalValue }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
