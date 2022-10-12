import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser: User;

  constructor() { 
    //This is just for simplify the challenge, not for real scenario
    this.loggedInUser = {
      userId: 4,
      username: "yoda",
      status: "online",
      active: true
    }; 
    /*this.loggedInUser = {
      userId: 2,
      username: "lukeskywalker",
      status: "online",
      active: true
    };*/
  }
}
