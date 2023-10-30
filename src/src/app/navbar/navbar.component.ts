import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  IsLoggedIn:boolean=false
  IsAdmin:boolean=false
  
  constructor() { }

  ngOnInit(): void {

    
    this.IsLoggedIn=localStorage.getItem("User")!=null ;
    var x = localStorage.getItem("User");
   if(x)this.IsAdmin=JSON.parse(x).userName=='Admin';
    
    

 }
//  this.load();



 Logout(){

   localStorage.removeItem("User");
   location.href = "/login";
   
 }

}
