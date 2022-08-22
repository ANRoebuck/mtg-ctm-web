
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { filterFoilsOptions, sortPriceOptions } from '../utils/enums';
import { maybeFilterFoils, samePrice, sortByPrice, sortBySeller, sortFavouriteFirst, sortPriceAscending } from '../utils/sortAndFilter';
import { configureSellers } from '../utils/sellers';


class PricesStore {

    sellers = configureSellers();
    discoveredPrices = [];
    bookmarkedPrices = [];
    sortPriceBy = sortPriceOptions.asc;
    filterFoilsBy = filterFoilsOptions.all;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: 'ctmPricesStore',
            properties: [
                'sellers',
                'bookmarkedPrices',
                'sortPriceBy',
                'filterFoilsBy'
            ],
            storage: localStorage
        });
    }

    get activeSellers() {
        return this.sellers.filter((s) => s.enabled);
    }

    get sortedPrices() {
        return this.discoveredPrices
            .slice()
            .filter(({ seller }) => this.isActiveSeller(seller))
            .filter(maybeFilterFoils(this.filterFoilsBy))
            .sort(sortByPrice(this.sortPriceBy))
            .sort(sortFavouriteFirst(this.favouriteSeller()?.name));
    }

    get cheapestPrice() {
        return this.discoveredPrices
            .slice()
            .filter(({ seller }) => this.isActiveSeller(seller))
            .filter(maybeFilterFoils(this.filterFoilsBy))
            .sort(sortPriceAscending)
            [0];
    }

    get sortedBookmarks() {
        return this.bookmarkedPrices
            .slice()
            .sort(sortByPrice(this.sortPriceBy))
            .sort(sortBySeller);
    }

    isActiveSeller = (seller) => this.sellers.find(({ name }) => name === seller)?.enabled;

    logoForSeller = (seller) => this.sellers.find(({ name }) => name === seller)?.logo;

    favouriteSeller = () => this.sellers.find(({ favourite }) => favourite);

    clearResults = () => this.discoveredPrices = [];

    addPrices = (pricesToAdd) => this.discoveredPrices = [...this.discoveredPrices, ...pricesToAdd];

    addBookmark = (bookmarkToAdd) => this.bookmarkedPrices = [...this.bookmarkedPrices, bookmarkToAdd];

    deleteBookmark = (bookmarkToDelete) => {
        const updatedBookmarks = this.bookmarkedPrices.filter(
            (p) => !samePrice(p, bookmarkToDelete)
        );
        this.bookmarkedPrices = updatedBookmarks;
    };

    isBookmarked = (maybeBookmarked) => this.bookmarkedPrices.some((b) => samePrice(b, maybeBookmarked));

    setSortPriceBy = (sortBy) => this.sortPriceBy = sortBy;

    setFilterFoilsBy = (filterBy) => this.filterFoilsBy = filterBy;

    toggleSellerEnabled = (sellerName) => {
        this.sellers = this.sellers.map((s) => {
            let { enabled, name } = s;
            if (name === sellerName) enabled = !enabled;
            return {
                ...s,
                enabled,
            };
        });
    };

    setSellerAsFavourite = (sellerName) => {
        this.sellers = this.sellers.map((s) => {
            // toggles target seller AND sets all others to false
            const favourite = s.name === sellerName ? !s.favourite : false;
            if (favourite) console.log('setting favourite ' + sellerName);
            return {
                ...s,
                favourite,
            };
        });
    };

    setSellerLoading = (sellerName, setLoading) => {
        this.sellers = this.sellers.map((s) => {
            let { name, loading } = s;
            if (name === sellerName) loading = setLoading;
            return {
                ...s,
                loading,
            };
        });
    };

    get sellersLoading() { return this.sellers.filter(({ loading }) => loading).length; }
}

export const pricesStore = new PricesStore();