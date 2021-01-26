import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  username: String = JSON.parse(localStorage.getItem('currentUser')).usernameOrEmail;;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit(): void {
    console.log(this.authenticationService.isAdmin());
    console.log(this.username);
  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  goToAdmin(){
    this.router.navigate(['/admin']);
  }

  isAdmin(){
    return this.authenticationService.isAdmin();
  }

}
