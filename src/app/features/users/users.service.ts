import { Observable } from 'rxjs';
import { EssentialService } from '../../core/essentialService';
import { User } from './models';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UsersService extends EssentialService {
  
  constructor() {
    super();
    this.apiPath = 'users';
  }

  getUsers(): Observable<User[]> {
    return this.apiCall<User[]>({
      type: 'GET',
      url: this.apiUrl,
    });
  }

  getUsers2(): Observable<User[]> {
    return this.apiCall<User[]>({
      type: 'GET',
      url: this.apiUrl,
    });
  }

  getUser(id: number): Observable<User> {
    return this.apiCall<User>({
      type: 'GET',
      url: `${this.apiUrl}/${id}`,
    });
  }

  addUser(user: User): Observable<User> {
    return this.apiCall<User>({
      type: 'POST',
      url: this.apiUrl,
      options: {
        body: user,
      },
    });
  }

  updateUser(user: Partial<User>): Observable<User> {
    return this.apiCall<User>({
      type: 'PUT',
      url: `${this.apiUrl}/${user.id}`,
      options: {
        body: user,
      },
    });
  }

  deleteUser(user: User): Observable<User> {
    return this.apiCall<User>({
      type: 'DELETE',
      url: `${this.apiUrl}/${user.id}`,
    });
  }
}
