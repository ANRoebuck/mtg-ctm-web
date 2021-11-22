import { identityFunction, textToDigits } from '../utils/utils';
import { seller } from '../utils/enums';
import AbstractModel from './AbstractModel';

class ModelAxion extends AbstractModel {

  constructor() {
    super({
      name: seller.axion.name,
      logo: seller.axion.logo,
      baseUrl: 'https://www.axionnow.com/',
      searchPath: 'products/search?q=',
      searchSuffix: '',
      searchJoin: '+',
      resultSelector: 'ul.products > li.product',
      nameSelector: 'div.inner > div > div.meta > a > h4',
      priceSelector: 'div.inner > div > div.meta > div > div > span.variant-buttons > form > div > span.regular',
      priceToDisplayFromPriceText: identityFunction,
      priceValueFromPriceText: textToDigits,
      stockSelector: 'div.inner > div > div.meta > div > div > span.variant-main-info > span.variant-qty',
      stockValueFromStockText: (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`)),
      isFoilSelector: 'div.inner > div > div.meta > a > h4',
      imgSelector: 'div.inner > div > div.image > a > img',
      imgBaseUrl: '',
      imgSrcAttribute: 'src',
      productSelector: 'div.inner > div > div.image > a',
      productBaseUrl: 'https://www.axionnow.com/',
      productRefAttribute: 'href',
      expansionSelector: 'div.inner > div > div.meta > a > span.category',
    });
  }

}

export default ModelAxion;
