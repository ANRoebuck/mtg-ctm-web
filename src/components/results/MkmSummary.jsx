import React, { useEffect, useState } from "react";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { sellers } from "../../utils/enums";


const MkmSummary = ({mkmLoading, mkmResults}) => {

  const [selectedIndex, setSelectedInext] = useState(0);
  useEffect(() => {
    setSelectedInext(0)
  }, [mkmResults]);

  const incrementSelectedIndex = (x) => setSelectedInext(n => {
    const newIndex = n + x;
    if (newIndex < 0) return mkmResults.length - 1;
    if (newIndex > mkmResults.length - 1) return 0;
    return newIndex;
  });

  const loadingView = () => {
    return (
      <div className="mkm-result" >
        <img className="seller-logo" src={sellers.mkm.logo}/>
        <div className="card-image">Loading...</div>
      </div>
    );
  }

  const anMkmResult = (result) => {
    const {title, from, trend, expansion, imgSrc} = result;

    return (
      <div className="mkm-result">
          <img className="seller-logo" src={sellers.mkm.logo}/>

          <button className="button-left"
                  onClick={() => incrementSelectedIndex(-1)}
                  disabled={mkmResults.length < 2}>{`<`}</button>

          <img className="card-image" src={imgSrc}/>
          <div className="card-name">{`${title}`}</div>
          <div className="expansion">{`${expansion}`}</div>
          <div className="price-from">{`From: ${from.text}`}</div>
          <div className="price-trend">{`Trend: ${trend.text}`}</div>

          <button className="button-right"
                  onClick={() => incrementSelectedIndex(1)}
                  disabled={mkmResults.length < 2}>{`>`}</button>

      </div>
    );

  }

  return (
    <div className="mkm-summary">
      {mkmLoading
        ? loadingView()
        : mkmResults.map(r => anMkmResult(r))[selectedIndex]}
    </div>
  )

}

export default MkmSummary;
