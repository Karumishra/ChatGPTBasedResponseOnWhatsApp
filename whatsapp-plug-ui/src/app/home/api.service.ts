import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  private apiUrl = 'https://panel.rapiwha.com/send_message.php';
  private apiUrl1 = 'http://localhost:8082/api/sendToOpenAI';
  private apiUrl2 = 'http://panel.rapiwha.com/get_messages.php';


  constructor(private http: HttpClient) { }

  // Function to make the GET request and return the response as a string
  getResponseFromWhatsApp(apiKey: string, type: string, number: string, custom_data: string): Observable<any> {
    // Set up the query parameters
    const params = new HttpParams()
      .set('apikey', apiKey)
      .set('type', type)
      .set('number', number)
      .set('custom_data', custom_data);

    //Make the API GET request
    return this.http.get(this.apiUrl2, { params, responseType: 'text' });


  }

  // Function to make the POST request and return the response as a string
  getResponseFromOpenAI(input: any): Observable<string> {
    return this.http.post(this.apiUrl1, input, { responseType: 'text' });
  }

  sendMessage(apiKey: string, number: string, text: string) {
    // Set up the query parameters
    const params = new HttpParams()
      .set('apikey', apiKey)
      .set('number', number)
      .set('text', text);

    // Make the API POST request
    return this.http.post(this.apiUrl, params);
  }
}