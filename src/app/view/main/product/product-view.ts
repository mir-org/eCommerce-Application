import { ElementCreator } from '../../../utils/element-creator';
import { View } from '../../view';
import { ProductAPI } from '../../../../api/product-api/product-api';
import { Image, Attributes } from '../../../../api/product-api/product-api-types';
import { CartAPI } from '../../../../api/cart-api/cart-api';
import { Observer, CartItemForState } from '../../../observer/observer';

const KEY_FOR_SAVE = {
  CART_ITEMS_STATE_ARRAY: 'cartItemsStateArray',
};

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
  attributes: ['product__attributes', 'attributes'],
  attributes_TITLE: ['product__subtitle', 'attributes__title'],
  attributes_ROW: 'attributes__row',
  attributes_KEY: 'attributes__key',
  attributes_VALUE: 'attributes__value',
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
  attributesArr: Attributes[];
};

class ProductView extends View {
  private observer: Observer;

  private sliderMainItem: ElementCreator;

  private currentProductName: string;

  private picturesPaths: string[];

  private curentIndex: number | null;

  private papaSliderMainItem: ElementCreator | null;

  private papaSliderNav: ElementCreator | null;

  private id: string;

  private buyButton: ElementCreator | null;

  private add: () => void;

  private remove: () => void;

  constructor(id: string, observer: Observer) {
    super('section', CssClasses.SECTION);
    this.add = this.buyButtonClickHandler.bind(this);
    this.remove = this.removeButtonClickHandler.bind(this);
    this.observer = observer;
    this.id = id;
    this.sliderMainItem = new ElementCreator('div', CssClasses.SLIDER_MAIN_ITEM, '');
    this.currentProductName = '';
    this.picturesPaths = [];
    this.buyButton = null;
    this.curentIndex = null;
    this.papaSliderMainItem = null;
    this.papaSliderNav = null;
    this.configView(id);
  }

  private async configView(id: string): Promise<void> {
    const PageInfoData = await this.getData(id);
    this.createTitle(PageInfoData.name);
    this.createTop(PageInfoData.imageArr, PageInfoData.price, PageInfoData.discount);
    this.createBot(PageInfoData.attributesArr, PageInfoData.descriptions);
  }

