
// import { Component } from '@angular/core';
// import { AuthService } from '../../shared/auth.service';
// import { GeminiService } from '../../gemini.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'] // Corrected property name
// })
// export class DashboardComponent {

//   prompt: string = '';
//   chatHistory: { from: string; message: string }[] = []; // Ensure chatHistory has the correct type

//   constructor(private auth: AuthService, private geminiService: GeminiService) {
//     // Subscribe to message history
//     this.geminiService.getMessageHistory().subscribe((res) => {
//       if (res) {
//         this.chatHistory = res; // Update chatHistory with the entire message history
//       }
//     });
//   }

//   logout() {
//     this.auth.logout();
//   }

//   sendData() {
//     if (this.prompt) {
//       this.geminiService.generateText(this.prompt);
//       this.prompt = ''; // Clear the input field after sending
//     }
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { GeminiService } from '../../gemini.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Corrected property name
})
export class DashboardComponent {

  prompt: string = '';
  chatHistory: { from: string; message: string }[] = []; // Ensure chatHistory has the correct type
  loading: boolean = false; // Loading state

  constructor(private auth: AuthService, private geminiService: GeminiService) {
    // Subscribe to message history
    this.geminiService.getMessageHistory().subscribe((res) => {
      if (res) {
        this.chatHistory = res; // Update chatHistory with the entire message history
      }
    });
  }

  logout() {
    this.auth.logout();
  }

  sendData() {
    if (this.prompt) {
      this.loading = true; // Set loading to true when sending a message
      this.geminiService.generateText(this.prompt).then(() => {
        this.loading = false; // Set loading to false when response is received
      });
      this.prompt = ''; // Clear the input field after sending
    }
  }
}

