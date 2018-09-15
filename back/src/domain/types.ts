export interface User {
  id: string;
  name: string;
}

export type InvitationStatus = 'pending' | 'accepted' | 'rejected';

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
  name: string;
  status: 'open' | 'closed';
  host: User;
  users: User[];
  invitationStatuses: InvitationStatus[];
  balances: Record<string, number>;
  receipts: Receipt[];
  payouts?: Payout[];
}

export interface State {
  rooms: Record<string, Room>;
  users: Record<string, User>;
}

export interface Init {
  type: 'Init';
}

export interface CreateUser {
  type: 'CreateUser';
  user: User;
}

export interface CreateRoom {
  type: 'CreateRoom';
  name: string;
  roomId: string;
  host: User;
}

export interface AddGuest {
  type: 'AddGuest';
  roomId: string;
  guest: User;
}

export interface AcceptInvite {
  type: 'AcceptInvite';
  roomId: string;
  guest: User;
}

export interface RejectInvite {
  type: 'RejectInvite';
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
  | Init
  | CreateUser
  | CreateRoom
  | AddGuest
  | AcceptInvite
  | RejectInvite
  | AddReceipt
  | CloseRoom;
