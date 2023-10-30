import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
userid!:number;
user!: User;
ticket!:Ticket;
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public ticketService :TicketService
  ) { }

  ngOnInit(): void {
    this.userid = this.route.snapshot.params['userid'];
    console.log(this.userid);
this.userService.find(this.userid).subscribe((data: User)=>{
  console.log(data);
  this.user = data;
});
this.ticketService.find(this.userid).subscribe((data: User)=>{
  console.log(data);
  this.user = data;
});
  }

}
