import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-launch-landing-controls',
  templateUrl: './launch-landing-controls.component.html',
  styleUrls: ['./launch-landing-controls.component.scss']
})
export class LaunchLandingControlsComponent implements OnInit {

  titleValue!: string;
  filter!: boolean;

  @Input('title')
  get title(): string {
    return this.titleValue;
  }

  set title(val) {
    this.titleValue = val;
  }

  @Input('filterFlag')
  get filterFlag(): boolean {
    return this.filter;
  }

  set filterFlag(val) {
    this.filter = val;
  }

  @Output() filterEvt = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(flag: boolean): void {
    this.filterEvt.emit(flag);
  }

}
