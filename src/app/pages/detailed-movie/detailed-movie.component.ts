import { environment } from './../../../environments/environment';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-movie',
  templateUrl: './detailed-movie.component.html',
  styleUrls: ['./detailed-movie.component.scss'],
})
export class DetailedMovieComponent implements OnInit {
  constructor(
    private http: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  detail: any = {};
  imageBlob: string = environment.imageBlob;

  formatNumbers(num: number): string {
    let formNum = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
    return formNum;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(() => {
      this.http
        .getDetailedMovieDesc(this.activatedRoute.snapshot.params['id'])
        .then((desc: any) => {
          this.detail = desc;
          console.log(desc);
        });
    });
  }
}
