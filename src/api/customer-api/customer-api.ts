import { TOKEN_STORAGE_KEY, CTP_PROJECT_KEY, CTP_API_URL } from '../api-data';
import { AuthAPI, AuthStatusCodes } from '../auth-api/auth-api';
import { MyCustomerDraft, StatusCodes } from './customer-api-type';

export class CustomerAPI {
  public static async loginCustomer(email: string, password: string): Promise<number> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/login`;
    const responseStatus = await AuthAPI.fetchPasswordToken(email, password);
    if (responseStatus !== AuthStatusCodes.successfulPasswordTokenFetch) {
      return responseStatus;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response.status;
  }

  public static async registerCustomer(customerData: MyCustomerDraft): Promise<number> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/signup`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
      body: JSON.stringify({
        email: customerData.email,
        password: customerData.password,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        dateOfBirth: customerData.dateOfBirth,
        addresses: customerData.addresses,
        defaultShippingAddress: customerData.defaultShippingAddress,
        shippingAddresses: customerData.shippingAddresses,
        defaultBillingAddress: customerData.defaultBillingAddress,
        billingAddresses: customerData.billingAddresses,
      }),
    });
    if (response.status !== StatusCodes.successfulRegistration) {
      return response.status;
    }
    await AuthAPI.fetchPasswordToken(customerData.email, customerData.password);
    await this.loginCustomer(customerData.email, customerData.password);
    return response.status;
  }

  public static async getCustomerInfo(): Promise<void> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
      },
    });
    const data = await response.json();
    console.log('getInfo', data);
  }
}
