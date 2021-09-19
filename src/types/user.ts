export interface UserResponse {
  user: {
    email: string;
    token: string;
    username: string;
    wins: number;
  }
}