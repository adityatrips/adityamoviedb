import { environment } from './../../../environments/environment.prod';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: ApiService) {}
  imageBlob: string = environment.imageBlob;

  movies: any = [];

  ngOnInit(): void {
    let result = this.http.getTrendingMovies();
    result.then((movie: any) => {
      this.movies = movie.results;
    });
  }

  gridStyle = { width: '50%', textAlign: 'center' };
}
