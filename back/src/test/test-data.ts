import { Action, User } from '../domain/types';

const host: User = {
  id: '0',
  name: 'Sandro Dolidze',
};

const guest1: User = {
  id: '1',
  name: 'Mari Khomeriki',
};

const guest2: User = {
  id: '2',
  name: 'Goga Koreli',
};

export const actions: Action[] = [
  { type: 'CreateRoom', id: '1', host: host },
  { type: 'AddGuest', guest: guest1 },
  { type: 'AddGuest', guest: guest2 },
  {
    type: 'AddReceipt',
    receipt: { user: host, amount: 10, imageUrl: 'image' },
  },
  {
    type: 'AddReceipt',
    receipt: { user: guest1, amount: 15, imageUrl: 'image' },
  },
  {
    type: 'AddReceipt',
    receipt: { user: guest2, amount: 20, imageUrl: 'image' },
  },
  { type: 'CloseRoom' },
];
