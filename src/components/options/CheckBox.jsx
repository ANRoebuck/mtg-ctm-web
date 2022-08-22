import React from 'react';

const CheckBox = ({ option = '', checked, onChange }) => {

  return (
    <div className="radio">
      <label className="label">
        <input
          type="checkbox"
          value={option}
          checked={checked}
          onChange={onChange}/>
        {option}
      </label>
    </div>
  )
};

export default CheckBox;
