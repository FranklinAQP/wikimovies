import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private httpClient: HttpClient) {}
  getPopularMovies(page: string = '1'): Observable<any> {
    const params = new HttpParams()
      .set('api_key', environment.theMovieApi.apiKey)
      .set('page', page)
      .set('language', 'es-ES');
    return this.httpClient.get(
      `${environment.theMovieApi.baseUrl}${environment.theMovieApi.popularMovies}`,
      { params: params }
    );
  }

  getMovieById(idMovie: string): Observable<any> {
    return this.httpClient.get(
      `${environment.theMovieApi.baseUrl}${environment.theMovieApi.getMovie}${idMovie}?api_key=${environment.theMovieApi.apiKey}&language=es-ES`
    );
  }

  getCreditsId(idMovie: string): Observable<any> {
    return this.httpClient.get(
      `${environment.theMovieApi.baseUrl}${environment.theMovieApi.getMovie}${idMovie}/credits?api_key=${environment.theMovieApi.apiKey}&language=es-ES`
    );
  }
}
