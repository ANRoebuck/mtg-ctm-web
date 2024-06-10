import axionLogo from '../assets/axion 150x60.png';
// import bigOrbitLogo from '../assets/bigOrbitCards 150x60.png';
import boardsAndSwordsLogo from '../assets/boardsAndSwords 5to2.png';
// import chaosLogo from '../assets/chaosCards 150x60.png';
import diceSaloonLogo from '../assets/diceSaloonSingles 500x200.png';
import doubleSleevedLogo from '../assets/doubleSleeved 5to2.png';
import gameHQLogo from '../assets/gameHQ 250x100.png';
import gatheringPoingLogo from '../assets/gatheringPointGames 450x180.png';
// import hareruyaLogo from '../assets/hareryua 150x60.png';
import harlequinsLogo from '../assets/harlequins 150x60.png';
import highlanderGamesLogo from '../assets/highlanderGames 5to2 b.png';
// import lazyDragonLogo from '../assets/lazyDragonGaming-3 150x60.jpg';
import londonMagicLogo from '../assets/londonMagicTraders 150x60.png';
import lvlUpLogo from '../assets/lvlUp 150x60.png';
import magicCardTraderLogo from '../assets/magicCardTrader-black 150x60.png';
import magicMadhouseLogo from '../assets/magicMadhouse 150x60.png';
import manaGamingLogo from '../assets/manaGaming 150x60.png';
import manaleakLogo from '../assets/manaLeak 150x60.png';
// import mkmLogo from '../assets/mkm 150x60.png';
// import mountBattenLogo from '../assets/mountBatten 150x60.png';
// import nerdShakLogo from '../assets/nerdShak 150x60.jpg';
import pgLeedsLogo from '../assets/patriotGamesLeeds 150x60.png';
import skywardFireLogo from '../assets/skywardFire 790x316.png';
import starCityGamesLogo from '../assets/starCityGames-new 250x100.png';
import trollLogo from '../assets/trollTrader-new 600x120.png';
// import unionCountyLogo from '../assets/unionCountyGames 150x60.png';

import { currency } from './enums';


// For use during development
// If this is null, all sellers will be used.
// Otherwise, only the indicated seller will be used.
// e.g. useSingleSeller = sellers.axion;
const useSingleSeller = null;

const getSellers = () => useSingleSeller ? [useSingleSeller] : Object.values(sellers);

export const configureSellers = () => getSellers().map(configureSeller);

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


export const sellers = {
  axion: {
    name: 'Axion Now',
    logo: axionLogo,
    currency: currency.GBP,
  },
  boardsAndSwords: {
    name: 'Boards and Swords',
    logo: boardsAndSwordsLogo,
    currency: currency.GBP,
  },
  diceSaloon: {
    name: 'Dice Saloon',
    logo: diceSaloonLogo,
    currency: currency.GBP,
  },
  doubleSleeved: {
    name: 'Double Sleeved',
    logo: doubleSleevedLogo,
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
  trollTrader: {
    name: 'Troll Trader',
    logo: trollLogo,
    currency: currency.JPY,
  },

  // Non-UK

  starCityGames: {
    name: 'Star City Games',
    logo: starCityGamesLogo,
    currency: currency.USD,
  },

};
