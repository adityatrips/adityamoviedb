import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  async createAuthToken() {
    let tokenString = this.http.get(
      `${environment.baseUri}/authentication/token/new?api_key=${environment.apiKey}`
    );
    return await lastValueFrom(tokenString);
  }

  async createNewSession(requestToken: string) {
    let sessId = this.http.post(
      `${environment.baseUri}/authentication/session/new?api_key=${environment.apiKey}`,
      {
        request_token: requestToken,
      }
    );

    return await lastValueFrom(sessId);
  }

  async deleteSession(sessionId: string) {
    return await lastValueFrom(
      this.http.delete(
        `${environment.baseUri}/authentication/session?api_key=${environment.apiKey}`,
        {
          body: {
            session_id: sessionId,
          },
        }
      )
    );
  }

  async getTrendingMovies() {
    let movies = this.http.get(
      `${environment.baseUri}/trending/movie/day?&api_key=${environment.apiKey}`
    );
    return await lastValueFrom(movies);
  }

  async getSearchedMovie(
    language: string,
    query: string,
    page: number,
    region: string,
    year: number
  ) {
    let search = this.http.get(
      `${environment.baseUri}/search/movie?api_key=${environment.apiKey}&query=${query}&language=${language}&region=${region}&year=${year}&page=${page}`
    );
    return await lastValueFrom(search);
  }

  async getListOfLanguages() {
    let languages = this.http.get(
      `${environment.baseUri}/configuration/languages?api_key=${environment.apiKey}`
    );
    return await lastValueFrom(languages);
  }

  async getListOfRegions() {
    let regions = this.http.get(
      `${environment.baseUri}/configuration/countries?api_key=${environment.apiKey}`
    );
    return await lastValueFrom(regions);
  }

  async getDetailedMovieDesc(id: string) {
    let data = this.http.get(
      `${environment.baseUri}/movie/${id}?api_key=${environment.apiKey}`
    );
    return await lastValueFrom(data);
  }
}
