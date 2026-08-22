import React from 'react';
import './search-menu.scss';
import AutoSuggestSearchBar from './AutoSuggestSearchBar';
import ResultsSummary from '../results/ResultsSummary';
import ChadMagicOrbit from '../ChadMagicOrbit';
import MultiCardSearch from './MultiCardSearch';
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';


const SearchMenu = observer(({ snapToResults }) => {

  const finishedLoading = !pricesStore.isSearching;

  return (

      <div className="search-menu">
        <AutoSuggestSearchBar snapToResults={snapToResults}>
          <MultiCardSearch snapToResults={snapToResults} disabled={pricesStore.isSearching} />
        </AutoSuggestSearchBar>

        {finishedLoading ?
          <ResultsSummary resultsFound={pricesStore.sortedPrices.length} cheapest={pricesStore.cheapestPrice} />
        : <div className="loading-doughnut"><ChadMagicOrbit size={80} fast /></div>}
      </div>

  );
});

export default SearchMenu;
