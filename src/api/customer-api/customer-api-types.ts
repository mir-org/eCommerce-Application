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

export type CustomerInfo = {
  addresses: Address[];
  authenticationMode: string;
  billingAddressIds: number[];
  createdAt: string;
  createdBy: { anonymousId: string; clientId: string; isPlatformClient: boolean };
  dateOfBirth: string;
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: { anonymousId: string; clientId: string; isPlatformClient: boolean };
  lastName: string;
  password: string;
  shippingAddressIds: number[];
  stores: [];
  version: number;
  versionModifiedAt: string;
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
