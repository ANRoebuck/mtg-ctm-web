import React from 'react';
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';
import Result from './Result';
import DefaultView from './DefaultView';


export const ResultsView = observer(() => {
    if (pricesStore.sortedPrices.length === 0) {
        // results were just cleared for a new search after we've already shown results
        // once this session - skip the default view so its wheel-fly-up animation doesn't replay
        if (pricesStore.isSearching && pricesStore.hasShownResults) return null;
        return <DefaultView />;
    }

    return (
        <PricesView prices={pricesStore.sortedPrices}>
            {/*<div className="mkm-container">*/}
            {/*  {lastSearched && <MkmSummary mkmLoading={mkmLoading} mkmResults={discoveredMKM}/>}*/}
            {/*</div>*/}
        </PricesView>
    );
});

export const BookmarksView = observer(() =>      
    <PricesView prices={pricesStore.sortedBookmarks}>
        {/* <ResultsBySeller results={Object.values(savedPrices)}/> */}
    </PricesView>
);


const PricesView = ({ prices, children }) => {
    return (
        <div className="search-results">
            {children}
            {prices.map((p) => <Result result={p} key={p.seller + '-' + p.productRef}/>)}
        </div>
    )
};