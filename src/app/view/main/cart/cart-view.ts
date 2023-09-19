import { View } from '../../view';
import { CART_CLASSES, CART_TEXT } from './cart-view-types';
import { CartAPI } from '../../../../api/cart-api/cart-api';
import { Cart, LineItem } from '../../../../api/cart-api/cart-api-types';
import { ElementCreator } from '../../../utils/element-creator';
import { Observer } from '../../../observer/observer';
import { Router } from '../../../router/router';
import InputFieldsCreator from '../../../utils/input-fields-creator';
import { Pages } from '../../../router/pages';

const PROMO_CODE_ID = '52f00546-bfe7-4717-8683-a0351c0736f3';

class CartView extends View {
  private lineItems: LineItem[] | null;

  private cartList: ElementCreator;

  private observer: Observer;

  private router: Router;

  private cartPriceTotalElement: ElementCreator | null;

  private cartPriceDiscountedElement: ElementCreator | null;

  private totalPrice: number | null;

  private discountedPrice: number | null;

  constructor(observer: Observer, router: Router) {
    super('section', CART_CLASSES.CART);
    this.router = router;
    this.observer = observer;
    this.cartList = new ElementCreator('div', CART_CLASSES.LIST);
    this.cartPriceTotalElement = null;
    this.cartPriceDiscountedElement = null;
    this.totalPrice = null;
    this.discountedPrice = null;
    this.configureView();
    this.lineItems = null;
  }

  private async configureView(): Promise<void> {
    await this.setLineItems();
    this.createHeader();
    this.createPromoCodes();
    this.createCartList();
    this.cartList.getElement().addEventListener('click', this.cartListClickHandler.bind(this));
    this.createCartPrices();
  }

  private async setLineItems(): Promise<void> {
    const cart = await CartAPI.getCart();
    this.totalPrice =
      cart.discountCodes.length > 0 ? cart.totalPrice.centAmount / 90 : cart.totalPrice.centAmount / 100;
    this.discountedPrice = cart.totalPrice.centAmount / 100;
    this.lineItems = cart.lineItems;
  }

  private createHeader(): void {
    const header = new ElementCreator('div', CART_CLASSES.HEADER);
    const title = new ElementCreator('h2', CART_CLASSES.TITLE, CART_TEXT.TITLE);
    header.addInnerElement(title);
    const cartClearButton = new ElementCreator('button', CART_CLASSES.CLEAR_CART_BUTTON, CART_TEXT.CLEAR_CART_BUTTON);
    cartClearButton.getElement().addEventListener('click', this.clearCartButtonClickHandler.bind(this));
    header.addInnerElement(cartClearButton);
    this.viewElementCreator.addInnerElement(header);
  }

  private createCartList(): void {
    const list = this.cartList;
    if (this.lineItems!.length < 1) {
      this.createCartBlock();
    } else {
      this.lineItems?.forEach((item) => {
        this.createCartItem(item);
      });
    }
    this.viewElementCreator.addInnerElement(list);
  }

  // eslint-disable-next-line max-lines-per-function
  private createPromoCodes(): void {
    const promoCodesWrapper = new ElementCreator('div', CART_CLASSES.PROMO_CODE_WRAPPER);
    const input = new InputFieldsCreator(CART_CLASSES.CART, CART_CLASSES.PROMO_CODE, CART_TEXT.PROMO_CODE, '', 'text');
    const addPromoCodeBtn = new ElementCreator(
      'button',
      [CART_CLASSES.PROMO_CODE_BUTTON, 'primary-button'],
      CART_TEXT.PROMO_CODE_ADD_BUTTON
    );
    const removePromoCodeBtn = new ElementCreator(
      'button',
      [CART_CLASSES.PROMO_CODE_BUTTON, 'primary-button'],
      CART_TEXT.PROMO_CODE_REMOVE_BUTTON
    );
    addPromoCodeBtn.getElement().addEventListener('click', async () => {
      try {
        const response = await CartAPI.applyDiscountCode(input.getInputElement().value);
        const cart = await response.json();
        console.log(cart);
        this.observer.setCartState(cart);
        this.totalPrice =
          cart.discountCodes.length > 0 ? cart.totalPrice.centAmount / 90 : cart.totalPrice.centAmount / 100;
        this.discountedPrice = cart.totalPrice.centAmount / 100;
        this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
        if (response.status !== 200) {
          const errorLineElement = input.getErrorLine();
          errorLineElement.textContent = 'This promo code does not exists.';
        }
      } catch (error) {
        console.error(error);
      }
    });
    removePromoCodeBtn.getElement().addEventListener('click', async () => {
      const response = await CartAPI.removeDiscountCode(PROMO_CODE_ID);
      const cart = await response.json();
      console.log(cart);
      this.observer.setCartState(cart);
      this.totalPrice =
        cart.discountCodes.length > 0 ? cart.totalPrice.centAmount / 90 : cart.totalPrice.centAmount / 100;
      this.discountedPrice = cart.totalPrice.centAmount / 100;
      this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
      this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
    });
    promoCodesWrapper.addInnerElement(input.getElement());
    promoCodesWrapper.addInnerElement(addPromoCodeBtn.getElement());
    promoCodesWrapper.addInnerElement(removePromoCodeBtn.getElement());
    this.viewElementCreator.addInnerElement(promoCodesWrapper);
  }

