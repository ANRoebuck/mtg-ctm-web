import React from 'react';


const SearchOptions = ({ title, options, selectedOption, setSelectedOption,  defaultIndex = 0 }) => {

  const optionsToRender = options.map((option, i) => {

    // if there is a selectedOption, compare option vs selectedOption
    // else use default index -- likely on first use of app when no selectedOption is saved to localstorage
    const checked = selectedOption ? option === selectedOption : i === defaultIndex;

    return (
      <div className="radio" key={'radio-'+i}>
        <label>
          <input
            type="radio"
            value={option}
            checked={checked}
            onChange={(e) => setSelectedOption(e.target.value)}/>
          {option}
        </label>
      </div>
    );
  });

  return (
      <div className={"option-set"}>
        <label>
          {title}:
          {optionsToRender}
        </label>
      </div>
  );
}

export default SearchOptions;
