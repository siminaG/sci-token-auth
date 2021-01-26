import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ERole } from '../models/ERole';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(user: User) {
        return this.http.post<any>(`http://localhost:8080/auth/signin`, user)
            .pipe(map(response => {
                // login successful if there's a jwt token in the response
                response.role = this.getRole(response.accessToken);
                if (response && response.accessToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(response));
                }

                return response;
            }));
    }

    signUp(user: User){
        return this.http.post<any>(`http://localhost:8080/auth/signup`, user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getRole(token: any){
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        return decodedToken.roles;
    }

    isAdmin(): boolean{
        if (JSON.parse(localStorage.getItem('currentUser')).role.indexOf(ERole.Admin) === 0) {
          return true;
        } else
        return false;
      }
    
}