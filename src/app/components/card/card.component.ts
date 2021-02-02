import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { IMission } from '../../interfaces/Mission';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CardComponent implements OnInit {

  programsData: Array<IMission> = [];
  isSmallScreen!: boolean;

  @Input('programs')
  get programs(): Array<IMission> {
    return this.programsData;
  }

  set programs(val) {
    this.programsData = val;
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
