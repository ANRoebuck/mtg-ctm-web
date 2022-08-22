import axionLogo from '../assets/axion 150x60.png';
import bigOrbitLogo from '../assets/bigOrbitCards 150x60.png';
// import chaosLogo from '../assets/chaosCards 150x60.png';
import harlequinsLogo from '../assets/harlequins 150x60.png';
import hareruyaLogo from '../assets/hareryua 150x60.png';
import lazyDragonLogo from '../assets/lazyDragonGaming-3 150x60.jpg';
import londonMagicLogo from '../assets/londonMagicTraders 150x60.png';
import lvlUpLogo from '../assets/lvlUp 150x60.png';
import magicCardTraderLogo from '../assets/magicCardTrader-black 150x60.png';
import magicMadhouseLogo from '../assets/magicMadhouse 150x60.png';
import manaleakLogo from '../assets/manaLeak 150x60.png';
// import mkmLogo from '../assets/mkm 150x60.png';
import mountBattenLogo from '../assets/mountBatten 150x60.png';
import nerdShakLogo from '../assets/nerdShak 150x60.jpg';
import pgLeedsLogo from '../assets/patriotGamesLeeds 150x60.png';
import starCityGamesLogo from '../assets/starCityGames 150x60.png';
import trollLogo from '../assets/trollTrader 150x60.png';
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
  bigOrbit: {
    name: 'Big Orbit Cards',
    logo: bigOrbitLogo,
    currency: currency.GBP,
  },
  // chaos: {
  //   name: 'Chaos Cards',
  //   logo: chaosLogo,
  //   currency: currency.GBP,
  // },
  harlequins: {
    name: 'Harlequins',
    logo: harlequinsLogo,
    currency: currency.GBP,
  },
  lazyDragon : {
    name: 'Lazy Dragon Gaming',
    logo: lazyDragonLogo,
    currency: currency.GBP,
  },
  lvlUp: {
    name: 'Lvl Up Gaming',
    logo: lvlUpLogo,
    currency: currency.GBP,
  },
  londonMagic: {
    name: 'London Magic Traders',
    logo: londonMagicLogo,
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
  manaLeak: {
    name: 'Manaleak',
    logo: manaleakLogo,
    currency: currency.GBP,
  },
  // mkm: {
  //   name: 'Magic Card Market',
  //   logo: mkmLogo,
  //   currency: currency.EUR,
  // },
  mountBatten: {
    name: 'Mountbatten Collectables',
    logo: mountBattenLogo,
    currency: currency.GBP,
  },
  nerdShak: {
    name: 'Nerd Shak',
    logo: nerdShakLogo,
    currency: currency.GBP,
  },
  pgLeeds: {
    name: 'Patriot Games Leeds',
    logo: pgLeedsLogo,
    currency: currency.GBP,
  },
  trollTrader: {
    name: 'Troll Trader',
    logo: trollLogo,
    currency: currency.JPY,
  },
  // unionCounty: {
  //   name: 'Union County Games',
  //   logo: unionCountyLogo,
  //   currency: currency.GBP,
  // },

  // Non-UK

  hareruya: {
    name: 'Hareruya',
    logo: hareruyaLogo,
    currency: currency.GBP,
  },
  starCityGames: {
    name: 'Star City Games',
    logo: starCityGamesLogo,
    currency: currency.USD,
  },

};
