import { TOKEN_STORAGE_KEY, CTP_AUTH_URL, CTP_PROJECT_KEY, CTP_CLIENT_ID, CTP_CLIENT_SECRET } from '../api-data';

export enum AuthStatusCodes {
  successfulPasswordTokenFetch = 200,
}

export class AuthAPI {
  public static async setAccessToken(): Promise<void> {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
      await this.fetchAnonymousToken();
    }
  }

  public static async fetchAnonymousToken(): Promise<void> {
    const url = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
      },
    });
    const data = await response.json();
    // const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    this.fetchRefreshToken(refreshToken);
    // localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  }

  public static async fetchPasswordToken(email: string, password: string): Promise<number> {
    const url = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
      },
    });
    if (response.status !== AuthStatusCodes.successfulPasswordTokenFetch) {
      return response.status;
    }
    const data = await response.json();
    const refreshToken = data.refresh_token;
    this.fetchRefreshToken(refreshToken);
    // const accessToken = data.access_token;
    // localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
    return response.status;
  }

  private static async fetchRefreshToken(token: string): Promise<void> {
    const url = `${CTP_AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${token}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    const accessToken = data.access_token;
    localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  }
}
