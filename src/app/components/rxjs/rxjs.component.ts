import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { }

  ngOnInit() {
    /*
    // Subscribirse a Retorna Observable
    this.retornaObsevable().pipe(
      retry(1)
    )
    .subscribe(
      valor => console.log('Sub:' , valor),
      error => console.warn ('Error', error),
      () => console.log('Completado')
    );
    */

    // Subscribirse a Retorna Intervalo

    this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        (valor) => console.log(valor)
      );
  }
/*
    let i: number  = 0;

    const obs$ = new Observable<number> ( observer => {
          const intervalo = setInterval( () => {
                i++;
                observer.next(i);
                if ( i === 4 ) {
                  clearInterval ( intervalo);
                  observer.complete();
                }
                if ( i === 2 )  {
                  observer.error ( 'i llego al valor de 2');
                }
          }, 1000 );
    } );

    obs$.pipe(
      retry(1)
    )
    .subscribe(
      valor => console.log('Sub:' , valor),
      error => console.warn ('Error', error),
      () => console.log('Completado')
    );

     obs$.pipe(
      retry(1)
    )
    .subscribe(
      valor => console.log('Sub:' , valor),
      error => console.warn ('Error', error),
      () => console.log('Completado')
    );
*/

/* Funcion */

  retornaIntervalo(): Observable<number> {
    return interval(1000)
          .pipe (
             /*take(10),*/  /* Sacarlo si se quiere probar el unsubcriber */
             map ( valor => valor + 1 ),
             filter ( valor => (valor % 2  === 0 ) ? true : false  )
          );

  }

  retornaObsevable(): Observable<number> {

        let i: number  = 0;

        const obs$ = new Observable<number> ( observer => {
              const intervalo = setInterval( () => {
                    i++;
                    observer.next(i);
                    if ( i === 4 ) {
                      clearInterval ( intervalo);
                      observer.complete();
                    }
              }, 1000 );
        } );

        return obs$;
  }

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

}
