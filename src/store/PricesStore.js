
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { filterFoilsOptions, sortPriceOptions } from '../utils/enums';
import { maybeFilterFoils, samePrice, sortByPrice, sortBySeller, sortPriceAscending } from '../utils/sortAndFilter';
import { configureSellers } from '../utils/sellers';

const dummyPrices = [
    {
        seller: 'Axion Now',
        title: 'Rekindling Phoenix - Foil - Prerelease Promo',
        imgSrc: 'https://crystal-cdn4.crystalcommerce.com/photos/6422572/medium/RekindlingPhoenixpromo.jpg',
        productRef:
            'https://www.axionnow.com//catalog/magic_singles-promo_cards-promos_prerelease/rekindling_phoenix__foil__prerelease_promo/1491943',
        expansion: 'Promos: Prerelease',
        price_relativeUnits: 784,
        price_textRepresentation: '£7.84',
        stock_inStock: true,
        stock_level: '1',
        subtitle: '',
        isFoil: true
    },
    {
        seller: 'Axion Now',
        title: 'Rekindling Phoenix',
        imgSrc: 'https://crystal-cdn3.crystalcommerce.com/photos/6421887/medium/155691_200w.jpg',
        productRef:
            'https://www.axionnow.com//catalog/magic_singles-ixalan_block-rivals_of_ixalan/rekindling_phoenix/1465773',
        expansion: 'Rivals of Ixalan',
        price_relativeUnits: 266,
        price_textRepresentation: '£2.66',
        stock_inStock: true,
        stock_level: '4',
        subtitle: '',
        isFoil: false
    },
    {
        seller: 'Magic Madhouse',
        title: 'Tarmogoyf',
        imgSrc: 'https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412836/images/528012/1614956320-35642800__74766.1649690281.386.513.jpg?c=1',
        productRef:
            'https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-time-spiral-remastered?sku=ETSR-3235M',
        expansion: 'Time Spiral Remastered',
        price_relativeUnits: 2499,
        price_textRepresentation: '£24.99',
        stock_inStock: true,
        stock_level: '1',
        subtitle: '',
        isFoil: false
    },
    {
        seller: 'Magic Madhouse',
        title: 'Tarmogoyf',
        imgSrc: 'https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412832/images/633708/1422444276-95411900__64057.1656637362.386.513.jpg?c=1',
        productRef:
            'https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-future-sight?sku=EFUT-3153R',
        expansion: 'Future Sight',
        price_relativeUnits: 4999,
        price_textRepresentation: '£49.99',
        stock_inStock: true,
        stock_level: '6',
        subtitle: '',
        isFoil: false
    },
    {
        seller: 'Axion Now',
        title: 'Fire // Ice',
        imgSrc: 'https://crystal-cdn4.crystalcommerce.com/photos/6483827/medium/fireice_ultm.png',
        productRef:
            'https://www.axionnow.com//catalog/magic_singles-masters_sets-ultimate_masters/fire__ice/1547575',
        expansion: 'Ultimate Masters',
        price_relativeUnits: 24,
        price_textRepresentation: '£0.24',
        stock_inStock: true,
        stock_level: '1',
        subtitle: '',
        isFoil: false
    }
];



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
        }).then(() => console.log('hydrated store'));
    }

    get activeSellers() {
        return this.sellers.filter((s) => s.enabled);
    }

    get sortedPrices() {
        return this.discoveredPrices
            .slice()
            .filter(({ seller }) => this.isActiveSeller(seller))
            .filter(maybeFilterFoils(this.filterFoilsBy))
            .sort(sortByPrice(this.sortPriceBy));
            // .sort(sortFavouriteFirst)
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

    setSellerAsFavourite = (sellerName) => null;

    toggleSellerEnabled = (sellerName) => {
        this.sellers = this.sellers.map((s) => {
            let { enabled, name } = s;
            if (name === sellerName) enabled = !enabled;
            return {
                ...s,
                enabled
            };
        });
    };

    setSellerLoading = (sellerName, setLoading) => {
        this.sellers = this.sellers.map((s) => {
            let { name, loading } = s;
            if (name === sellerName) loading = setLoading;
            return {
                ...s,
                loading
            };
        });
    };

    get sellersLoading() { return this.sellers.filter(({ loading }) => loading).length; }
}

export const pricesStore = new PricesStore();