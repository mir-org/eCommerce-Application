import { TOKEN_STORAGE_KEY, CTP_PROJECT_KEY, CTP_API_URL } from '../api-data';
import { AuthAPI, AuthStatusCodes } from '../auth-api/auth-api';
import { CustomerInfo, MyCustomerDraft, StatusCodes, HeadersInfo } from './customer-api-types';
import { createPopupWithText } from '../../app/utils/create-popup-with-text';

export class CustomerAPI {
  private static headers: HeadersInfo = {
    Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`,
    'Content-Type': 'application/json',
  };

  public static async loginCustomer(email: string, password: string): Promise<number> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/login`;
    const responseStatus = await AuthAPI.fetchPasswordToken(email, password);
    if (responseStatus !== AuthStatusCodes.successfulPasswordTokenFetch) {
      return responseStatus;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
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
      headers: this.headers,
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

  public static async getCustomerInfo(): Promise<CustomerInfo> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    const data = await response.json();
    return data;
  }

  public static async updateCustomerFirstName(info: string): Promise<void> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    const customerData = await response.json();
    console.log(customerData.version);
    const requestBody = {
      version: customerData.version,
      actions: [
        {
          action: 'setFirstName',
          firstName: info,
        },
      ],
    };
    await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(requestBody),
    });
    createPopupWithText('First Name updated');
  }

  public static async updateCustomerLastName(info: string): Promise<void> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    const customerData = await response.json();
    const requestBody = {
      version: customerData.version,
      actions: [
        {
          action: 'setLastName',
          lastName: info,
        },
      ],
    };
    await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(requestBody),
    });
    createPopupWithText('Last Name updated');
  }

  public static async updateCustomerEmail(info: string): Promise<void> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    const customerData = await response.json();
    const requestBody = {
      version: customerData.version,
      actions: [
        {
          action: 'changeEmail',
          email: info,
        },
      ],
    };
    await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(requestBody),
    });
    createPopupWithText('Email updated');
  }

  public static async updateCustomerBirthDay(info: string): Promise<void> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
    });
    const customerData = await response.json();
    const requestBody = {
      version: customerData.version,
      actions: [
        {
          action: 'setDateOfBirth',
          dateOfBirth: info,
        },
      ],
    };
    await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(requestBody),
    });
    createPopupWithText('Birthday updated');
  }
}
