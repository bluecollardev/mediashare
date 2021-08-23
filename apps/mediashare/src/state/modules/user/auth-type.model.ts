export interface Attributes {
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
}

export interface FetchOptions {}

export interface Client {
  endpoint: string;
  fetchOptions: FetchOptions;
}

export interface Client2 {
  endpoint: string;
}

export interface Pool {
  advancedSecurityDataCollectionFlag: boolean;
  client: Client2;
  clientId: string;
  userPoolId: string;
}

export interface Payload {}

export interface AccessToken {
  jwtToken: string;
  payload: Payload;
}

export interface Payload2 {}

export interface IdToken {
  jwtToken: string;
  payload: Payload2;
}

export interface RefreshToken {
  token: string;
}

export interface SignInUserSession {
  accessToken: AccessToken;
  clockDrift: number;
  idToken: IdToken;
  refreshToken: RefreshToken;
}

export interface AuthDetails {
  Session?: any;
  attributes: Attributes;
  authenticationFlowType: string;
  client: Client;
  keyPrefix: string;
  pool: Pool;
  preferredMFA: string;
  signInUserSession: SignInUserSession;
  userDataKey: string;
  username: string;
}
