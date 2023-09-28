import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  MessageFromWhatsApp: any;
  ResponseFromOpenAI: any;

  constructor(private apiService: ApiService) { } // Inject the API service

  ngOnInit(): void {
    this.ReceiveMessageFromWhatsApp();
    //console.log(this.MessageFromWhatsApp);

    setTimeout(() => {
      this.ReceiveResponseFromOpenAI(this.MessageFromWhatsApp);
      //this.creationOfArray(this.ResponseFromOpenAI)
    }, 10000);

    setTimeout(() => {
      //this.ReceiveResponseFromOpenAI(this.MessageFromWhatsApp);
      this.creationOfArray(this.ResponseFromOpenAI)
    }, 20000);


  }
  sendMessage(text: string) {
    const apiKey = 'UJ3DBEOBNW'; // Keep your apiKey
    const number = '+919120'; // Keep receiver number

    this.apiService.sendMessage(apiKey, number, text).subscribe(
      (response) => {
        console.log('Message sent:', response);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  ReceiveMessageFromWhatsApp() {
    const apiKey = 'UJ3DBEOBNW';  // Keep your apiKey
    const number = '+919120'; // Keep receiver number
    const type = "IN";
    const custom_data = "Hello, ";
    this.apiService.getResponseFromWhatsApp(apiKey, type, number, custom_data).subscribe(
      (response) => {
        console.log('Message received:', response);
      },
      (error) => {
        console.error('Error in receiving message:', error);
      }
    );
    // this.MessageFromWhatsApp="Hello, How are you?";
  }
  ReceiveResponseFromOpenAI(msg: any) {
    this.apiService.getResponseFromOpenAI(msg).subscribe(
      res => {
        this.ResponseFromOpenAI = res;
      },
      error => {
        console.error('Error fetching response:', error);
      }
    );
  }


  flag1 = false;
  flag2 = false;
  resultArray = [''];

  creationOfArray(res: string) {
    this.resultArray = res.split(")")
  }

  // resultArray=this.ResponseFromOpenAI.split(")")
  msg1 = ''
  buttonColor = "#007bff"
  sendResponse1() {
    this.msg1 = "Message Send Sucessfully!"
    this.buttonColor = "green"
    this.flag1 = true;
    this.sendMessage(this.resultArray[1].slice(0, -1))
    //code to send whatsapp res 1

  }
  msg2 = ''
  buttonColor1 = "#007bff"
  sendResponse2() {
    this.msg2 = "Message Send Sucessfully!"
    this.buttonColor1 = "green"
    this.flag2 = true;
    this.sendMessage(this.resultArray[2])
    //code to send whatsapp res 2

  }
}
