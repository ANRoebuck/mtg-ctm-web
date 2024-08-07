import React from 'react';
import '../../styles/results/result.scss';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FoilStar from "./FoilStar";
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';


const Result = observer(({ result }) => {

  const { seller, title, imgSrc, productRef, expansion, price_textRepresentation, subtitle, isFoil } = result;

  return (
    <div className="discovered-price">

      <img className="logo" src={pricesStore.logoForSeller(seller)} alt={seller}/>

      {isFoil ? <FoilStar/> : null}

      <div className="name">{`${title}${subtitle ? ' - ' + subtitle : ''}`}</div>

      <div className="expansion">{expansion}</div>

      <div className="discovered-price-img-container">
        <img className="discovered-price-img" src={imgSrc} alt={seller}/>
      </div>

      <div className="price">{price_textRepresentation}</div>

      <div className="widgets">
        <div className="bookmark">
          {pricesStore.isBookmarked(result)
            ? <BookmarkIcon onClick={() => pricesStore.deleteBookmark(result)} />
            : <BookmarkBorderIcon onClick={() => pricesStore.addBookmark(result)} />}
        </div>

        <div className="product-link">
          <ShoppingCartIcon onClick={() => window.open(productRef, "_blank")}/>
        </div>
      </div>

    </div>
  )
});

export default Result;
