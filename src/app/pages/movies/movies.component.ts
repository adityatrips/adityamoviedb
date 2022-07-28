import { environment } from './../../../environments/environment';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { FormBuilder } from '@angular/forms';
import { toNumber } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  listOfTagLanguages: any = [];
  listOfSelectedLanguages: string[] = [];
  listOfTagRegions: any = [];
  listOfSelectedRegions: string[] = [];
  selectedYear: string = '';
  query: string = '';
  page: number = 1;
  date: any = null;
  totalPages: number = 0;
  totalItems: number = 0;
  resultMovies: any = [];
  imageBlob: string = environment.imageBlob;

  searchForm = this.formBuilder.group({
    queryF: '',
  });

  constructor(private http: ApiService, private formBuilder: FormBuilder) {}

  onChange(result: Date): void {
    this.selectedYear = format(result, 'uuuu');
  }

  onRadioChange(val: string): void {
    console.log(val);
  }

  clearSearch(): void {
    this.listOfTagLanguages = [];
    this.listOfSelectedLanguages = [];
    this.listOfTagRegions = [];
    this.listOfSelectedRegions = [];
    this.selectedYear = '';
    this.query = '';
    this.page = 1;
    this.date = null;
    this.totalPages = 0;
    this.totalItems = 0;
    this.resultMovies = [];
    this.searchForm.reset();
  }

  search(): void {
    this.http
      .getSearchedMovie(
        this.listOfSelectedLanguages.join(','),
        this.searchForm.value.queryF,
        this.page,
        this.listOfSelectedRegions.join(','),
        toNumber(this.selectedYear)
      )
      .then((movies: any) => {
        this.resultMovies = movies.results;
        this.totalPages = movies.total_pages;
        this.totalItems = movies.total_pages;
        console.log(movies.results);
      });
  }

  changePage(newPage: number): void {
    this.page = newPage;
    this.http
      .getSearchedMovie(
        this.listOfSelectedLanguages.join(','),
        this.searchForm.value.queryF,
        newPage,
        this.listOfSelectedRegions.join(','),
        toNumber(this.selectedYear)
      )
      .then((movies: any) => {
        this.resultMovies = movies.results;
        this.totalPages = movies.total_pages;
        this.totalItems = movies.total_pages;
        window.scroll(0, 0);
      });
  }

  searchRegionByISO3166_1(iso: string): string {
    let regionName = '';
    for (let region of this.listOfTagRegions) {
      if (region.iso_3166_1 === iso) {
        regionName = region.english_name;
      }
    }
    return regionName;
  }

  searchGenreByISO639_1(iso: string): string {
    let regionName = '';
    for (let region of this.listOfTagLanguages) {
      if (region.iso_639_1 === iso) {
        regionName = region.english_name;
      }
    }
    return regionName;
  }

  ngOnInit(): void {
    this.http.getListOfLanguages().then((languages: any) => {
      this.listOfTagLanguages = languages;
    });
    this.http.getListOfRegions().then((regions: any) => {
      this.listOfTagRegions = regions;
    });
  }
}
