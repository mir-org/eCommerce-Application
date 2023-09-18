import { MasterVariant } from '../product-api/product-api-types';

export interface Cart {
  anonymousId?: string;
  type: string;
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
  };
  createdBy: {
    isPlatformClient: boolean;
  };
  lineItems: LineItem[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  shippingMode: string;
  shipping: Shipping[];
  customLineItems: CustomLineItem[];
  discountCodes: DiscountCode[];
  directDiscounts: DirectDiscount[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  refusedGifts: RefusedGift[];
  origin: string;
  itemShippingAddresses: ItemShippingAddress[];
}

export interface LineItem {
  id: string;
  productId: string;
  name: {
    en: string;
  };
  money: Money;
  totalPrice: Money;
  quantity: number;
  variant: MasterVariant;
  price: LineItemPrice;
}

interface LineItemPrice {
  discounted?: {
    discount: {
      typeId: string;
      id: string;
    };
    value: Money;
  };
  id: string;
  value: Money;
}

interface Money {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}
interface CustomLineItem {}
interface DiscountCode {}
interface DirectDiscount {}
interface RefusedGift {}
interface ItemShippingAddress {}
interface Shipping {}
