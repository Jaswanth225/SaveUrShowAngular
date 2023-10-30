import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../data';
@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  id!: number;
  data!: Data;
  
  constructor( public dataService: DataService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['movieId'];
        
    this.dataService.find(this.id).subscribe((i: Data)=>{
      this.data = i;
      console.log(this.data);

    });
  }
  
  // getVideoId(url: string): string {
  //   const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([\w-]{11})/);
  //   return (match && match[1]) || '';
  // }
}
