import { Component,OnInit } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const inputDate = new Date(control.value);
    const currentDate = new Date();
    
    if (inputDate <= currentDate) {
      return { futureDate: true }; // Return an error if the date is not in the future
    }
    
    return null; // Return null if the date is valid
  };
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  bankForm: FormGroup;
   totalCost!:number;
  minDate = new Date().toISOString().split('T')[0];
  cardNumber: any;
  ExpiryDate: string = '';
  CVV: any;
  showSuccessMessage: boolean = false;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute) {
    this.bankForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      ExpiryDate: ['', [Validators.required, futureDateValidator()]],
      CVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]] // Apply the custom validator here
    });
  }
  ngOnInit(): void {this.route.params.subscribe((params) => {
    this.totalCost = +params['totalCost']; // Convert it to a number
  });}
  
  submitBankDetails() {
    const bankCredData = {
      cardNumber: this.cardNumber,
      ExpiryDate: this.ExpiryDate,
      CVV: this.CVV, 
      isActive: true, 
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  booking() {
    alert('Transaction complete!!!');
  }
  // makePhonePePayment() {
  //   // Implement PhonePe payment logic here
  //   this.updatePaymentStatus('Processing PhonePe payment...');
  // }

  // makeGooglePayPayment() {
  //   // Implement Google Pay payment logic here
  //   this.updatePaymentStatus('Processing Google Pay payment...');
  // }
  // makePaytmPayment() {
  //   // Implement Paytm payment logic here
  //   this.updatePaymentStatus('Processing Paytm payment...');
  // }

  // makeDebitCardPayment() {
  //   // Implement Debit Card payment logic here
  //   this.updatePaymentStatus('Processing Debit Card payment...');
  // }

  private updatePaymentStatus(status: string) {
    // Update the payment status message
    const paymentResultElement = document.getElementById('paymentResult');
    if (paymentResultElement) {
      paymentResultElement.textContent = status;
    }
  }

}

