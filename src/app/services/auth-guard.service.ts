import { AuthenticationState } from './../states/authentication.states';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

@Injectable()
export class AuthGuardService  implements CanActivate {
  constructor(private store: Store) {}

  canActivate() {
    const token = this.store.selectSnapshot(AuthenticationState.token);
    return token !== undefined;
  }

  login(LoginModel) {

  }

  logout() {}
}
