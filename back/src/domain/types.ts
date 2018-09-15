export interface User {
  id: string;
  name: string;
}

export interface RoomUser {
  user: User;
  splitStatus: 'pending' | 'paid' | 'rejected';
}

export interface Receipt {
  user: User;
  amount: number;
  imageUrl: string;
}

export interface Payout {
  from: User;
  to: User;
  status: 'pending' | 'paid' | 'rejected';
  amount: number;
}

export interface Room {
  id: string;
  status: 'open' | 'closed';
  host: User;
  users: User[];
  balances: Record<string, number>;
  receipts: Receipt[];
  payouts?: Payout[];
}

export interface State {
  rooms: Record<string, Room>;
  users: Record<string, User>;
}

export interface CreateUser {
  type: 'CreateUser';
  user: User;
}

export interface CreateRoom {
  type: 'CreateRoom';
  roomId: string;
  host: User;
}

export interface AddGuest {
  type: 'AddGuest';
  roomId: string;
  guest: User;
}

export interface AddReceipt {
  type: 'AddReceipt';
  roomId: string;
  receipt: Receipt;
}

export interface CloseRoom {
  type: 'CloseRoom';
  roomId: string;
}

export type Action =
  | CreateUser
  | CreateRoom
  | AddGuest
  | AddReceipt
  | CloseRoom;
