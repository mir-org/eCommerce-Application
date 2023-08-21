export type MyCustomerDraft = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  defaultShippingAddress?: number;
  shippingAddresses?: number[];
  defaultBillingAddress?: number;
  billingAddresses?: number[];
};

export type Address = {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
};

export type RegisterCustomerAnswer = {
  statusCode: number;
  message: string;
};

export enum StatusCodes {
  successfulLogin = 200,
  successfulRegistration = 201,
}