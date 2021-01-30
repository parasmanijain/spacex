import { Component, OnInit } from '@angular/core';
import { AppService } from '../app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SpaceX';
  programs = [];
  launchYears = [];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    let set = new Set();
    this.appService.getData().subscribe(res => {
      this.programs = res;
      this.launchYears = this.programs.forEach(program => {
        set.add(program.launch_year)
      });
      this.launchYears = [... set];
    },
    err => {
      console.log(err);
    });
  }
}
