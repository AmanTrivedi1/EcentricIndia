// CurrencyContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState(
    localStorage.getItem("currency") || "inr"
  );

  useEffect(() => {
    localStorage.setItem("currency", selectedCurrency);
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
