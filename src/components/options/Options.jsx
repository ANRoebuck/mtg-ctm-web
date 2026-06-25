import React from 'react';
import './options.scss';
import SearchOptions from './SearchOptions';
import SellerOption from './SellerOption';
import { filterFoilsOptions, sortPriceOptions } from '../../utils/enums';
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';


// Returns distinct regions sorted with UK first, then alphabetically.
const regions = (sellers) => {
    const all = [...new Set(sellers.map(s => s.region))];
    return all.sort((a, b) => a === 'UK' ? -1 : b === 'UK' ? 1 : a.localeCompare(b));
};

const Options = observer(() => (
    <>
        <div className="section-heading">
            Display Options
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
            Select stores to include/exclude from results
        </div>

        {regions(pricesStore.sellers).map(region => {
            const regionSellers = pricesStore.sellers.filter(s => s.region === region);
            const allEnabled = regionSellers.every(s => s.enabled);
            const anyEnabled = regionSellers.some(s => s.enabled);
            return (
                <div key={region} className="seller-region">
                    <div className="sellers">
                        <button
                            className="seller-region__toggle"
                            data-state={allEnabled ? 'all' : anyEnabled ? 'some' : 'none'}
                            onClick={() => pricesStore.toggleRegionEnabled(region)}
                        >
                            {region}
                        </button>
                        {regionSellers.map(seller =>
                            <SellerOption key={'seller-option-' + seller.name}
                                          seller={seller}
                                          toggleSellerEnabled={pricesStore.toggleSellerEnabled} />)}
                    </div>
                </div>
            );
        })}
    </>
));

export default Options;