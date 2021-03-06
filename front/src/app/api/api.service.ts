import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Action, Room, User } from './types';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  listRooms() {
    return this.http.get<Room[]>(apiUrl + 'rooms');
  }

  getRoomById(id: string) {
    return this.http.get<Room>(apiUrl + 'rooms/' + id);
  }

  listUsers() {
    return this.http.get<User[]>(apiUrl + 'users');
  }

  addAction(action: Action) {
    return this.http.post(apiUrl + 'action', action);
  }

  getUserById(id: string) {
    return this.http.get(apiUrl + 'users/' + id);
  }
}
