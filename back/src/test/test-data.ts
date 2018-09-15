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
  { type: 'Init' },
  { type: 'CreateUser', user: host },
  { type: 'CreateUser', user: guest1 },
  { type: 'CreateUser', user: guest2 },
  { type: 'CreateRoom', name: 'Ertad', roomId: '1', host: host },

  // { type: 'AddGuest', roomId: '1', guest: guest1 },
  // { type: 'AddGuest', roomId: '1', guest: guest2 },

  { type: 'AddGuests', roomId: '1', guests: [guest1, guest2] },

  { type: 'AcceptInvite', roomId: '1', guest: guest1 },
  { type: 'AcceptInvite', roomId: '1', guest: guest2 },
  {
    type: 'AddReceipt',
    roomId: '1',
    receipt: { user: host, amount: 10, imageUrl: 'image' },
  },
  {
    type: 'AddReceipt',
    roomId: '1',
    receipt: { user: guest1, amount: 15, imageUrl: 'image' },
  },
  {
    type: 'AddReceipt',
    roomId: '1',
    receipt: { user: guest2, amount: 20, imageUrl: 'image' },
  },
  { type: 'CloseRoom', roomId: '1' },
  // { type: 'PayPayout', roomId: '1', payoutId: '1', user: host },
];

console.log(JSON.stringify(actions, null, 4));
