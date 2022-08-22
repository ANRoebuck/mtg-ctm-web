import React from 'react';
import './seller-option.scss';
import CheckBox from './CheckBox';
import StarCheckBox from './StarCheckBox';

const SellerOption = ({ seller, toggleSellerEnabled, assignFavourite }) => {

  const { loading, logo, name, enabled, favourite } = seller;

  return (
    <div className="seller-options" data-seller-enabled={enabled} data-seller-favourite={favourite}>
      <div className="logo-container">
        {loading
          ? <div className="loading">Loading...</div>
          : <img className="logo" src={logo} alt={name} />}
      </div>
      <div className="widgets">
        <CheckBox checked={enabled} onChange={() => toggleSellerEnabled()}/>
        <StarCheckBox checked={favourite} onChange={() => assignFavourite(seller)}/>
      </div>
    </div>
  )
};

export default SellerOption;
