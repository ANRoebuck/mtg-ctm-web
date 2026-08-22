import React from 'react';
import './seller-option.scss';

const SellerOption = ({ seller, toggleSellerEnabled }) => {

  const { logo, name, enabled, favourite } = seller;

  return (
    <div className="seller-option" data-seller-enabled={enabled}
      data-seller-favourite={favourite} onClick={() => toggleSellerEnabled(name)}>

      <div className="logo-container" >
        <img className="logo" src={logo} alt={name} />
      </div>

    </div>
  )
};

export default SellerOption;
