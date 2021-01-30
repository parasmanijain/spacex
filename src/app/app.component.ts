import { Component, OnInit } from '@angular/core';
import { AppService } from '../app/app.service';
import { IMission } from './interfaces/Mission';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SpaceX';
  programs = Array<IMission>();
  launchYears: any;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    let mission: IMission;
    const set = new Set();
    this.appService.getData().subscribe(res => {
      if (res && res.length) {
        res.forEach((program: IMission) => {
          mission = program;
          this.programs.push(mission);
          set.add(mission.launch_year);
        });
        this.launchYears = [...set];
      }
    },
    err => {
      console.log(err);
    });
  }
}
