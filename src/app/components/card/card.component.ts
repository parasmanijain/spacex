import { Component, OnInit, Input } from '@angular/core';
import { IMission } from '../../interfaces/Mission';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']

})
export class CardComponent implements OnInit {

  program!: IMission;
  isSmallScreen!: boolean;

  @Input('programData')
  get programData(): IMission {
    return this.program;
  }

  set programData(val) {
    this.program = val;
  }

  @Input('smallScreen')
  get smallScreen(): boolean {
    return this.isSmallScreen;
  }

  set smallScreen(val) {
    this.isSmallScreen = val;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
