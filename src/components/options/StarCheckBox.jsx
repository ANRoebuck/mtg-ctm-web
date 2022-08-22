import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const StarCheckBox = ({ option, checked, onChange }) => {

  const icon = () => {
    return checked
      ? <StarIcon  onClick={onChange}/>
      : <StarBorderIcon onClick={onChange}/>
  }

  return (
    <div className="radio">
      {icon()}
    </div>
  )
};

export default StarCheckBox;
