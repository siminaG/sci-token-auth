import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userList: User[];
  returnUrl: string;
  
  constructor(private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router) { 
    this.userList = [];
  }

  ngOnInit(): void {
    this.returnUrl =  '/home';
    this.getUsers();
    console.log(this.userList);
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      data => this.userList = data,
      error => console.log(error)
    )
  }

  goHome(){
    this.router.navigate([this.returnUrl]);
  }
}
