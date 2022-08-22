import React, { useEffect, useState } from 'react';
import AutoSuggestSearchBar from './AutoSuggestSearchBar';
import ResultsSummary from './ResultsSummary';
import LoadingDoughnut from './LoadingDoughnut';


const SearchMenu = () => {

  return (

      <div className="compare-prices-menu">
        <AutoSuggestSearchBar />

        {/* {finishedLoading ?
          <ResultsSummary sortedResults={pricesStore.sortedPrices.sort(sortPriceAscending)} />
        : <LoadingDoughnut loaded={numberEnabled - numberLoading} total={numberEnabled}/>} */}
      </div>

  );
};

export default SearchMenu;
