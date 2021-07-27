import axios from 'axios';
import { cors, regex } from '../utils/utils';
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
    });
  }

  search = async (searchTerm) => {

    const cachedResults = this.readCachedResults(this.name, searchTerm);
    if (cachedResults) return cachedResults;

    const foundItems = [];
    const resultNodes = await this.allResults(searchTerm);

    resultNodes.forEach(resultNode => {

      let name = this.name;
      let logo = this.logo;
      let title = this.nameFromResultNode(resultNode);
      let price = this.priceFromResultNode(resultNode);
      let stock = this.stockFromResultNode(resultNode);
      let imgSrc = this.imgSrcFromResultNode(resultNode);
      let productRef = this.productRefFromResultNode(resultNode);
      let expansion = this.expansionFromResultNode(resultNode);
      let isFoil = this.isFoilFromTitle(title);

      foundItems.push({
        name,
        logo,
        title,
        price,
        stock,
        imgSrc,
        productRef,
        expansion,
        isFoil,
      });

    });

    this.cacheResults(this.name, searchTerm, foundItems);

    return foundItems;
  }

  getHtml = (searchTerm) => axios.get(this.searchTermToUrl(searchTerm)).catch(() => []);

  searchTermToUrl = searchTerm => cors + this.baseUrl + this.searchPath
    + searchTerm.toLowerCase().split(' ').join('+');

  allResults = async (searchTerm) => {
    return this.getHtml(searchTerm)
      .then(({data: html}) => {
        const document = this.parser.parseFromString(html, "text/html");
        return document.querySelectorAll('ul.products > li.product')
      });
  }

  nameFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.meta > a > h4')
      .forEach(node => {
        let str = node.innerHTML.replace(regex.whiteSpaceStripper, `$2`);
        arr.push(str);
      });
    return arr[0];
  }

  priceFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.meta > div > div > span.variant-buttons > form > div > span.regular')
      .forEach(node => {
        const text = node.innerHTML;
        arr.push({
          text,
          value: this.priceValueFromPriceText(text),
        });
      });
    arr.push({text: '', value: 9999});
    return arr[0];
  }
  priceValueFromPriceText = (text) => text ? parseInt(text.replace(/[£.]/g, ``)) : 9999;

  stockFromResultNode = (resultNode) => {
    let arr =[];
    resultNode.querySelectorAll('div.inner > div > div.meta > div > div > span.variant-main-info > span.variant-qty')
      .forEach(node => {
        const text = node.innerHTML;
        arr.push({
          text,
          value: this.stockValueFromStockText(text),
        });
      });
    arr.push({text: 'Out of Stock', value: 0});
    return arr[0];
  }
  stockValueFromStockText = (text) => text === 'Out of stock.' ? 0 : parseInt(text.replace(/([0-9]*)([^0-9]*)/, `$1`));

  imgSrcFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.image > a > img')
      .forEach(node => {
        arr.push(node.getAttribute('src'));
      });
    return arr[0];
  }

  productRefFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.image > a')
      .forEach(node => {
        arr.push(this.baseUrl + node.getAttribute('href'));
      });
    return arr[0];
  }

  expansionFromResultNode = (resultNode) => {
    let arr = [];
    resultNode.querySelectorAll('div.inner > div > div.meta > a > span.category')
      .forEach(node => {
        arr.push(node.innerHTML);
      });
    return arr[0];
  }

}

export default ModelAxion;
