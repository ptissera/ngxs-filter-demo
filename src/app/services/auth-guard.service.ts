import { AuthenticationState } from './../states/authentication.states';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CanActivate } from '@angular/router';
import { of, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable()
export class AuthGuardService  implements CanActivate {
  constructor(private store: Store) {}

  canActivate() {
    return true;
  }

  login(loginModel: LoginModel): Observable<any> {
    return of({token: 'my-token', userName: loginModel.username});
  }

  logout(): Observable<any> {
    return of({});
  }
}
