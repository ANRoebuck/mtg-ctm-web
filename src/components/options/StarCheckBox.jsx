import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const StarCheckBox = ({ checked, onChange }) => (
  <div className="radio">
    {checked
      ? <StarIcon  onClick={onChange}/>
      : <StarBorderIcon onClick={onChange}/>}
  </div>
);

export default StarCheckBox;
