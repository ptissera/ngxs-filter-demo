import { LoginComponent } from './components/login/login.component';
import { FilterLandingComponent } from './components/filter-landing/filter-landing.component';
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

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FilterListComponent,
    FilterLandingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  providers: [AuthenticationState],
  bootstrap: [AppComponent]
})
export class AppModule { }
