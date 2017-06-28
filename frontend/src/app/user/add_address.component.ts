import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "ng2-ui-auth";
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {User} from "./user";

@Component({
  selector: 'app-add-address',
  templateUrl: './add_address.component.html',
  styleUrls: ['./add_address.component.css']
})
export class AddAddressComponent implements OnInit {

  user: User;
  isAddressAvailableBool: boolean = false;
  address: Address = {
    street: "",
    zip: "",
    city: ""
  };

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserWithAddress().subscribe(user => {
      this.user = user;
    });
  }

  isAddressComplete()
  {
    if (this.address.street != "" && this.address.zip != "" && this.address.city != "")
    {
      this.isAddressAvailableBool = true;
    }
    else
    {
      this.isAddressAvailableBool = false;
    }
  }

  addAddress()
  {
    this.user.street = this.address.street;
    this.user.zip = this.address.zip;
    this.user.city = this.address.city;

    this.userService.updateAddress(this.user).subscribe( data => {
      this.router.navigate(['/addressadded'])
    });
  }

}

export class Address
{
  street: string;
  zip: string;
  city: string;

  constructor(street: string, zip: string, city: string)
  {
    this.street = street;
    this.zip = zip;
    this.city = city;
  }
}
