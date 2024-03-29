import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiURL = "http://localhost:51140/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/BookTickets')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create (ticket:Ticket) : Observable<any>{
    return this.httpClient.post(this.apiURL+'/BookTickets/',JSON.stringify(ticket),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(userid:number):Observable<any>{
    return this.httpClient.get(this.apiURL+'/BookTickets/user/'+userid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(Bookid:number,ticket:Ticket):Observable<any>{
    return this.httpClient.put(this.apiURL+'/BookTickets/'+Bookid,JSON.stringify(ticket),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
delete(Bookid:number){
  return this.httpClient.delete(this.apiURL+'/BookTickets/'+Bookid,this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

errorHandler(error:any){
  let errorMessage='';
  if(error.error instanceof ErrorEvent){
    errorMessage=error.error.message;
  }
  else{
    errorMessage=`Error Code : ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
     
// import {  Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Ticket } from './ticket';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private apiURL = "http://localhost:57247/api";
    
//   /*------------------------------------------
//   --------------------------------------------
//   Http Header Options
//   --------------------------------------------
//   --------------------------------------------*/
//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     })
//   }
   
//   /*------------------------------------------
//   --------------------------------------------
//   Created constructor
//   --------------------------------------------
//   --------------------------------------------*/
//   constructor(private httpClient: HttpClient) { }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   getAll(): Observable<any> {
  
//     return this.httpClient.get(this.apiURL + '/BookTickets/')
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   create(ticket:Ticket): Observable<any> {
  
//     return this.httpClient.post(this.apiURL + '/BookTickets/', JSON.stringify(ticket), this.httpOptions)
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }  
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   find(id:number): Observable<any> {
  
//     return this.httpClient.get(this.apiURL + '/BookTickets/' + id)
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   update(id:number, ticket:Ticket): Observable<any> {
  
//     return this.httpClient.put(this.apiURL + '/BookTickets/' + id, JSON.stringify(ticket), this.httpOptions)
  
//     .pipe( 
//       catchError(this.errorHandler)
//     )
//   }
       
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   delete(id:number){
//     return this.httpClient.delete(this.apiURL + '/BookTickets/' + id, this.httpOptions)
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }
      
//   /** 
//    * Write code on Method
//    *
//    * @return response()
//    */
//   errorHandler(error:any) {
//     let errorMessage = '';
//     if(error.error instanceof ErrorEvent) {
//       errorMessage = error.error.message;
//     } else {
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     return throwError(errorMessage);
//   }
//   }
  