  private createTitle(name: string): void {
    const title = new ElementCreator('h1', CssClasses.TITLE, name);
    this.currentProductName = name;
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
    slider.getElement().addEventListener('click', this.clickSliderHandler.bind(this));
    const sliderNav = new ElementCreator('div', CssClasses.SLIDER_NAV, '');
    sliderNav.getElement().addEventListener('mouseover', this.sliderNavHoverHandler.bind(this));
    slider.addInnerElement(sliderNav);
    imageArr.forEach((item) => {
      const navItem = this.createImage(item.url, CssClasses.SLIDER_ITEM, CssClasses.SLIDER_IMAGE);
      this.picturesPaths.push(item.url);
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

  private createImage(url: string, itemClassName: string | string[], imageClassName: string | string[]): HTMLElement {
    const item = new ElementCreator('div', itemClassName, '');
    const image = new ElementCreator('img', imageClassName, '');
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

    this.buyButton = new ElementCreator('button', CssClasses.BUY_BUTTON);
    this.setBuyButton();
    buy.addInnerElement(this.buyButton);
    return buy;
  }

  private createBot(attributesArr: Attributes[], description: string): void {
    const botBlock = new ElementCreator('div', CssClasses.BOT, '');
    const attributesBlock = this.createattributes(attributesArr);
    botBlock.addInnerElement(attributesBlock);

    const descriptionBlock = this.createDescription(description);
    botBlock.addInnerElement(descriptionBlock);

    this.viewElementCreator.addInnerElement(botBlock);
  }

  private createattributes(attributesArr: Attributes[]): ElementCreator {
    const attributes = new ElementCreator('div', CssClasses.attributes, '');
    const attributesTitle = new ElementCreator('h2', CssClasses.attributes_TITLE, 'Specifications:');
    attributes.addInnerElement(attributesTitle);
    attributesArr.forEach((elem) => {
      const key = elem.name;
      const values = elem.value;
      const attributesRow = new ElementCreator('div', CssClasses.attributes_ROW, '');
      const attributesKey = new ElementCreator('div', CssClasses.attributes_KEY, `${key}:  `);
      attributesRow.addInnerElement(attributesKey);
      const attributesValue = new ElementCreator('div', CssClasses.attributes_VALUE, values.toString());
      attributesRow.addInnerElement(attributesValue);
      attributes.addInnerElement(attributesRow);
    });

    return attributes;
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
    const attributesArr = data.masterData.current.masterVariant.attributes;
    const info = { name, descriptions, price, discount, imageArr, attributesArr };

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

  private clickSliderHandler(event: MouseEvent): void {
    const сtarget = event.target;
    if (сtarget instanceof HTMLElement) {
      const image = сtarget.closest('.slider__image');
      if (image) {
        const url = image.getAttribute('src');
        if (url !== null) {
          this.createPapaSlider(this.currentProductName, url, this.picturesPaths);
        }
      }
    }
  }

  private createPapaSlider(name: string, url: string, pathsArr: string[]): void {
    this.setCurrentIndex(url);
    window.scrollTo(0, 0);
    document.body.classList.add('scroll-lock');
    const papaSlider = new ElementCreator('div', 'papa-slider', '');
    const papaSliderTitle = new ElementCreator('h2', 'papa-slider__title', name);
    papaSlider.addInnerElement(papaSliderTitle);
    const papaSliderCounter = new ElementCreator('h3', 'papa-slider__counter', `Photo: ${pathsArr.length}`);
    papaSlider.addInnerElement(papaSliderCounter);
    const papaSliderWrapper = new ElementCreator('h3', 'papa-slider__wrapper', '');
    const papaSliderPrevBtn = new ElementCreator('button', 'papa-slider__prev-btn', '<');
    papaSliderPrevBtn.getElement().addEventListener('click', this.papaSliderPrevBtnClickHandler.bind(this));
    papaSliderWrapper.addInnerElement(papaSliderPrevBtn);
    const papaSliderMainElem = new ElementCreator('div', 'papa-slider__main-elem', '');
    this.papaSliderMainItem = papaSliderMainElem;
    papaSliderWrapper.addInnerElement(papaSliderMainElem);
    const papaSliderNextBtn = new ElementCreator('button', 'papa-slider__next-btn', '>');
    papaSliderNextBtn.getElement().addEventListener('click', this.papaSliderNextBtnClickHandler.bind(this));
    papaSliderWrapper.addInnerElement(papaSliderNextBtn);
    papaSlider.addInnerElement(papaSliderWrapper);
    const papaSliderNav = new ElementCreator('div', 'papa-slider__nav', '');
    pathsArr.forEach((elem) => {
      const navItem = this.createImage(elem, 'papa-slider__nav-item', 'papa-slider__nav-image');
      papaSliderNav.addInnerElement(navItem);
    });
    this.papaSliderNav = papaSliderNav;
    papaSlider.addInnerElement(papaSliderNav);
    this.setPapaSliderMainItem();

    const papaSliderCloseBtn = new ElementCreator('button', 'papa-slider__close-btn', '✖');
    papaSliderCloseBtn.getElement().addEventListener('click', this.papaSliderCloseBtnClickHandler.bind(this));
    papaSlider.addInnerElement(papaSliderCloseBtn);

    document.body.append(papaSlider.getElement());
  }

  private setPapaSliderMainItem(): void {
    const image = new ElementCreator('img', 'papa-slider__main-image', '');
    image.getElement().setAttribute('src', this.picturesPaths[Number(this.curentIndex)]);
    this.papaSliderMainItem!.getElement().innerHTML = '';
    this.papaSliderMainItem!.addInnerElement(image);
    const navs = this.papaSliderNav!.getElement().childNodes;
    [...navs].forEach((elem, index) => {
      const item = elem as HTMLElement;
      item.classList.remove('papa-slider__nav-item_active');
      if (index === this.curentIndex) {
        item.classList.add('papa-slider__nav-item_active');
      }
    });
  }

  private papaSliderPrevBtnClickHandler(): void {
    this.curentIndex! -= 1;
    if (this.curentIndex! < 0) this.curentIndex = this.picturesPaths.length - 1;
    this.setPapaSliderMainItem();
  }

  private papaSliderNextBtnClickHandler(): void {
    this.curentIndex! += 1;
    if (this.curentIndex! > this.picturesPaths.length - 1) this.curentIndex = 0;
    this.setPapaSliderMainItem();
  }

  private setCurrentIndex(url: string): void {
    const currentIndex = this.picturesPaths.findIndex((elem) => elem === url);
    this.curentIndex = currentIndex;
  }

  private papaSliderCloseBtnClickHandler(): void {
    document.body.classList.remove('scroll-lock');
    document.body.lastElementChild?.remove();
  }

  private setBuyButton(): void {
    const cartItemsStateArray: CartItemForState[] = JSON.parse(
      this.observer.state.getValue(KEY_FOR_SAVE.CART_ITEMS_STATE_ARRAY)
    );
    const flag = cartItemsStateArray.find((elem) => {
      return elem.productId === this.id;
    });
    if (flag === undefined) {
      this.buyButton!.getElement().innerHTML = 'Add to cart';
      this.buyButton!.getElement().removeEventListener('click', this.remove);
      this.buyButton!.getElement().addEventListener('click', this.add);
    } else {
      this.buyButton!.getElement().innerHTML = 'Remove from cart';
      this.buyButton!.getElement().removeEventListener('click', this.add);
      this.buyButton!.getElement().addEventListener('click', this.remove);
    }
  }

  private async buyButtonClickHandler(): Promise<void> {
    const cart = await CartAPI.addProductToCart(this.id);
    this.observer.setCartState(cart);
    this.setBuyButton();
  }

  private async removeButtonClickHandler(): Promise<void> {
    const cartItemsStateArray: CartItemForState[] = JSON.parse(
      this.observer.state.getValue(KEY_FOR_SAVE.CART_ITEMS_STATE_ARRAY)
    );
    const flag = cartItemsStateArray.find((elem) => {
      return elem.productId === this.id;
    });
    const itemID = flag!.id;

    const cart = await CartAPI.removeProduct(itemID);
    this.observer.setCartState(cart);
    this.setBuyButton();
  }
}
export default ProductView;
