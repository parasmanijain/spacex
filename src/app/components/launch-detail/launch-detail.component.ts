import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LaunchDetailComponent implements OnInit {

  labelName!: string;
  valueName!: any;


  @Input('label')
  get label(): string {
    return this.labelName;
  }

  set label(val) {
    this.labelName = val;
  }

  @Input('value')
  get value(): any {
    return this.valueName;
  }

  set value(val) {
    this.valueName = val;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