  private createCartPrices(): void {
    const pricesWrapper = new ElementCreator('div', CART_CLASSES.PRICES);
    this.cartPriceTotalElement = new ElementCreator('div', CART_CLASSES.PRICES_TOTAL, '');
    this.cartPriceDiscountedElement = new ElementCreator('div', CART_CLASSES.PRICES_DISCOUNT, 'Final price:');
    pricesWrapper.addInnerElement(this.cartPriceTotalElement);
    pricesWrapper.addInnerElement(this.cartPriceDiscountedElement);
    this.viewElementCreator.addInnerElement(pricesWrapper);
    this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
  }

  private updateCartPrice(total: string, discounted: string): void {
    if (this.cartPriceTotalElement) {
      this.cartPriceTotalElement.getElement().textContent = `Total price: ${total}`;
    }
    if (this.cartPriceDiscountedElement) {
      this.cartPriceDiscountedElement.getElement().textContent = `Final price: ${discounted}`;
    }
  }

  private createCartItem(lineItem: LineItem): void {
    const cartItem = new ElementCreator('div', CART_CLASSES.ITEM);
    const itemImage = new ElementCreator('img', CART_CLASSES.ITEM_IMAGE);
    itemImage.getElement().setAttribute('src', lineItem.variant.images[0].url);
    cartItem.addInnerElement(itemImage);
    const itemMiddleWrapper = this.createItemMiddleWrapper(lineItem.name.en, lineItem.quantity);
    cartItem.addInnerElement(itemMiddleWrapper);
    const price = lineItem.price.value.centAmount / 100;
    const discountPrice = lineItem.price.discounted!.value.centAmount / 100;
    const itemPriceWrapper = this.createItemPriceWrapper(price, discountPrice);
    cartItem.addInnerElement(itemPriceWrapper);
    const itemRemoveButton = new ElementCreator(
      'button',
      CART_CLASSES.ITEM_REMOVE_BUTTON,
      CART_TEXT.ITEM_REMOVE_BUTTON
    );
    cartItem.addInnerElement(itemRemoveButton);
    cartItem.getElement().dataset.id = lineItem.id;
    cartItem.getElement().dataset.productId = lineItem.productId;
    this.cartList.addInnerElement(cartItem);
  }

  private createItemMiddleWrapper(name: string, quantity: number): ElementCreator {
    const itemMiddleWrapper = new ElementCreator('div', CART_CLASSES.ITEM_MIDDLE_WRAPPER);
    const itemName = new ElementCreator('h3', CART_CLASSES.ITEM_TITLE, name);
    itemMiddleWrapper.addInnerElement(itemName);
    const itemCountWrapper = new ElementCreator('div', CART_CLASSES.ITEM_COUNT_WRAPPER);
    const countMinusButton = new ElementCreator(
      'button',
      CART_CLASSES.COUNT_MINUS_BUTTON,
      CART_TEXT.COUNT_MINUS_BUTTON
    );
    itemCountWrapper.addInnerElement(countMinusButton);
    const countValueField = new ElementCreator('h3', CART_CLASSES.COUNT_VALUE, `${quantity.toString()}`);
    itemCountWrapper.addInnerElement(countValueField);
    const countPlusButton = new ElementCreator('button', CART_CLASSES.COUNT_PLUS_BUTTON, CART_TEXT.COUNT_PLUS_BUTTON);
    itemCountWrapper.addInnerElement(countPlusButton);
    itemMiddleWrapper.addInnerElement(itemCountWrapper);
    return itemMiddleWrapper;
  }

