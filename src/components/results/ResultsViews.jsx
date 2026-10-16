import React from 'react';
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';
import Result from './Result';
import DefaultView from './DefaultView';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { priceId } from '../../utils/sortAndFilter';
import { downloadCsv, pricesToCsv } from '../../utils/exportCsv';


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

const downloadBookmarks = () => {
    const date = new Date().toISOString().slice(0, 10);
    downloadCsv(`ctm-bookmarks-${date}.csv`, pricesToCsv(pricesStore.sortedBookmarks));
};

export const BookmarksView = observer(() =>
    <PricesView prices={pricesStore.sortedBookmarks}>
        {pricesStore.sortedBookmarks.length > 0 && (
            <div className="bookmarks-toolbar">
                <span className="bookmarks-total">
                    {pricesStore.sortedBookmarks.length} bookmarked {pricesStore.sortedBookmarks.length === 1 ? 'item' : 'items'}
                </span>
                <Button variant="contained" startIcon={<GetAppIcon />} onClick={downloadBookmarks}>
                    Download as CSV
                </Button>
            </div>
        )}
    </PricesView>
);


const PricesView = ({ prices, children }) => {
    return (
        <div className="search-results">
            {children}
            {prices.map((p) => <Result result={p} key={priceId(p)}/>)}
        </div>
    )
};