import axios from 'axios';


const scryfall = 'https://api.scryfall.com/';

export const searchCards = (searchTerm) => axios
  .get(`${scryfall}/cards/search?q=${searchTerm}`)
  .then(({data}) => data);