  private createItemPriceWrapper(price: number, discountPrice: number | undefined): ElementCreator {
    const itemPriceWrapper = new ElementCreator('div', CART_CLASSES.ITEM_PRICE_WRAPPER);
    const priceCreator = new ElementCreator('div', CART_CLASSES.ITEM_PRICE, `${price} $`);
    itemPriceWrapper.addInnerElement(priceCreator);
    if (discountPrice !== undefined) {
      const discountPriceCreator = new ElementCreator('div', CART_CLASSES.ITEM_DISCOUNT_PRICE, `${discountPrice} $`);
      priceCreator.getElement().classList.add(CART_CLASSES.ITEM_PRICE_DISABLE);
      itemPriceWrapper.addInnerElement(discountPriceCreator);
    }
    return itemPriceWrapper;
  }

  private async clearCartButtonClickHandler(): Promise<void> {
    const cart = await CartAPI.clearCart();
    this.cartList.getElement().innerHTML = '';
    this.lineItems = cart.lineItems;
    this.observer.setCartState(cart);
    this.totalPrice =
      cart.discountCodes.length > 0 ? cart.totalPrice.centAmount / 90 : cart.totalPrice.centAmount / 100;
    this.discountedPrice = cart.totalPrice.centAmount / 100;
    this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
    this.createCartList();
    this.createCartPrices();
  }

  /* eslint-disable max-lines-per-function */
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
        const cart = await this.removeItem(id, item);
        if (cart.lineItems.length === 0) {
          this.createCartBlock();
        }
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
    this.totalPrice =
      cart.discountCodes.length > 0 ? cart.totalPrice.centAmount / 90 : cart.totalPrice.centAmount / 100;
    this.discountedPrice = cart.totalPrice.centAmount / 100;
    this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
    item.remove();
    if (cart.lineItems.length < 1) {
      this.createCartBlock();
    }
    return cart;
  }

  private async decrProductQuant(id: string, countValueElement: Element): Promise<Cart> {
    const test = countValueElement;
    const currentValue = Number(countValueElement.innerHTML);
    const cart = await CartAPI.decrProductQuant(id, currentValue);
    test.innerHTML = `${currentValue - 1}`;
    this.observer.setCartState(cart);
    this.totalPrice =
      cart.discountCodes.length > 0 ? cart.totalPrice.centAmount / 90 : cart.totalPrice.centAmount / 100;
    this.discountedPrice = cart.totalPrice.centAmount / 100;
    this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
    return cart;
  }

  private async incrProductQuant(id: string, countValueElement: Element): Promise<Cart> {
    const test = countValueElement;
    const currentValue = Number(countValueElement.innerHTML);
    const cart = await CartAPI.incrProductQuant(id, currentValue);
    test.innerHTML = `${currentValue + 1}`;
    this.observer.setCartState(cart);
    this.totalPrice =
      cart.discountCodes.length > 0 ? cart.totalPrice.centAmount / 90 : cart.totalPrice.centAmount / 100;
    this.discountedPrice = cart.totalPrice.centAmount / 100;
    this.updateCartPrice(`${this.totalPrice} $`, `${this.discountedPrice} $`);
    return cart;
  }

  private createCartBlock(): void {
    this.cartList.getElement().innerHTML = '';
    const cartBlock = new ElementCreator('div', CART_CLASSES.BLOCK, '');
    const cardBlockText = new ElementCreator('p', CART_CLASSES.BLOCK_TEXT, 'Your Shopping Cart is empty');
    cartBlock.addInnerElement(cardBlockText);
    const cardBlockButton = new ElementCreator('button', CART_CLASSES.BLOCK_BUTTON, 'Start Shopping');
    cardBlockButton.getElement().addEventListener('click', () => {
      this.router.navigate(Pages.CATALOG);
    });
    cartBlock.addInnerElement(cardBlockButton);
    this.cartList.addInnerElement(cartBlock);
  }
}

export default CartView;
