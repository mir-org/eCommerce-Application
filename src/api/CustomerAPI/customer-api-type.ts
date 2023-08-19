export type MyCustomerDraft = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
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
  successfulRegistration = 201,
}
