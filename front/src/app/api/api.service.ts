import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action } from './types';

const apiUrl = "http://localhost:3500/";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  listRooms() {
    return this.http.get(apiUrl + "rooms");
  }

  getRoomById(id: string) {
    return this.http.get(apiUrl + "rooms/" + id);
  }

  listUsers() {
    return this.http.get(apiUrl + "users");
  }

  addAction(action: Action) {
    return this.http.post("/action", action);
  }

  getUserById(id: string) {
    return this.http.get(apiUrl + "users/" + id);
  }
}
