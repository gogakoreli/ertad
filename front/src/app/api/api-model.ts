export interface User {
  username: string;
}

export interface Room {
  id: string;
  name: string;
}

export interface Transaction {
  user: User;
  amount: number;
}
