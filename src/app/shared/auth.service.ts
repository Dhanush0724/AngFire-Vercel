


import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // LOGIN METHOD
  login(email: string, password: string): Promise<void> {
    return this.fireauth.signInWithEmailAndPassword(email, password).then(userCredential => {
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
  register(email: string, password: string): Promise<void> {
    return this.fireauth.createUserWithEmailAndPassword(email, password).then(async (userCredential) => {
      const user = userCredential.user;

      alert('Registration Successful');
      await this.sendEmailForVerification(user);
      this.router.navigate(['/login']);
    }).catch(err => {
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  // SIGN OUT
  logout(): Promise<void> {
    return this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']); // Optional: Navigate to login after logout
    }).catch(err => {
      alert(err.message);
    });
  }

  // PASSWORD FORGOT
  forgotPassword(email: string): Promise<void> {
    return this.fireauth.sendPasswordResetEmail(email).then(() => {
      alert('Password reset email sent. Please check your inbox.');
      this.router.navigate(['/verify-email']);
    }).catch(err => {
      alert('Something went wrong: ' + err.message);
    });
  }

  // EMAIL VERIFY
  async sendEmailForVerification(user: any): Promise<void> {
    await user.sendEmailVerification().then(() => {
      alert('Verification email sent. Please check your inbox.');
      this.router.navigate(['/verify-email']);
    }).catch((err: any) => {
      alert('Something went wrong: ' + err.message);
    });
  }

  // GOOGLE SIGN-IN
  googleSignIn(): Promise<void> {
    const provider = new GoogleAuthProvider();

    return this.fireauth.signInWithPopup(provider).then((res: any) => {
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      if (err.code === 'auth/cancelled-popup-request') {
        console.warn('Popup already open, cancelling the current request.');
      } else if (err.code === 'auth/popup-blocked') {
        alert('Popup was blocked by the browser. Please enable popups for this site.');
      } else {
        alert('Error during Google Sign-In: ' + err.message);
      }
    });
  }
}
