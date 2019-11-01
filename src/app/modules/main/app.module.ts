// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MATERIAL
import { AppMaterialModule } from '../material/app-material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';

// MAIN
import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from './entrypoint/app.component';
import {
  AuthComponent,
  ListComponent,
  DetailComponent,
  NavBarComponent,
  AddCardComponent,
  EditCardComponent,
} from './components';
import { AuthService, AuthGuardService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ListComponent,
    DetailComponent,
    NavBarComponent,
    AddCardComponent,
    EditCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    AppMaterialModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditCardComponent],
})
export class AppModule {
}
