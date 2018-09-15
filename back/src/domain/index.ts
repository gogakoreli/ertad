import { Subject } from 'rxjs';
import { reducer } from './reducer';
import { Action, Room, User } from './types';

export const STREAM = new Subject<Action>();

const rooms: Record<string, Room> = {};
const users: Record<string, User> = {};

STREAM.subscribe(action => {
  if (action.type === 'CreateUser') {
    users[action.user.id] = action.user;
  }
});

STREAM.subscribe(action => {
  if (action.type === 'CreateUser') {
    users[action.user.id] = action.user;
  }
});

export function add(action: Action) {}

export function listUsers(): User[] {
  return Object.values(users);
}

export function usernameExits(username: string) {
  return username in users;
}

export function getUserById(id: string): User {
  return users[id];
}

export function listRooms(): Room[] {
  return Object.values(rooms);
}

export function getRoomById(id: string): Room {
  return rooms[id];
}
