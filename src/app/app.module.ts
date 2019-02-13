import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterComponent } from './components/filter/filter.component';
import { FilterState } from './states/filter.states';
import { FilterListComponent } from './components/filter-list/filter-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationState } from './states/authentication.states';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FilterListComponent,
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([FilterState, AuthenticationState], {developmentMode: true}),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
