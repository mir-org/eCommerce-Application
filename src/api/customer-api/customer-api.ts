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
    try {
      const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });
      if (response.status === 400) {
        const errorResponse = await response.json();
        createPopupWithText(`Error ${response.status}: ${errorResponse.message}`);
      } else {
        const customerData = await response.json();
        const requestBody = {
          version: customerData.version,
          actions: [
            {
              action: 'setFirstName',
              firstName: info,
            },
          ],
        };
        const postResponse = await fetch(url, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(requestBody),
        });
        if (postResponse.status === 400) {
          const errorResponse = await postResponse.json();
          createPopupWithText(`Error ${postResponse.status}: ${errorResponse.message}`);
        } else {
          createPopupWithText('First Name updated.');
        }
      }
    } catch (error) {
      this.handleFetchError(error);
    }
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
    createPopupWithText('Last Name updated.');
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
    createPopupWithText('Email updated.');
  }

  public static async updateCustomerBirthDay(info: string): Promise<void> {
    const url = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: this.headers,
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }
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
      try {
        const request = await fetch(url, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(requestBody),
        });
        if (!request.ok) {
          throw new Error('Failed to update birthday.');
        }
        createPopupWithText('Birthday updated.');
      } catch (error) {
        console.error('Error updating birthday:', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  public static async updateCustomerPassword(info: string, current: string): Promise<void> {
    try {
      const getUrl = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/`;
      const postUrl = `${CTP_API_URL}/${CTP_PROJECT_KEY}/me/password/`;
      const response = await fetch(getUrl, {
        method: 'GET',
        headers: this.headers,
      });
      const customerData = await response.json();
      const requestBody = {
        version: customerData.version,
        currentPassword: current,
        newPassword: info,
      };
      const postResponse = await fetch(postUrl, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(requestBody),
      });
      if (postResponse.status === 400) {
        const errorResponse = await postResponse.json();
        createPopupWithText(`Error ${postResponse.status}: ${errorResponse.message}`);
      } else {
        console.log(customerData.email);
        await CustomerAPI.loginCustomer(customerData.email, info);
        createPopupWithText('Password updated.');
      }
    } catch (error) {
      this.handleFetchError(error);
    }
  }

  private static handleFetchError(error: unknown): void {
    if (error instanceof Error) {
      createPopupWithText(`Error: ${error.message}`);
    } else {
      createPopupWithText(`Unknown error: ${error}`);
    }
    throw error;
  }
}
