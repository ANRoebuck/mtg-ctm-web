import axios from 'axios';

const ctmBase = process.env.REACT_APP_CTM_BASE_URL || 'http://compare-the-magic.duckdns.org';
const ctm = `${ctmBase}/api`;
const scryfall = 'https://api.scryfall.com/';

export const getSellers = () => axios
  .get(`${ctm}/prices`)
  .then(({ data }) => data.sellers.map(s => ({ ...s, logo: `${ctmBase}${s.logoUrl}` })));

export const postClickThrough = (card, seller) => axios
  .post(`${ctm}/click-through`, { card, seller })
  .catch(() => {});

export const postSearchHistory = (searchedFor) => axios
  .post(`${ctm}/search-history`, { searchedFor })
  .catch(() => {});

export const getPrices = (seller, searchTerm) => axios
  .post(`${ctm}/prices`, { seller, searchTerm })
  .then(({ data }) => data.prices)
  .catch(() => []);

export const searchCards = (searchTerm) => axios
  .get(`${scryfall}/cards/search?q=${searchTerm}`)
  .then(({ data }) => data.data);

export const getAutocompleteSuggestions = (searchTerm) => axios
  .get(`${scryfall}/cards/autocomplete?q=${searchTerm}`)
  .then(({ data }) => data.data);

export const getImgBytes = (imgUri) => axios
  .get(imgUri)
  .then(({ data }) => data);

export const getFaq = () => axios
  .get(`${ctm}/info/faq`)
  .then(({ data }) => data.faq);
