import { Router } from '../../../router/router';
import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import { ProductAPI } from '../../../../api/product-api/product-api';
import { Image, Attributes } from '../../../../api/product-api/product-api-types';

const CssClasses = {
  SECTION: 'product',
  TITLE: 'product__title',
  TOP: 'product__top',
  SLIDER: ['product__slider', 'slider'],
  SLIDER_NAV: 'slider__nav',
  SLIDER_ITEM: 'slider__item',
  SLIDER_MAIN_ITEM: 'slider__main-item',
  SLIDER_IMAGE: 'slider__image',
  BUY: ['product__buy', 'buy'],
  BUY_PRICE: 'buy__price',
  BUY_DISCOUNT_PRICE: 'buy__discount-price',
  BUY_PRICE_DISABLE: 'buy__price_disable',
  BUY_BUTTON: 'buy__button',
  BOT: 'product__bot',
  ATRIBUTES: ['product__atributes', 'atributes'],
  ATRIBUTES_TITLE: ['product__subtitle', 'atributes__title'],
  ATRIBUTES_ROW: 'atributes__row',
  ATRIBUTES_KEY: 'atributes__key',
  ATRIBUTES_VALUE: 'atributes__value',
  DESCTIPTION: ['product__description', 'description'],
  DESCTIPTION__TITLE: ['product__subtitle', 'description__title'],
  DESCTIPTION__TEXT: 'description__text',
};

type PageInfo = {
  name: string;
  descriptions: string;
  price: number;
  discount: number | undefined;
  imageArr: Image[];
  atributesArr: Attributes[];
};

class ProductView extends View {
  private sliderMainItem: ElementCreator;

  constructor(id: string, router: Router) {
    super('section', CssClasses.SECTION);
    this.sliderMainItem = new ElementCreator('div', CssClasses.SLIDER_MAIN_ITEM, '');
    this.configView(id, router);
  }

  private async configView(id: string, router: Router): Promise<void> {
    console.log(router);
    const PageInfoData = await this.getData(id);
    this.createTitle(PageInfoData.name);
    this.createTop(PageInfoData.imageArr, PageInfoData.price, PageInfoData.discount);
    this.createBot(PageInfoData.atributesArr, PageInfoData.descriptions);
    // console.log(PageInfoData);
  }

  private createTitle(name: string): void {
    const title = new ElementCreator('h1', CssClasses.TITLE, name);
    this.viewElementCreator.addInnerElement(title);
  }

  private createTop(imageArr: Image[], price: number, discountPrice: number | undefined): void {
    const topBlock = new ElementCreator('div', CssClasses.TOP, '');
    const slider = this.createSlider(imageArr);
    topBlock.addInnerElement(slider);

    const buy = this.createBuy(price, discountPrice);
    topBlock.addInnerElement(buy);
    this.viewElementCreator.addInnerElement(topBlock);
  }

  private createSlider(imageArr: Image[]): ElementCreator {
    const slider = new ElementCreator('div', CssClasses.SLIDER, '');
    const sliderNav = new ElementCreator('div', CssClasses.SLIDER_NAV, '');
    sliderNav.getElement().addEventListener('mouseover', this.sliderNavHoverHandler.bind(this));
    slider.addInnerElement(sliderNav);
    imageArr.forEach((item) => {
      const navItem = this.createImage(item.url);
      sliderNav.addInnerElement(navItem);
    });

    const mainItem = this.sliderMainItem;
    const initialImageUrl = imageArr[0].url;
    this.setSliderMainItem(initialImageUrl);
    slider.addInnerElement(mainItem);

    return slider;
  }

  private setSliderMainItem(url: string): void {
    const image = new ElementCreator('img', CssClasses.SLIDER_IMAGE, '');
    image.getElement().setAttribute('src', url);
    this.sliderMainItem.getElement().innerHTML = '';
    this.sliderMainItem.addInnerElement(image);
  }

