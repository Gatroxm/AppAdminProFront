import { Component, Input, EventEmitter, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() progress:number = 20;
  @Input() btnClass:string = 'btn-info';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();



  cambiarValor( value:number ) :void{
    if(this.progress >=100 && value >=0){
      this.valorSalida.emit(100)
    }
    if(this.progress <=0 && value <0){
      this.valorSalida.emit(0)
    }
    this.valorSalida.emit(this.progress +value)
  }

  onChange(nuevoValor: number){
    if(nuevoValor >=100){
      this.progress =100;
    }else if( nuevoValor <=0){
      this.progress =0;
    } else{
      this.progress = nuevoValor;
    }
    this.valorSalida.emit(this.progress);
  }
}
