import { filterFoilsOptions, sortPriceOptions } from "./enums";


export const sortBySeller = (a, b) => a.seller.localeCompare(b.seller);


export const sortPriceAscending = (a, b) => a.price_relativeUnits - b.price_relativeUnits;
export const sortPriceDescending = (a, b) => b.price_relativeUnits - a.price_relativeUnits;
export const sortByPrice = (sortBy) => sortBy === sortPriceOptions.asc ? sortPriceAscending : sortPriceDescending;


const filterFoilOnly = (p) => p.isFoil;
const filterNonFoilOnly = (p) => !p.isFoil;
export const maybeFilterFoils = (filterBy) => {
    switch (filterBy) {
        case filterFoilsOptions.foil:
            return filterFoilOnly;
        case filterFoilsOptions.nonFoil:
            return filterNonFoilOnly;
        default:
            return () => true;
    }
};


export const sortFavouriteFirst = favouriteSeller => (a, b) => {
    if (a.seller === b.seller) return 0;
    else if (a.seller === favouriteSeller) return -1;
    else if (b.seller === favouriteSeller) return 1;
    else return 0;
}


// derived rather than stored, so bookmarks persisted before this existed still work
export const priceId = ({ seller, productRef, isFoil }) => `${seller}|${productRef}|${Boolean(isFoil)}`;

export const samePrice = (a, b) => priceId(a) === priceId(b);
