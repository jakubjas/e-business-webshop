import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { User } from "./user";
import 'rxjs/add/operator/map';
import { AuthService } from "ng2-ui-auth";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";
import {Observer} from "rxjs/Observer";

@Injectable()
export class UserService {

  public OnUserChange$: Observable<any>;
  private observer: Observer<any>;

  constructor(private http: Http, private router: Router, private authService: AuthService) {
    this.OnUserChange$ = new Observable(observer => this.observer = observer).share();
  }

  getUser()
  {
    let token = this.authService.getToken();
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('X-Auth-Token', token);

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/user', options).map(response => response.json());
  }

  getUsersFromDB()
  {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.get('http://localhost:9900/getusers', options)
      .map(response => <User[]>response.json());
  }

  getUserWithAddress(){

    return Observable.forkJoin([
      this.getUser().map(res => res),
      this.getUsersFromDB().map(res => res)
    ]).map(results => {
      let user = results[0];
      let users_db = results[1];
      return users_db.find(user_db => user_db.userId == user.loginInfo.providerKey);
    });
  }

  getUserWithAddressById(userId: string){

    return Observable.forkJoin([
      this.getUsersFromDB().map(res => res)
    ]).map(results => {
      let users_db = results[0];
      return users_db.find(user_db => user_db.userId == userId);
    });
  }

  updateAddress(user: User)
  {
    const headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers: headers});

    return this.http.post('http://localhost:9900/edituser', user, options)
      .map(response => response.json());
  }

  signIn(provider)
  {
    this.authService.authenticate(provider).do(_ => this.observer.next(null)).subscribe()
  }

  signOut()
  {
    this.authService.logout().do(_ => this.observer.next(null)).subscribe(res => {
      this.router.navigate(['/home'])
    })
  }
}
