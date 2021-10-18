import { identityFunction, nullifyingFunction, regex } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelMagicMadhouse extends AbstractModel {

  constructor() {
    super({
      name: seller.magicMadhouse.name,
      logo: seller.magicMadhouse.logo,
      baseUrl: 'https://eucs25.ksearchnet.com/',
      searchPath: 'cloud-search/n-search/search?ticket=klevu-161710301480613427&term=',
      searchSuffix: '&paginationStartsFrom=0&sortPrice=false&ipAddress=undefined&analyticsApiKey=klevu-161710301480613427&showOutOfStockProducts=true&klevuFetchPopularTerms=false&klevu_priceInterval=500&fetchMinMaxPrice=true&klevu_multiSelectFilters=true&noOfResults=36&klevuSort=rel&enableFilters=true&filterResults=&visibility=search&category=KLEVU_PRODUCT&klevu_filterLimit=400&sv=121&lsqt=&responseType=json&priceFieldSuffix=GBP&klevu_loginCustomerGroup=',
      searchJoin: '%20',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: (text) => text ? parseInt(text.replace(/[£.]/g, ``)) : 9999,
    });
  }

  // @Override
  allResults = async (searchTerm) =>
    this.getHtml(searchTerm)
      .then(({ data }) => {
        return data.result || [];
      });

  // @Override
  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div > div > div.product__details > div.product__details__title > a')
      .forEach(node => {
        node.firstChild.remove();
        node.firstChild.remove();
        let str = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  // @Override
  nameFromResultNode = (resultNode) => resultNode.name.split('|')[0];
  priceFromResultNode = ({ price }) => {
    return {
      text: "£ " + this.priceToDisplayFromPriceText(price),
      value: this.priceValueFromPriceText(price),
    };
  };
  stockFromResultNode = ({ inventory_level }) => {
    const value = parseInt(inventory_level);
    return {
      value,
      text: value + ' in Stock',
    };
  }
  imgSrcFromResultNode = (resultNode) => resultNode.image;
  productRefFromResultNode = (resultNode) => resultNode.url;
  expansionFromResultNode = (resultNode) => resultNode.magic_set;

  }

export default ModelMagicMadhouse;
