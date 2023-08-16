import { TOKEN_STORAGE_KEY, CTP_AUTH_URL, CTP_PROJECT_KEY, CTP_CLIENT_ID, CTP_CLIENT_SECRET } from '../api-data';

export class AuthAPI {
  public async setAccessToken(): Promise<void> {
    if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
      await this.fetchAnonymousToken();
    }
  }

  private async fetchAnonymousToken(): Promise<void> {
    const url = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
      },
    });
    const data = await response.json();
    const accessToken = data.access_token;
    localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  }

  public async fetchPasswordToken(email: string, password: string): Promise<void> {
    const url = `${CTP_AUTH_URL}/oauth/${CTP_PROJECT_KEY}/customers/token?grant_type=password&username=${email}&password=${password}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
      },
    });
    const data = await response.json();
    const refreshToken = data.refresh_token;
    await this.fetchRefreshToken(refreshToken);
  }

  private async fetchRefreshToken(token: string): Promise<void> {
    const url = `${CTP_AUTH_URL}/oauth/token?grant_type=refresh_token&refresh_token=${token}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`)}`,
      },
    });
    const data = await response.json();
    const accessToken = data.access_token;
    localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  }
}
