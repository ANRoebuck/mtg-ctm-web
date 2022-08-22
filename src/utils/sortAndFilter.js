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

export const samePrice = (a, b) =>
    a.seller === b.seller &&
    a.title === b.title &&
    a.subtitle === b.subtitle &&
    a.expansion === b.expansion;