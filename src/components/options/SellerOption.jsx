import React from 'react';
import '../../styles/options/seller-option.scss';

const SellerOption = ({ seller, toggleSellerEnabled }) => {

  const { logo, name, enabled, favourite } = seller;

  return (
    <div className="seller-options" data-seller-enabled={enabled} data-seller-favourite={favourite}>

      <div className="logo-container" onClick={() => toggleSellerEnabled(name)}>
        <img className="logo" src={logo} alt={name} />
      </div>

    </div>
  )
};

export default SellerOption;
