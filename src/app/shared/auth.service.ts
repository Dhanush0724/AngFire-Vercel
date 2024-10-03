
// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private fireauth: AngularFireAuth, private router: Router) { }

//   // LOGIN METHOD
//   login(email: string, password: string) {
//     this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
//       localStorage.setItem('token', 'true');
      


//       if(this.user?.emailVerified == true){
//         this.router.navigate(['dashboard']);
//       } else{
//         this.router.navigate(['/verify-email']);
//       }
//     }).catch(err => {
//       alert(err.message);
//       this.router.navigate(['/login']);
//     });
//   }

//   // REGISTER METHOD
//   register(email: string, password: string) {
//     this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
//       alert('Registration Successful');
//       this.router.navigate(['/login']);
//       this.sendEmailForVerification(res.user);
//     }).catch(err => {
//       alert(err.message);
//       this.router.navigate(['/register']);
//     });
//   }

//   // SIGN OUT
//   logout() {
//     this.fireauth.signOut().then(() => {
//       localStorage.removeItem('token');
//       this.router.navigate(['/login']); // Optional: Navigate to login after logout
//     }).catch(err => {
//       alert(err.message);
//     });
//   }
//   ////password forgot
//   forgotPassword(email:string) {
//     this.fireauth.sendPasswordResetEmail(email).then(() => {
//       this.router.navigate(['/verify-email']);
//     }, err => {
//       alert('something went error');
//     })
//   }


//   ///emial verify
//   sendEmailForVerification(user:any){
//     user.sendEmailVerification().then((res : any )=>
//     {
//       this.router.navigate(['/verify-email']);
//     },(err:any) => {
//       alert('soemthing went wrong')
//     })
//   }
// }

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // LOGIN METHOD
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(userCredential => {
      const user = userCredential.user;

      localStorage.setItem('token', 'true');

      if (user?.emailVerified) {
        this.router.navigate(['dashboard']);
      } else {
        alert('Please verify your email before logging in.');
        this.router.navigate(['/verify-email']);
      }
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  // REGISTER METHOD
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(async (userCredential) => {
      const user = userCredential.user;

      alert('Registration Successful');
      this.router.navigate(['/login']);
      await this.sendEmailForVerification(user);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  // SIGN OUT
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']); // Optional: Navigate to login after logout
    }).catch(err => {
      alert(err.message);
    });
  }

  // PASSWORD FORGOT
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      alert('Password reset email sent. Please check your inbox.');
      this.router.navigate(['/verify-email']);
    }).catch(err => {
      alert('Something went wrong: ' + err.message);
    });
  }

  // EMAIL VERIFY
  async sendEmailForVerification(user: any) {
    await user.sendEmailVerification().then(() => {
      alert('Verification email sent. Please check your inbox.');
      this.router.navigate(['/verify-email']);
    }).catch((err: any) => {
      alert('Something went wrong: ' + err.message);
    });
  }
}
