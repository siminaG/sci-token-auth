import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { ERole } from './models/ERole';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard], data: { roles: [ERole.User, ERole.Admin]}},
  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard], data: { roles: [ERole.User, ERole.Admin]}},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [ERole.Admin]}},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SignUpComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
