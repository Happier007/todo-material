// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { BehaviorSubject, Observable } from 'rxjs';

// MAIN
import { IUser } from '../../../models/user.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUrl = '/api/auth/login/';
  checkUrl = '/api/auth/restore_session/';
  public user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

  constructor(private http: HttpClient) {
  }

  public authenticate(user: IUser) {
    return this.http.post(this.authUrl, user);
  }

  public checkAuthentication(): Observable<any> {
    return this.http.get(this.checkUrl);
  }

  public updateUser(user: IUser): void {
    this.user$.next(user);
  }
}
