import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  isLoadingYear = false;
  years: Array<number> = [];
  yearPressed!: number;
  launchPressed!: boolean;
  landingPressed!: boolean;

  @Input('launchYears')
  get launchYears(): Array<number> {
    return this.years;
  }

  set launchYears(val) {
    this.years = val;
  }

  @Input('year')
  get year(): number {
    return this.yearPressed;
  }

  set year(val) {
    this.yearPressed = val;
  }

  @Input('launch')
  get launch(): boolean {
    return this.launchPressed;
  }

  set launch(val) {
    this.launchPressed = val;
  }

  @Input('landing')
  get landing(): boolean {
    return this.landingPressed;
  }

  set landing(val) {
    this.landingPressed = val;
  }


  @Output() yearPressedEvt  = new EventEmitter();
  @Output() launchPressedEvt  = new EventEmitter();
  @Output() landingPressedEvt  = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  yearFilter(year: number): void {
    this.yearPressedEvt.emit(year);
  }

  launchFilter(flag: boolean): void {
    this.launchPressedEvt.emit(flag);
  }

  landingFilter(flag: boolean): void {
    this.landingPressedEvt.emit(flag);
  }

}
