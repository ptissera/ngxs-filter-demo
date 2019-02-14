import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthGuardService } from '../services/auth-guard.service';
import { Login, Logout } from '../actions/authentication.actions';
import { tap } from 'rxjs/operators';


export class AuthStateModel {
  token?: string;
  username?: string;
}

@State<AuthStateModel>({
  name: 'auth'
})
export class AuthenticationState {

  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  constructor(private authService: AuthGuardService) {}

  @Action(Login)
  login({ patchState }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.authService.login(payload).pipe(tap((result) => {
      patchState({ token: result.token, username: payload.username });
    }));
  }

  @Action(Logout)
  logout({ setState, getState }: StateContext<AuthStateModel>) {
    const { token } = getState();
    return this.authService.logout().pipe(tap(() => {
      setState({});
    }));
  }
}
