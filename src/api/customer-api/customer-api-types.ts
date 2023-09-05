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
  billingAddressIds: string[];
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
  shippingAddressIds: string[];
  stores: [];
  version: number;
  versionModifiedAt: string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
};

export type Address = {
  country: string;
  streetName: string;
  postalCode: string;
  city: string;
  id?: string;
};

export type RegisterCustomerAnswer = {
  statusCode: number;
  message: string;
};

export enum StatusCodes {
  successfulLogin = 200,
  successfulRegistration = 201,
}

export type HeadersInfo = {
  Authorization: string;
  'Content-Type': string;
};