  private createImage(url: string): HTMLElement {
    const item = new ElementCreator('div', CssClasses.SLIDER_ITEM, '');
    const image = new ElementCreator('img', CssClasses.SLIDER_IMAGE, '');
    image.getElement().setAttribute('src', url);

    item.addInnerElement(image);
    return item.getElement();
  }

  private createBuy(price: number, discountPrice: number | undefined): ElementCreator {
    const buy = new ElementCreator('div', CssClasses.BUY, '');
    const priceCreator = new ElementCreator('div', CssClasses.BUY_PRICE, `${price} $`);
    buy.addInnerElement(priceCreator);
    if (discountPrice !== undefined) {
      const discountPriceCreator = new ElementCreator('div', CssClasses.BUY_DISCOUNT_PRICE, `${discountPrice} $`);
      priceCreator.getElement().classList.add(CssClasses.BUY_PRICE_DISABLE);
      buy.addInnerElement(discountPriceCreator);
    }

    const buyButton = new ElementCreator('button', CssClasses.BUY_BUTTON, 'Add to cart');
    buy.addInnerElement(buyButton);
    return buy;
  }

  private createBot(atributesArr: Attributes[], description: string): void {
    const botBlock = new ElementCreator('div', CssClasses.BOT, '');
    const atributesBlock = this.createAtributes(atributesArr);
    botBlock.addInnerElement(atributesBlock);

    const descriptionBlock = this.createDescription(description);
    botBlock.addInnerElement(descriptionBlock);

    this.viewElementCreator.addInnerElement(botBlock);
  }

  private createAtributes(atributesArr: Attributes[]): ElementCreator {
    const atributes = new ElementCreator('div', CssClasses.ATRIBUTES, '');
    const atributesTitle = new ElementCreator('h2', CssClasses.ATRIBUTES_TITLE, 'Specifications:');
    atributes.addInnerElement(atributesTitle);
    atributesArr.forEach((elem) => {
      const key = elem.name;
      const values = elem.value;
      const atributesRow = new ElementCreator('div', CssClasses.ATRIBUTES_ROW, '');
      const atributesKey = new ElementCreator('div', CssClasses.ATRIBUTES_KEY, `${key}:  `);
      atributesRow.addInnerElement(atributesKey);
      const atributesValue = new ElementCreator('div', CssClasses.ATRIBUTES_VALUE, values.toString());
      atributesRow.addInnerElement(atributesValue);
      atributes.addInnerElement(atributesRow);
    });

    return atributes;
  }

  private createDescription(description: string): ElementCreator {
    const descriptionBlock = new ElementCreator('div', CssClasses.DESCTIPTION, '');
    const descriptionTitle = new ElementCreator('h2', CssClasses.DESCTIPTION__TITLE, 'Description:');
    descriptionBlock.addInnerElement(descriptionTitle);
    const descriptionText = new ElementCreator('p', CssClasses.DESCTIPTION__TEXT, description);
    descriptionBlock.addInnerElement(descriptionText);

    return descriptionBlock;
  }

  private async getData(id: string): Promise<PageInfo> {
    const data = await ProductAPI.getProduct(id);
    const name = data.masterData.current.name.en;
    const descriptions = data.masterData.current.description.en;
    const price = data.masterData.current.masterVariant.prices[0].value.centAmount / 100;
    const discountValue = data.masterData?.current?.masterVariant?.prices[0]?.discounted?.value?.centAmount;
    let discount;
    if (discountValue) {
      discount = discountValue / 100;
    }
    const imageArr = data.masterData.current.masterVariant.images;
    const atributesArr = data.masterData.current.masterVariant.attributes;
    const info = { name, descriptions, price, discount, imageArr, atributesArr };

    return info;
  }

  private sliderNavHoverHandler(event: MouseEvent): void {
    const сtarget = event.target;
    if (сtarget instanceof HTMLElement) {
      const image = сtarget.closest('.slider__image');
      if (image) {
        const url = image.getAttribute('src');
        if (url !== null) this.setSliderMainItem(url);
      }
    }
  }
}

export default ProductView;
