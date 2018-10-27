import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  fireUrl = 'https://heroesapp-ebeaa.firebaseio.com/heroes.json';
  heroeUrl = 'https://heroesapp-ebeaa.firebaseio.com/heroes/';

  constructor( private http: HttpClient) { }

  nuevoHeroe (heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post<Heroe>(this.fireUrl, body, httpOptions).pipe(map( res => {
      return res;
    }));
  }

  getHeroe ( key$: string ) {
    let url = `${ this.heroeUrl }/${ key$ }.json`;
    return this.http.get( url )
    .pipe(map(res => res ));
  }
  getHeroes ( ) {
    return this.http.get( this.fireUrl )
    .pipe(map(res => res ));
  }

  actualizarHeroe (heroe: Heroe, key$: string) {
    let body = JSON.stringify(heroe);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    let url = `${ this.heroeUrl }/${ key$ }.json`;

    return this.http.put<Heroe>( url, body, httpOptions).pipe(map( res => {
      return res;
    }));
  }

  borrarHeroe( key$: string ) {
    let url = `${this.heroeUrl}/${ key$ }.json`;
    return this.http.delete( url )
    .pipe(map( res => res ));
  }


}
