


// import { Injectable } from '@angular/core';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class GeminiService {
//   private generativeAI: GoogleGenerativeAI;
  
//   // Specify the type for the message history
//   private messageHistory: BehaviorSubject<{ from: string; message: string }[]> = new BehaviorSubject<{ from: string; message: string }[]>([]);

//   constructor() { 
//     this.generativeAI = new GoogleGenerativeAI('AIzaSyCsb7ebFU-KprN0XRpkrNr6UV_2kHZHOAM');
//   }

//   async generateText(prompt: string) {
//     const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });

//     // Update message history with user prompt
//     this.messageHistory.next([
//       ...this.messageHistory.value,
//       { from: 'user', message: prompt }
//     ]);

//     try {
//       const result = await model.generateContent(prompt);
//       const response = await result.response; // Assuming result.response is a promise
//       const text = await response.text(); // Ensure this is correct based on the API's return type

//       console.log(text);
      
//       // Update message history with bot response
//       this.messageHistory.next([
//         ...this.messageHistory.value,
//         { from: 'bot', message: text }
//       ]);
//     } catch (error) {
//       console.error('Error generating text:', error);
//       // Optionally, you could push an error message to the history here
//     }
//   }

//   public getMessageHistory(): Observable<{ from: string; message: string }[]> {
//     return this.messageHistory.asObservable();
//   }
// }


import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;
  
  // Specify the type for the message history
  private messageHistory: BehaviorSubject<{ from: string; message: string }[]> = new BehaviorSubject<{ from: string; message: string }[]>([]);
  
  // Loading state
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.generativeAI = new GoogleGenerativeAI('AIzaSyCsb7ebFU-KprN0XRpkrNr6UV_2kHZHOAM');
  }

  async generateText(prompt: string): Promise<void> {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });

    // Update message history with user prompt
    this.messageHistory.next([
      ...this.messageHistory.value,
      { from: 'user', message: prompt }
    ]);

    this.loadingSubject.next(true); // Set loading to true

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response; // Assuming result.response is a promise
      const text = await response.text(); // Ensure this is correct based on the API's return type

      console.log(text);
      
      // Update message history with bot response
      this.messageHistory.next([
        ...this.messageHistory.value,
        { from: 'bot', message: text }
      ]);
    } catch (error) {
      console.error('Error generating text:', error);
      // Optionally, you could push an error message to the history here
    } finally {
      this.loadingSubject.next(false); // Set loading to false
    }
  }

  public getMessageHistory(): Observable<{ from: string; message: string }[]> {
    return this.messageHistory.asObservable();
  }

  public isLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable(); // Provide loading state as an observable
  }
}
