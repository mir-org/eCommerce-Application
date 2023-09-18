import { View } from '../../view';
import { CssClasses, TEXT } from './cart-view-types';
import { CartAPI } from '../../../../api/cart-api/cart-api';
import { LineItem } from '../../../../api/cart-api/cart-api-types';
import { ElementCreator } from '../../../utils/element-creator';

class CartView extends View {
  private lineItems: LineItem[] | null;

  constructor() {
    super('section', CssClasses.CART);
    this.configureView();
    this.lineItems = null;
  }

  private async configureView(): Promise<void> {
    await this.setLineItems();
    this.createTitle();

    this.createCartList();
  }

  private async setLineItems(): Promise<void> {
    const cart = await CartAPI.getCart();
    this.lineItems = cart.lineItems;
  }

  private createTitle(): void {
    const title = new ElementCreator('h2', CssClasses.TITLE, TEXT.TITLE);
    this.viewElementCreator.addInnerElement(title);
  }

  private createCartList(): void {
    const cartList = new ElementCreator('div', CssClasses.LIST);
    this.lineItems?.forEach((item) => {
      this.createCartItem(item, cartList);
    });
    this.viewElementCreator.addInnerElement(cartList);
  }

  private createCartItem(lineItem: LineItem, cartList: ElementCreator): void {
    // console.log(lineItem);
    const cartItem = new ElementCreator('div', CssClasses.ITEM);
    const itemImage = new ElementCreator('img', CssClasses.ITEM_IMAGE);
    itemImage.getElement().setAttribute('src', lineItem.variant.images[0].url);
    cartItem.addInnerElement(itemImage);
    const itemMiddleWrapper = this.creatItemMiddleWrapper(lineItem.name.en, lineItem.quantity);
    cartItem.addInnerElement(itemMiddleWrapper);
    const price = lineItem.price.value.centAmount / 100;
    const discountPrice = lineItem.price.discounted!.value.centAmount / 100;
    const itemPriceWrapper = this.creatItemPriceWrapper(price, discountPrice);
    cartItem.addInnerElement(itemPriceWrapper);
    const itemRemoveButton = new ElementCreator('button', CssClasses.ITEM_REMOVE_BUTTON, TEXT.ITEM_REMOVE_BUTTON);
    cartItem.addInnerElement(itemRemoveButton);

    cartItem.getElement().dataset.id = lineItem.id;
    cartList.addInnerElement(cartItem);
  }

  private creatItemMiddleWrapper(name: string, quantity: number): ElementCreator {
    const itemMiddleWrapper = new ElementCreator('div', CssClasses.ITEM_MIDDLE_WRAPPER);
    const itemName = new ElementCreator('h3', CssClasses.ITEM_TITLE, name);
    itemMiddleWrapper.addInnerElement(itemName);
    const itemCountWrapper = new ElementCreator('div', CssClasses.ITEM_COUNT_WRAPPER);
    const countMinusButton = new ElementCreator('button', CssClasses.COUNT_MINUS_BUTTON, TEXT.COUNT_MINUS_BUTTON);
    itemCountWrapper.addInnerElement(countMinusButton);
    const countValueField = new ElementCreator('h3', CssClasses.COUNT_VALUE, `${quantity.toString()}`);
    itemCountWrapper.addInnerElement(countValueField);
    const countPlusButton = new ElementCreator('button', CssClasses.COUNT_PLUS_BUTTON, TEXT.COUNT_PLUS_BUTTON);
    itemCountWrapper.addInnerElement(countPlusButton);
    itemMiddleWrapper.addInnerElement(itemCountWrapper);
    return itemMiddleWrapper;
  }

  private creatItemPriceWrapper(price: number, discountPrice: number | undefined): ElementCreator {
    const itemPriceWrapper = new ElementCreator('div', CssClasses.ITEM_PRICE_WRAPPER);

    const priceCreator = new ElementCreator('div', CssClasses.ITEM_PRICE, `${price} $`);
    itemPriceWrapper.addInnerElement(priceCreator);
    if (discountPrice !== undefined) {
      const discountPriceCreator = new ElementCreator('div', CssClasses.ITEM_DISCOUNT_PRICE, `${discountPrice} $`);
      priceCreator.getElement().classList.add(CssClasses.ITEM_PRICE_DISABLE);
      itemPriceWrapper.addInnerElement(discountPriceCreator);
    }

    return itemPriceWrapper;
  }
}

export default CartView;
