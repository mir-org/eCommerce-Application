import { View } from '../../view';
import { CssClasses, TEXT } from './cart-view-types';
import { CartAPI } from '../../../../api/cart-api/cart-api';
import { Cart, LineItem } from '../../../../api/cart-api/cart-api-types';
import { ElementCreator } from '../../../utils/element-creator';
import { Observer } from '../../../observer/observer';
import { Router } from '../../../router/router';

class CartView extends View {
  private lineItems: LineItem[] | null;

  private cartList: ElementCreator;

  private observer: Observer;

  private router: Router;

  constructor(observer: Observer, router: Router) {
    super('section', CssClasses.CART);
    this.router = router;
    this.observer = observer;
    this.cartList = new ElementCreator('div', CssClasses.LIST);
    this.configureView();
    this.lineItems = null;
  }

  private async configureView(): Promise<void> {
    await this.setLineItems();
    this.createHeader();
    this.createCartList();
    this.cartList.getElement().addEventListener('click', this.cartListClickHandler.bind(this));
  }

  private async setLineItems(): Promise<void> {
    const cart = await CartAPI.getCart();
    this.lineItems = cart.lineItems;
  }

  private createHeader(): void {
    const header = new ElementCreator('h2', CssClasses.HEADER);
    const title = new ElementCreator('h2', CssClasses.TITLE, TEXT.TITLE);
    header.addInnerElement(title);
    const cartClearButton = new ElementCreator('button', CssClasses.CLEAR_CART_BUTTON, TEXT.CLEAR_CART_BUTTON);
    cartClearButton.getElement().addEventListener('click', this.clearCartButtonClickHandler.bind(this));
    header.addInnerElement(cartClearButton);

    this.viewElementCreator.addInnerElement(header);
  }

  private createCartList(): void {
    const list = this.cartList;
    this.lineItems?.forEach((item) => {
      this.createCartItem(item);
    });
    this.viewElementCreator.addInnerElement(list);
  }

  private createCartItem(lineItem: LineItem): void {
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
    cartItem.getElement().dataset.productId = lineItem.productId;

    this.cartList.addInnerElement(cartItem);
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

  private async clearCartButtonClickHandler(): Promise<void> {
    const cart = await CartAPI.clearCart();
    this.cartList.getElement().innerHTML = '';
    this.lineItems = cart.lineItems;
    this.observer.setCartState(cart);
    this.createCartList();
  }

  private async cartListClickHandler(e: MouseEvent): Promise<void> {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('shopping-cart-item__img') ||
      target.classList.contains('shopping-cart-item__title')
    ) {
      const item = target.closest('.shopping-cart-item') as HTMLElement;
      const id = item?.dataset.id;
      const productIds = item.dataset.productId;
      if (id !== undefined) {
        this.router.navigate(`catalog/${productIds}`);
      }
    }

    if (target.classList.contains('shopping-cart-item__remove-button')) {
      const item = target.closest('.shopping-cart-item') as HTMLElement;
      const id = item?.dataset.id as string;
      await this.removeItem(id, item);
    }
    if (target.classList.contains('count__button_minus')) {
      const item = target.closest('.shopping-cart-item') as HTMLElement;
      const id = item?.dataset.id as string;
      const count = target.closest('.shopping-cart-item__count') as HTMLElement;
      const countValueElement = count.children[1];
      if (Number(countValueElement.innerHTML) <= 1) {
        this.removeItem(id, item);
        return;
      }
      await this.decrProductQuant(id, countValueElement);
    }
    if (target.classList.contains('count__button_plus')) {
      const item = target.closest('.shopping-cart-item') as HTMLElement;
      const id = item?.dataset.id as string;
      const count = target.closest('.shopping-cart-item__count') as HTMLElement;
      const countValueElement = count.children[1];
      await this.incrProductQuant(id, countValueElement);
    }
  }

  private async removeItem(id: string, item: Element): Promise<Cart> {
    const cart = await CartAPI.removeProduct(id);
    this.observer.setCartState(cart);
    item.remove();
    return cart;
  }

  private async decrProductQuant(id: string, countValueElement: Element): Promise<Cart> {
    const test = countValueElement;
    const curentValue = Number(countValueElement.innerHTML);
    const cart = await CartAPI.decrProductQuant(id, curentValue);
    test.innerHTML = `${curentValue - 1}`;
    this.observer.setCartState(cart);
    return cart;
  }

  private async incrProductQuant(id: string, countValueElement: Element): Promise<Cart> {
    const test = countValueElement;
    const curentValue = Number(countValueElement.innerHTML);
    const cart = await CartAPI.incrProductQuant(id, curentValue);
    test.innerHTML = `${curentValue + 1}`;
    this.observer.setCartState(cart);
    return cart;
  }
}

export default CartView;
