import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private heroesUrl = 'api/heroes';

  /**
   * get list Heros
   */
  /*
  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }*/

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[] >(this.heroesUrl).pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  /**
   * get Hero by id
   * @param id hero
   */
  /*
  getHero(id: number): Observable<Hero> {
    return of(HEROES.find(hero => hero.id === id));
  }*/

/*  getHero(id: number): Observable<Hero> {
    const url = this.heroesUrl + '/' + id;
    console.log(url);
    return this.http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]),
      tap(h => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log('${outcome} hero id=${id}');
      }),
      catchError(this.handleError<Hero>('getHero id=${id}'))
    );
  }*/

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    console.log(url);
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log('${operation} failed: {error.message}');
      return of(result as T);
    };
  }

}
