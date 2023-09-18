import { CTP_API_URL, CTP_PROJECT_KEY, TOKEN_STORAGE_KEY } from '../api-data';
import { Cart } from './cart-api-types';

export class CartAPI {
  private static async createCart(): Promise<Cart> {
    const activeCart = await this.getActiveCart();
    if (activeCart) {
      return activeCart;
    }
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'USD',
      }),
    });
    const cart: Cart = await response.json();
    return cart;
  }

  private static async getActiveCart(): Promise<Cart | null> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/active-cart`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data = await response.json();
    if (data.statusCode === 404) {
      return null;
    }
    return data;
  }

  public static async getCart(): Promise<Cart> {
    const cartId = (await this.createCart()).id;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data: Cart = await response.json();
    return data;
  }

  private static async getCartVersion(cartId: string): Promise<number> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data: Cart = await response.json();
    return data.version;
  }

  public static async addProductToCart(productId: string): Promise<Cart> {
    const cartId = (await this.createCart()).id;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const version = await this.getCartVersion(cartId);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId: 1,
            quantity: 1,
          },
        ],
      }),
    });
    const data: Cart = await response.json();
    return data;
  }

  public static async incrProductQuant(productId: string, productQuant: number): Promise<Cart> {
    const cartId = (await this.createCart()).id;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const version = await this.getCartVersion(cartId);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: productId,
            quantity: productQuant + 1,
          },
        ],
      }),
    });
    const data: Cart = await response.json();
    return data;
  }

  public static async decrProductQuant(productId: string, productQuant: number): Promise<Cart> {
    const cartId = (await this.createCart()).id;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const version = await this.getCartVersion(cartId);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: productId,
            quantity: productQuant - 1,
          },
        ],
      }),
    });
    const data: Cart = await response.json();
    return data;
  }

  public static async removeProduct(productId: string): Promise<Cart> {
    const cartId = (await this.createCart()).id;
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}`;
    const version = await this.getCartVersion(cartId);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId: productId,
            quantity: 0,
          },
        ],
      }),
    });
    const data: Cart = await response.json();
    return data;
  }

  private static async deleteCart(cartId: string): Promise<Cart> {
    const version = await this.getCartVersion(cartId);
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/carts/${cartId}?version=${version}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data: Cart = await response.json();
    return data;
  }

  public static async clearCart(): Promise<void> {
    const cartId = (await this.createCart()).id;
    await this.deleteCart(cartId);
    await this.createCart();
  }
}
