import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "ng2-ui-auth";
import {UserService} from "./user.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign_in.component.html',
  styleUrls: ['./sign_in.component.css']
})
export class SignInComponent {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  socialLogin(provider)
  {
    this.userService.signIn(provider);
    this.router.navigate(['/home'])
  }
}
