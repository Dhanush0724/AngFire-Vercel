import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class LoginComponent {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) {}

  login() {

    if (this.email == ''){
      alert("enter all the values");
      return;
    }
    if (this.password == '') {
      alert("enter all the password");
      return;
  }

  this.auth.login(this.email,this.password);
  this.email = '';
  this.password = '';

}

}
