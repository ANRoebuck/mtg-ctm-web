import React from "react";

const RadioButton = ({ option, checked, onChange }) => {

  return (
    <div className="radio">
      <label>
        <input
          type="radio"
          value={option}
          checked={checked}
          onChange={onChange}/>
        {option}
      </label>
    </div>
  )
};

export default RadioButton;