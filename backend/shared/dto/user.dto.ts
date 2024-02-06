export interface IUserLoginDto {
  jwt: string;
  username: string;
  id: number;
}

export interface IUserGetDto {
    username: string;
    id: number;
}
