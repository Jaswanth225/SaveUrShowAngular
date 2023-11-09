



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedService } from '../feed.service';


@Component({
  selector: 'app-createfeed',
  templateUrl: './createfeed.component.html',
  styleUrls: ['./createfeed.component.css']
})
export class CreatefeedComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public postService: FeedService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      UserName: new FormControl('', Validators.required),
      Text: new FormControl('', Validators.required),
      Rating: [null, Validators.required],// Initialize rating to 0
    });
    console.log('Form:', this.form);
    console.log('Rating control:', this.form.get('Rating'));
  }
  

  get f() {
    return this.form.controls;
  }

  // submit() {
  //   console.log(this.form.value);
  //   this.postService.create(this.form.value).subscribe((res: any) => {
  //     console.log('User created successfully!');
  //     this.router.navigateByUrl('/customerdashboard');
  //     this.form.reset();
     
  //   });
  // }
  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res) => {
      console.log('User created successfully!');
      console.log(res);
      this.form.reset();
      this.router.navigate(['/customerDashboard']); // Use router.navigate to navigate to the desired route
    },(err)=>{
      console.log(err);
    });
  }
  
}