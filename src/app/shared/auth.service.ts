// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private fireauth : AngularFireAuth, private router : Router) { }
//   ////
//   ///
//   //lOGIN MEHTOD
//   login(email:string,password:string) {
//     this.fireauth.signInWithEmailAndPassword(email,password).then( ()=>
//     {
//       localStorage.setItem('token','true');
//       this.router.navigate(['dashboard']);
//     }, err => {
//         alert(err.message);
//         this.router.navigate(['/login']);
//     })
//   }

//   ///  REGISTER METHOD
//   register(email:string,password:string) {
//     this.fireauth.signInWithEmailAndPassword(email,password).then( ()=>
//     {

//       alert('Registration Successful');
     
//       this.router.navigate(['/login']);
//     }, err => {
//         alert(err.message);
//         this.router.navigate(['/register']);
//     })
//   }

//   //// sign out
//   logout() {
//     this.fireauth.signOut().then( () => {
//       localStorage.removeItem('token');
//     }, err => {
//       alert(err.message)
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
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['dashboard']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  // REGISTER METHOD
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
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
}
