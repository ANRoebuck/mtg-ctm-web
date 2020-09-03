import React from "react";
import OptionSetRadio from "./OptionSetRadio";
import OptionSetImages from "./OptionSetImages";
import { sortIcons, splitIcons, viewIcons } from "../utils/enums";

const DecklistOptions = ({ sortOptions, setSortBy, splitOptions, setSplitBy, viewOptions, setViewBy }) => {

  return (
    <div className="decklist-options">
      {/*<OptionSetRadio title={'Sort :'} options={sortOptions} selectOption={setSortBy} />*/}
      <OptionSetImages title={'Sort :'} options={sortOptions} sources={sortIcons} selectOption={setSortBy} />
      {/*<OptionSetRadio title={'Split :'} options={splitOptions} selectOption={setSplitBy} />*/}
      <OptionSetImages title={'Split :'} options={splitOptions} sources={splitIcons} selectOption={setSplitBy} />
      {/*<OptionSetRadio title={'View :'} options={viewOptions} selectOption={setViewBy} />*/}
      <OptionSetImages title={'View :'} options={viewOptions} sources={viewIcons} selectOption={setViewBy} />
    </div>
  );
}

export default DecklistOptions;