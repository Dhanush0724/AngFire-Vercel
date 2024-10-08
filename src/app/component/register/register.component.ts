import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  showPassword: boolean = false; 

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async register() {
    if (this.email === '') {
      alert('Please enter email');
      return;
    }

    if (this.password === '') {
      alert('Please enter password');
      return;
    }

    try {
      await this.auth.register(this.email, this.password);
      
      this.email = '';
      this.password = '';
      alert('Registration successful');
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.message || 'Please try again.'}`);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword; // Toggle the visibility
  }
}
