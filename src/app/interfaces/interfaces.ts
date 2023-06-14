export interface User {
  login: string;
  password: string;
}

export interface AuthResponse {
  payload: {
    token: string
  } | null;
  error: string
}
