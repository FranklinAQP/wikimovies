import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IcharacterResponse, Result } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCharacter(page: string = '1'): Observable<IcharacterResponse> {
    const params = new HttpParams()
      .set('page', page);
    return this.httpClient.get<IcharacterResponse>(
      `${environment.rickandmortyapi.baseUrl}${environment.rickandmortyapi.character}`,
      { params: params }
    );
  }

}
