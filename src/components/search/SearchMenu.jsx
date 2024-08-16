import React from 'react';
import './search-menu.scss';
import AutoSuggestSearchBar from './AutoSuggestSearchBar';
import ResultsSummary from '../results/ResultsSummary';
import LoadingDoughnut from './LoadingDoughnut';
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';


const SearchMenu = observer(({ snapToResults }) => {

  const finishedLoading = pricesStore.sellersLoadingCount === 0;

  return (

      <div className="search-menu">
        <AutoSuggestSearchBar snapToResults={snapToResults} />

        {finishedLoading ?
          <ResultsSummary resultsFound={pricesStore.sortedPrices.length} cheapest={pricesStore.cheapestPrice} />
        : <LoadingDoughnut total={pricesStore.activeSellers.length} loading={pricesStore.sellersLoadingCount}/>}
      </div>

  );
});

export default SearchMenu;
