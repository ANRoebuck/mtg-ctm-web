import React from 'react';
import '../../styles/options/options.scss';
import SearchOptions from './SearchOptions';
import SellerOption from './SellerOption';
import { filterFoilsOptions, sortPriceOptions } from '../../utils/enums';
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';


const Options = observer(() => (
    <>
        <div className="section-heading">
            Sort and Filter
        </div>
        <div className="options">
            <SearchOptions  title={"Price"}
                            options={Object.values(sortPriceOptions)}
                            selectedOption={pricesStore.sortPriceBy}
                            setSelectedOption={pricesStore.setSortPriceBy} />
            <SearchOptions  title={"Foils"}
                            options={Object.values(filterFoilsOptions)}
                            selectedOption={pricesStore.filterFoilsBy}
                            setSelectedOption={pricesStore.setFilterFoilsBy} />
        </div>

        <div className="section-heading">
            Sellers
        </div>
        <div className="sellers">
            {pricesStore.sellers.map((seller, i) =>
                <SellerOption   seller={seller} key={'seller-option-'+i}
                                toggleSellerEnabled={pricesStore.toggleSellerEnabled}
                                assignFavourite={pricesStore.setSellerAsFavourite} />)}
        </div>
    </>
));

export default Options;