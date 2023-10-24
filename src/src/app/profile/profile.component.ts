import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Error:string='';
  SignUpForm:any
  User :any= {}
  constructor(private http: HttpClient) { }
  

  ngOnInit(): void {

    var x=localStorage.getItem('User');
    if(x)this.User=JSON.parse(x);
   console.log(this.User);



    this.SignUpForm=new FormGroup(
      {
        "email":new FormControl(this.User.email),
        "pwd":new FormControl(this.User.pwd),
        "userName":new FormControl(this.User.userName),
        "mobile":new FormControl(this.User.mobile),
        "REPWD":new FormControl(this.User.REPWD)
        
  
  });

  }
check(){
console.log(this.SignUpForm.value);return;
  
}
  onSubmit(){
    this.Error='';
    
    this.User.email = this.SignUpForm.value.email;
    this.User.mobile = this.SignUpForm.value.mobile;
    this.User.userName = this.SignUpForm.value.userName
    //console.log(this.User);return;
    if(this.User.mobile.length>10){this.Error="Invalid Mobile Number"; return;}
    if(this.User.userName.length==0){this.Error="Invalid UserName Number"; return;}
    

    this.http.post<any>('https://localhost:44315/users/update/',this.User).subscribe(data => {
       
    
  if(data.Status=='Success') {
    localStorage.setItem("User",JSON.stringify(this.User));
    alert('Profile Updated..');
   
  }else {this.Error = JSON.stringify(data);}

  });
//




    
  }
}
