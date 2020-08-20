import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-input-quantity',
  templateUrl: './input-quantity.component.html',
  styleUrls: ['./input-quantity.component.scss']
})
export class InputQuantityComponent implements OnInit {
  constructor() { }
  @Input() quantity: number = 0;
  @Output() focusOut: EventEmitter<number> = new EventEmitter<number>();
  @Output() flag: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {}
  plus(){
      this.quantity += 1;
      this.focusOut.emit(this.quantity);
      this.flag.emit(true);
  }
  minus(){
    this.quantity -= 1;
    this.focusOut.emit(this.quantity);
    this.flag.emit(false);
  }
}