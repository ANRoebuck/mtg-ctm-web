
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { filterFoilsOptions, sortPriceOptions } from '../utils/enums';
import { maybeFilterFoils, samePrice, sortByPrice, sortBySeller, sortFavouriteFirst, sortPriceAscending } from '../utils/sortAndFilter';
import { configureSellers } from '../utils/sellers';


class PricesStore {

    sellers = [];
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

        // must be run on app launch to ensure up to date sellers are shown along with any logo changes
        // use delay to aviod race condition with restoring persisted data
        setTimeout(() => {
            this.updateSellerInfo();
        }, (100));
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

    deleteBookmark = (bookmarkToDelete) => this.bookmarkedPrices = this.bookmarkedPrices.filter((p) => !samePrice(p, bookmarkToDelete));

    isBookmarked = (maybeBookmarked) => this.bookmarkedPrices.some((b) => samePrice(b, maybeBookmarked));

    setSortPriceBy = (sortBy) => this.sortPriceBy = sortBy;

    setFilterFoilsBy = (filterBy) => this.filterFoilsBy = filterBy;

    toggleSellerEnabled = (targetSellerName) => {
        this.sellers = this.sellers.map((s) => {
            let { enabled, name } = s;
            if (name === targetSellerName) enabled = !enabled;
            return {
                ...s,
                enabled,
            };
        });
    };

    setSellerAsFavourite = (targetSellerName) => {
        this.sellers = this.sellers.map((s) => {
            // toggles target seller AND sets all others to false
            const favourite = s.name === targetSellerName ? !s.favourite : false;
            if (favourite) console.log('setting favourite ' + targetSellerName);
            return {
                ...s,
                favourite,
            };
        });
    };

    setSellerLoading = (targetSellerName, setLoading) => {
        this.sellers = this.sellers.map((s) => {
            let { name, loading } = s;
            if (name === targetSellerName) loading = setLoading;
            return {
                ...s,
                loading,
            };
        });
    };

    get sellersLoadingCount() { return this.sellers.filter(({ loading }) => loading).length; }

    findSellerFromName = (targetSellerName) => this.sellers.find(({ name }) => name === targetSellerName);

    updateSellerInfo = () => {
        console.log('Updating seller info');

        let updatedSellerInfo = [];
        const newSellerInfo = configureSellers();
        
        const findNewInfo = (targetSellerName) => newSellerInfo.find(({ name }) => name === targetSellerName);

        // remove deleted sellers
        // remove bookmarks for deleted sellers
        updatedSellerInfo = this.sellers.filter(({ name }) => {
            // check if old seller still exists in new seller info
            const updatedSeller = findNewInfo(name);

            // keep seller if still exists in new info
            if (updatedSeller) return true;

            // else discard seller AND delete all bookmarks for it
            this.bookmarkedPrices = this.bookmarkedPrices.filter(( {seller }) => seller !== name);
            return false;
        });

        // update existing sellers
        updatedSellerInfo = updatedSellerInfo.map(s => {
            // take logo from new seller object and overwrite
            const { logo } = findNewInfo(s.name);
            return {
                ...s,
                logo,
            };
        });

        // add new sellers
        newSellerInfo.forEach(s => {
            if (!this.findSellerFromName(s.name)) { 
                updatedSellerInfo = updatedSellerInfo.concat(s);
            }
        });

        // sort selers alphabetically
        updatedSellerInfo.sort((a, b) => a.name.localeCompare(b.name));

        // set updated sellers
        this.sellers = updatedSellerInfo;
    }

}

export const pricesStore = new PricesStore();