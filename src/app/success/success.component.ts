import { Component ,OnInit} from '@angular/core';
import { BookingService } from '../booking.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Data } from '@angular/router';
import { DataService } from '../data.service';
import emailjs from '@emailjs/browser';
import { FormGroup,FormBuilder } from '@angular/forms';

interface Movie{
  ticketQuantity: number;
  movieName: string;
  seatNumbers: number;
  date: Date;
  theatrename: string;
  location: string;
  slot: string;
  istransactionsuccessful:Boolean | undefined;
}

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  bookingDetails: any={
    sendEmail:'data.email'
  };
  data!: Data;
  showEmailForm: boolean=false;
  ticketQuantity: number=0;
  seatNumbers: number=0;
  movieName: string='';
  theatrename: string='';
  date: string='';
  slot: string='';
  location: string='';

  form: FormGroup=this.fb.group({
    from_name:'',
    to_name:'Admin',
    from_email:'',
    subject:'',
    message:'',
  });

  // async send()
  // {
  //   emailjs.init('thV1jbCHhin5_wLr6');
  //  let response = await emailjs.send("service_67uu986","template_ugj4gle",{
  //   // from_name: this.form.value.from_name,
  //   MovieName: this.bookingDetails.movieName,
  //   Date: this.bookingDetails.date,
  //   Location: this.bookingDetails.location,
  //   ticketQuantity: this.bookingDetails.ticketQuantity,
  //   SeatNumbers: this.bookingDetails.seatNumbers,
  //   slot: this.bookingDetails.slot,
  //   Theatre: this.bookingDetails.theatreName,
  //   from_email: this.form.value.from_email,
  
  //     });
  //     alert("message has been sent.");
  //     this.form.reset();
  // }
  
  async send() {
    emailjs.init('thV1jbCHhin5_wLr6');
    const emailParams = {
      movieName: this.bookingDetails.movieName,
      date: this.bookingDetails.date,
      Location: this.bookingDetails.location,
      ticketQuantity: this.bookingDetails.ticketQuantity,
      seatNumbers: this.bookingDetails.seatNumbers,
      Slot: this.bookingDetails.slot,
      theatrename: this.bookingDetails.theatrename,
      from_email: this.form.value.from_email,
    };
  
    try {
      const response = await emailjs.send("service_67uu986", "template_ugj4gle", emailParams);
      alert("Message has been sent.");
      this.form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email.");
    }
  }

  constructor(public dataService: DataService,private bookingService: BookingService,private http: HttpClient,private fb:FormBuilder) {
    
  }
  ngOnInit(): void {
    const bookingDetailsString = sessionStorage.getItem('bookingDetails');
    if (bookingDetailsString) {
      this.bookingDetails = JSON.parse(bookingDetailsString);
      this.theatrename = this.bookingDetails.theatrename;
    }
  }


  getSlotTime(slot: string): string {
    switch (slot) {
      case 'Slot 1':
        return '8am to 11am';
      case 'Slot 2':
        return '12pm to 3pm';
      case 'Slot 3':
        return '4pm to 7pm';
      case 'Slot 4':
        return '8pm to 11pm';
      default:
        return 'Unknown';
    }
  }

}
