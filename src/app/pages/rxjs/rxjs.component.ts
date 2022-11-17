import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    
    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log("Subs: ",valor),
    //   error => console.log("Error: ",error),
    //   ()=> console.info('Obs termino')
    // )
   this.intervalSubs =  this.retornaIntervalo().subscribe(console.log)
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaIntervalo():Observable<number>{
   return  interval(100)
    .pipe( 
      take(10),
      map( valor => valor +1),
      filter( valor => (valor % 2  === 0) ? true: false),
    )
  }

  retornaObservable():Observable<number>{
    return new Observable<number>( observer =>{
      let i = -1;
      const intervalo = setInterval( () =>{
        i++;
        observer.next(i);
        if(i=== 4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i ===2){
          i=0;
          observer.error('i llego a el valor de 2');
        }
      }, 1000);
    });
  }
}
