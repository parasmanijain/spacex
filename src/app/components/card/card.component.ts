import { Component, OnInit, Input } from '@angular/core';
import { IMission } from '../../interfaces/Mission';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  programsData: Array<IMission> = [];

  @Input('programs')
  get programs(): Array<IMission> {
    return this.programsData;
  }

  set programs(val) {
    this.programsData = val;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
