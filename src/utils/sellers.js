import axionLogo from '../assets/axion 150x60.png';
import boardsAndSwordsLogo from '../assets/boardsAndSwords 5to2.png';
import diceSaloonLogo from '../assets/diceSaloonSingles 500x200.png';
import gameHQLogo from '../assets/gameHQ 250x100.png';
import gatheringPoingLogo from '../assets/gatheringPointGames 450x180.png';
import harlequinsLogo from '../assets/harlequins 150x60.png';
import highlanderGamesLogo from '../assets/highlanderGames 5to2 b.png';
import londonMagicLogo from '../assets/londonMagicTraders 150x60.png';
import lvlUpLogo from '../assets/lvlUp 150x60.png';
import magicCardTraderLogo from '../assets/magicCardTrader-black 150x60.png';
import magicMadhouseLogo from '../assets/magicMadhouse 150x60.png';
import manaGamingLogo from '../assets/manaGaming 150x60.png';
import manaleakLogo from '../assets/manaLeak 150x60.png';
import pgLeedsLogo from '../assets/patriotGamesLeeds 150x60.png';
import skywardFireLogo from '../assets/skywardFire 580x232.png';
import starCityGamesLogo from '../assets/starCityGames-new 250x100.png';
import totalCardsLogo from '../assets/totalCards 500x200.png';
import trollLogo from '../assets/trollTrader-new 600x240.png';

import { currency } from './enums';


// For use during development
// If this is null, all sellers will be used.
// Otherwise, only the indicated seller will be used.
// e.g. useSingleSeller = sellers.axion;
const useSingleSeller = null;

export const sellers = {
  axion: {
    name: 'Axion Now',
    logo: axionLogo,
    currency: currency.GBP,
  },
  boardsAndSwords: {
    name: 'Boards & Swords',
    logo: boardsAndSwordsLogo,
    currency: currency.GBP,
  },
  diceSaloon: {
    name: 'Dice Saloon',
    logo: diceSaloonLogo,
    currency: currency.GBP,
  },
  gameHQ: {
    name: 'Game HQ',
    logo: gameHQLogo,
    currency: currency.GBP,
  },
  gatheringPoint: {
    name: 'Gathering Point Games',
    logo: gatheringPoingLogo,
    currency: currency.GBP,
  },
  harlequins: {
    name: 'Harlequins',
    logo: harlequinsLogo,
    currency: currency.GBP,
  },
  highlanderGames: {
    name: 'Highlander Games',
    logo: highlanderGamesLogo,
    currency: currency.GBP,
  },
  londonMagic: {
    name: 'London Magic Traders',
    logo: londonMagicLogo,
    currency: currency.GBP,
  },
  lvlUp: {
    name: 'Lvl Up Gaming',
    logo: lvlUpLogo,
    currency: currency.GBP,
  },
  magicCardTrader: {
    name: 'Magic Card Trader',
    logo: magicCardTraderLogo,
    currency: currency.GBP,
  },
  magicMadhouse: {
    name: 'Magic Madhouse',
    logo: magicMadhouseLogo,
    currency: currency.GBP,
  },
  manaGaming: {
    name: 'Mana Gaming',
    logo: manaGamingLogo,
    currency: currency.GBP,
  },
  manaLeak: {
    name: 'Manaleak',
    logo: manaleakLogo,
    currency: currency.GBP,
  },
  pgLeeds: {
    name: 'Patriot Games Leeds',
    logo: pgLeedsLogo,
    currency: currency.GBP,
  },
  skywardFire: {
    name: 'Skyward Fire',
    logo: skywardFireLogo,
    currency: currency.GBP,
  },
  totalCards: {
    name: 'Total Cards',
    logo: totalCardsLogo,
    currency: currency.GBP,
  },
  trollTrader: {
    name: 'Troll Trader',
    logo: trollLogo,
    currency: currency.GBP,
  },

  // Non-UK

  starCityGames: {
    name: 'Star City Games',
    logo: starCityGamesLogo,
    currency: currency.USD,
  },

};

const getSellers = () => useSingleSeller ? [useSingleSeller] : Object.values(sellers);

const configureSeller = ({ name, logo, currency }) => {
  return {
    name,
    logo,
    currency,
    enabled: true,
    loading: false,
    favourite: false,
  };
}

export const configureSellers = () => getSellers().map(configureSeller);
