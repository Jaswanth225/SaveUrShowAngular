import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../data';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';

interface BookingResponse {
  bookid: number;
    seatnum: string;
    movieId: number;
    userid: number;
    ticketQuantity:number;
    date: Date;
    slot :string;

}
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  form!:FormGroup;
  id!: number;
  data!: Data;
  tickets:Ticket[]=[];
  ticketQuantity: number=1; 
  availableSlots: string[] = ['Slot 1', 'Slot 2', 'Slot 3','Slot 4'];
  dateOptions: Date[] = [];
  bookingForm: FormGroup;
  bookingDetails:any;


  constructor(public dataService: DataService,
    public ticketService :TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,private bookingService: BookingService) {
    this.bookingForm = this.formBuilder.group({
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      seatNumbers: ['', Validators.required], 
      date: [null, Validators.required], 
      slot: [null, Validators.required] 
    });
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['movieId'];
    this.dataService.find(this.id).subscribe((i: Data)=>{
      this.data = i;
    });
    this.generateDateOptions();
  }
  
  incrementTicketQuantity(): void {
    if (this.ticketQuantity < 4) {
      this.ticketQuantity++;
    }
  }
  decrementTicketQuantity():void {
    if (this.ticketQuantity >0) {
      this.ticketQuantity--;
    }
  }

  
  generateDateOptions(): void {
    const currentDate = new Date();
    const nextTwoDays = new Date(currentDate);
    nextTwoDays.setDate(currentDate.getDate() + 2);

    while (currentDate <= nextTwoDays) {
      this.dateOptions.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }  
  isFormValid(): boolean {
    return this.bookingForm.valid;
  }
  proceedToPayment() {
    const totalCost = this.data.charges * this.ticketQuantity;
    const seatNumbers = this.bookingForm.get('seatNumbers')?.value;
  const date = this.bookingForm.get('date')?.value;
  const slot = this.bookingForm.get('slot')?.value;
    this.router.navigate(['/payment', totalCost]);
    const bookingDetails = {
      movieName: this.data.moviename,
      movieLink:this.data.movieLink,
      theatrename:this.data.theatrename,
      location:this.data.location,
      ticketQuantity: this.ticketQuantity,
      seatNumbers: seatNumbers,
     date: date,
    slot: slot,
    totalCost: totalCost,
    };
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
  }
  get f(){
    return this.form.controls;
  }  
  submit() {
    console.log('Form Values:', this.form.value);
  
    if (this.form.valid) {
      // Dates are valid, proceed with booking
      this.http.post('http://localhost:51140/api/booktickets/', this.form.value).subscribe(
        (response) => {
          // Cast the response to BookingResponse
          const bookingResponse = response as BookingResponse;
  
          // Access the bookingId property from the typed response
          const bookingId = bookingResponse.bookid;
  
          // Handle success
          console.log('Booking ID:', bookingId);
  
          // Save the form data to localStorage
        // Save the form data to localStorage
          localStorage.setItem('formData', JSON.stringify(this.form.value));

  
          // Navigate to the successful booking page
          this.router.navigate(['/payment']
        
      )
        }, 
        (err)=> {
          console.log(err);
        }
      )
    }

  
    }
  }
  
  

      

      
    
  
