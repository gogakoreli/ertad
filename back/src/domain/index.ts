import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';
import { reducer } from './reducer';
import {
  Action,
  Room,
  State,
  User
  } from './types';

export const actions = new Subject<Action>();

const initialState = { users: {}, rooms: {} };
let state: State = { users: {}, rooms: {} };

const state$ = actions.pipe(scan(reducer, initialState));

state$.subscribe(newState => {
  state = newState;
});

export function add(action: Action) {}

export function listUsers(): User[] {
  return Object.values(state.users);
}

export function usernameExits(username: string) {
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
