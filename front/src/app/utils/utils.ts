import { Room, User } from '../api/types';

export function isPendingMember(room: Room, user: User) {
  const invitation = room.invitations[user.id];
  return (
    room.users.find(x => x.id === user.id) &&
    invitation &&
    invitation === 'pending'
  );
}

export function isMember(room: Room, user: User) {
  return !!room.users.find(x => x.id === user.id);
}

export function isNotHost(room: Room, user: User) {
  return room.host.id !== user.id;
}

export function isRejectedMember(room: Room, user: User) {
  const invitation = room.invitations[user.id];
  return (
    room.users.find(x => x.id === user.id) &&
    invitation &&
    invitation === 'rejected'
  );
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}
