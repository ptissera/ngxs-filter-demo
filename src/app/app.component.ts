import { Component, OnInit } from '@angular/core';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { Logout } from './actions/authentication.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'brownbag';

  constructor(private actions: Actions, private router: Router) {}

  ngOnInit() {
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
