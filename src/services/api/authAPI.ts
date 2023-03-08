import { apiClient } from '@cores/api/api-client';
import * as BASE_URL from '@services/endpoint';
import { AuthLoginModel } from '@services/models/auth';

export async function login(req: AuthLoginModel.Request) {
  const { data } = await apiClient.post<AuthLoginModel.Response>(
    `${BASE_URL.AUTH_LOGIN}`,
    req,
  );
  return data;
}

export async function getMe() {
  const { data } = await apiClient.get<AuthLoginModel.Response>(
    `${BASE_URL.AUTH_ME}`,
  );
  return data;
}
