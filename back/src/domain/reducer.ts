import R from 'ramda';
import { calculatePayouts } from './calculate';
import { Action, State } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'Init':
      return { users: {}, rooms: {} };
    case 'CreateUser':
      state.users[action.user.id] = { ...action.user };
      return state;
    case 'CreateRoom':
      state.rooms[action.roomId] = {
        id: action.roomId,
        name: action.name,
        status: 'open',
        host: action.host,
        balances: { [action.host.id]: 0 },
        users: [{ ...action.host }],
        invitationStatuses: ['accepted'],
        receipts: [],
      };
      return state;
    case 'AddGuest':
      const room = state.rooms[action.roomId];
      room.balances[action.guest.id] = 0;
      room.users.push({ ...action.guest });
      room.invitationStatuses.push('pending');
      return state;
    case 'AcceptInvite':
      const room2 = state.rooms[action.roomId];
      const index1 = R.findIndex(x => x.id === action.guest.id, room2.users);
      room2.invitationStatuses[index1] = 'accepted';
      return state;
    case 'RejectInvite':
      const room3 = state.rooms[action.roomId];
      const index2 = R.findIndex(x => x.id === action.guest.id, room3.users);
      room3.invitationStatuses[index2] = 'rejected';
      return state;
    case 'AddReceipt':
      const room4 = state.rooms[action.roomId];
      const userId = action.receipt.user.id;
      room4.balances[userId] += action.receipt.amount;
      room4.receipts.push({ ...action.receipt });
      return state;
    case 'PayPayout':
      const room5 = state.rooms[action.roomId];
      const index5 = R.findIndex(
        x => x.id === action.payoutId,
        room5.payouts || [],
      );
      const payouts = state.rooms[action.roomId].payouts || [];
      payouts[index5].status = 'paid';
      return state;
    case 'CloseRoom':
      const room6 = state.rooms[action.roomId];
      room6.payouts = calculatePayouts(
        R.indexBy(u => u.id, room6.users),
        room6.balances,
        room6.receipts,
      );
      room6.status = 'closed';
      return state;
    default:
      return state;
  }
}
