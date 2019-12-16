import { from, Observable } from 'rxjs';
import { of } from 'rxjs';

export abstract class Mapper<E, T> {
    
  abstract mapFrom(source: E): T

  // mapOptional(source: Partial<E>): Partial<T> {}

  public observable(source: E | Array<E>): Observable<T> {
    if (source instanceof Array) {
      return from( source.map( this.mapFrom ) );
    } else {
      return of( this.mapFrom(source) );
    }
  }
}
