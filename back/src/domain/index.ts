import { Observable, Subject } from 'rxjs';
import { onErrorResumeNext, scan } from 'rxjs/operators';
import { reducer } from './reducer';
import {
  Action,
  Room,
  State,
  User
  } from './types';

const actions = new Subject<Action>();

let state: State = { users: {}, rooms: {} };

export const addAction = io => (action: Action) => {
  actions.next(action);
  state = reducer(state, action);

  if (action.type === 'CreateUser') {
    io.emit('users', Object.values(state.users));
  }

  if (
    action.type === 'CreateRoom' ||
    action.type === 'AddGuest' ||
    action.type === 'AddReceipt' ||
    action.type === 'CloseRoom'
  ) {
    io.emit('rooms/' + action.roomId, state.rooms[action.roomId]);
  }

  io.emit('actions', action);
};

export function listUsers(): User[] {
  return Object.values(state.users);
}

export function usernameExists(username: string) {
  return username in state.users;
}

export function getUserById(id: string): User {
  return state.users[id];
}

export function listRooms(): Room[] {
  return Object.values(state.rooms);
}

export function getRoomById(id: string): Room {
  return state.rooms[id];
}
