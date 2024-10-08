import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
  this.email = this.email.trim();
  this.password = this.password.trim();

  console.log(this.email);
  console.log(this.password);

  // Check if either email or password is empty
  if (this.email === '' || this.password === '') {
    alert("Please enter both email and password."); // Updated alert message
    return; // Exit the function if either field is empty
  }

  // Proceed with login if both fields are filled
  this.auth.login(this.email, this.password).then(() => {
    // Reset fields on successful login
    this.email = '';
    this.password = '';
    // alert('Login successful'); // Optional success message
  }).catch(error => {
    console.error('Login error:', error);
    alert('Login failed. Please try again.'); // Handle login error
  });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  signInwithGoogle() {
    console.log('Google Sign-In clicked');
    this.auth.googleSignIn().then(() => {
      console.log('Google Sign-In successful');
      // Redirect to dashboard after Google Sign-In
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      console.error('Google Sign-In failed', err);
      alert('Google Sign-In failed: ' + err.message);
    });
  }
}
