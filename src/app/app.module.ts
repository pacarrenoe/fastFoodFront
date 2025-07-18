import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {environment} from "../environments/environment";
import {LoadingInterceptor} from "./interceptors/loading.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from "@angular/material/form-field";
import {AuthInterceptor} from "./auth/auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true
    }),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  exports: [
    ConfirmDialogComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
