import React from 'react';
import { observer } from 'mobx-react';
import { pricesStore } from '../store/PricesStore';
import SearchResult from './SearchResult';


export const ResultsView = observer(() =>
    <PricesView prices={pricesStore.sortedPrices}>
        {/*<div className="mkm-container">*/}
        {/*  {lastSearched && <MkmSummary mkmLoading={mkmLoading} mkmResults={discoveredMKM}/>}*/}
        {/*</div>*/}
    </PricesView>
);

export const BookmarksView = observer(() =>      
    <PricesView prices={pricesStore.sortedBookmarks}>
        {/* <ResultsBySeller results={Object.values(savedPrices)}/> */}
    </PricesView>
);


const PricesView = ({ prices, children }) => {
    return (
        <div className="search-results">
            {children}
            {prices.map((p, i) => <SearchResult result={p} key={'search-result-'+i}/>)}
        </div>
    )
};