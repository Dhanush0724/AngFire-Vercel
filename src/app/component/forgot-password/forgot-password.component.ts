// import { Component } from '@angular/core';
// import { AuthService } from '../../shared/auth.service';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrl: './forgot-password.component.css'
// })
// export class ForgotPasswordComponent {

//     email : string = '';
//     isChecked:boolean=false;
//     constructor(private auth : AuthService) {}

//     forgotPassword() {

//       if (this.isChecked && this.email){

      
//       this.auth.forgotPassword(this.email);
//       this.email = '';
//       }
//       else {
//         alert("agreee man");
//       }
//     }
// }

import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service'; // Ensure this import is correct

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'] // If you have styles
})
export class ForgotPasswordComponent {
    email: string = '';
    isChecked: boolean = false;

    constructor(private auth: AuthService) {}

    forgotPassword() {
        if (this.isChecked && this.email) {
            this.auth.forgotPassword(this.email)
                .then(() => {
                    alert('Password reset link sent to your email!');
                    this.email = ''; // Clear the email field after sending
                })
                .catch((error: { message: string }) => {
                    alert('Error sending password reset link: ' + error.message);
                });
        } 
        if (!this.isChecked) {
          alert("voga lety");
        }
        else {
            alert("Please agree to the terms before submitting.");
        }
    }
}
