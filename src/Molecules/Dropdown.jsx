import React from "react";
import { CURRENCY } from "../Constants/Constant";

// custom dropdown component
const Dropdown = ({ selectedPair, handlePairChange }) => (
  <div className="select-container">
    <label>Select Currency Pair</label>
    <select
      className="select-dropdown"
      value={selectedPair}
      onChange={handlePairChange}
    >
      {CURRENCY.map((currency) => (
        <option value={currency}>{currency}</option>
      ))}
    </select>
  </div>
);

export default Dropdown;
