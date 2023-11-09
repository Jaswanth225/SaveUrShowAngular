import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Email: string = 'Email';
  Password: string = 'pwd';
  showErrorMessage :boolean= false;
  errorMessage = '';

  constructor(private http: HttpClient,
    private userService :UserService) {}

  ngOnInit(): void {}

  
  Login(Email: string, PWD: string): any {
    var param = { email: Email, pwd: PWD };
    //console.log(param);

    this.http
      .get<any>('http://localhost:51140/api/Registrations/' + Email + '/' + PWD)
      .subscribe((data) => {
        
        console.log(data);

        if (data.Status == 'Error' && data.Message == 'Incorrect credentials') {
          this.showErrorMessage = true;
            this.errorMessage = 'Wrong password. Please try again.';
          alert(data.Message);
        } else if (data.Status == 'Error') {
          // Handle other types of errors if needed
          this.showErrorMessage = true;
          this.errorMessage = data.Message;
        }else {
          // localStorage.setItem('User', JSON.stringify(data));
          // this.showErrorMessage = false;
          // if (data.value.usertype == 'Admin') {
          //   window.location.href = '/adminDashboard';
          // } else {
          //   window.location.href = '/customerDashboard';
          // }
          const lowerCaseEmail=Email.toLowerCase();
          if(lowerCaseEmail=='admin@gmail.com'&& PWD=='admin123'){
            localStorage.setItem('User',JSON.stringify(data));
            window.location.href='/adminDashboard';
          }else{
            localStorage.setItem('User',JSON.stringify(data));
            localStorage.setItem('UserId',JSON.stringify(data.value.userid));

            window.location.href='/customerDashboard';
          }
        }
      }, (error) => {
        console.error('HTTP error:', error);
       
        this.showErrorMessage = true;
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
      );
    return false;
  }
}
function go(arg0: string) {
  throw new Error('Function not implemented.');
}
