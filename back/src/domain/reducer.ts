import R from 'ramda';
import { calculatePayouts } from './calculate';
import { Action, State } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'Init':
      return { users: {}, rooms: {} };
    case 'CreateUser':
      return {
        ...state,
        users: {
          ...state.users,
          [action.user.id]: action.user,
        },
      };
    case 'CreateRoom':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: {
            id: action.roomId,
            status: 'open',
            host: action.host,
            balances: { [action.host.id]: 0 },
            users: [action.host],
            receipts: [],
          },
        },
      };
    case 'AddGuest':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: {
            ...state.rooms[action.roomId],
            balances: {
              ...state.rooms[action.roomId].balances,
              [action.guest.id]: 0,
            },
            users: [...state.rooms[action.roomId].users, action.guest],
          },
        },
      };
    case 'AddReceipt':
      const userId = action.receipt.user.id;
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: {
            ...state.rooms[action.roomId],
            balances: {
              ...state.rooms[action.roomId].balances,
              [userId]:
                state.rooms[action.roomId].balances[userId] +
                action.receipt.amount,
            },
            receipts: [action.receipt, ...state.rooms[action.roomId].receipts],
          },
        },
      };
    case 'CloseRoom':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.roomId]: {
            ...state.rooms[action.roomId],
            payouts: calculatePayouts(
              R.indexBy(u => u.id, state.rooms[action.roomId].users),
              state.rooms[action.roomId].balances,
              state.rooms[action.roomId].receipts,
            ),
            status: 'closed',
          },
        },
      };
    default:
      return state;
  }
}
