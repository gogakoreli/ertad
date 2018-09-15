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
            name: action.name,
            status: 'open',
            host: action.host,
            balances: { [action.host.id]: 0 },
            users: [action.host],
            invitationStatuses: ['accepted'],
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
            invitationStatuses: [
              ...state.rooms[action.roomId].invitationStatuses,
              'pending',
            ],
          },
        },
      };
    case 'AcceptInvite':
      const index1 = R.findIndex(
        x => x.id === action.guest.id,
        state.rooms[action.roomId].users,
      );
      const statuses1 = [...state.rooms[action.roomId].invitationStatuses];
      statuses1[index1] = 'accepted';
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
            invitationStatuses: statuses1,
            users: [...state.rooms[action.roomId].users, action.guest],
          },
        },
      };
    case 'RejectInvite':
      const index2 = R.findIndex(
        x => x.id === action.guest.id,
        state.rooms[action.roomId].users,
      );
      const statuses2 = [...state.rooms[action.roomId].invitationStatuses];
      statuses2[index2] = 'rejected';
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
            invitationStatuses: statuses2,
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
