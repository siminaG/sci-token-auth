import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
  });
  this.authenticationService.logout();

  this.returnUrl =  '/login';
  }
  get f() { return this.loginForm.controls; }
  public signUp(){
    
    let user:User = {username: '', password: ''};
    user.username = this.f.username.value;
    user.password = this.f.password.value;

    this.authenticationService.signUp(user).subscribe(
      data => this.router.navigate([this.returnUrl]),
      error => console.error(error)
    );
    
  }

}
