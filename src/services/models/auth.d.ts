export interface AuthData {
  roles: string[];
  token: Token;
  userInfo: UserInfo;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfo {
  firstName: string;
  id: string;
  lastName: string;
  username: string;
}

export namespace AuthLoginModel {
  export interface Request {
    username: string;
    password: string;
  }
  export interface Response {
    data: AuthData;
    redirect: string;
  }
  export interface UserInfo {
    firstName: string;
    id: string;
    lastName: string;
    username: string;
  }
}
