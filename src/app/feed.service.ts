import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private REST_API_SERVER = "https://localhost:51140/api/feeds";
  
  private apiURL = "http://localhost:51140/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.apiURL+'/feeds');
  }
  
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/feeds/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(data:any): Observable<any> {
    return this.httpClient.post(this.apiURL + '/feeds/', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } 

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}