import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppService } from '../app/app.service';
import { IMission } from './interfaces/Mission';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SpaceX';
  programs = Array<IMission>();
  launchYears = Array<number>();
  isLoadingData = false;
  isLoadingYear = false;
  landingPressed: any = null;
  launchPressed: any = null;
  yearPressed: any = null;
  queryParams = {};
  data: any;
  constructor(private appService: AppService,
              private activatedRoute: ActivatedRoute,
              private location: Location, private router: Router) {
                this.fetchYear();
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href);
                  this.launchPressed = url.searchParams.get('launch_success');
                  this.landingPressed = url.searchParams.get('land_success');
                  this.yearPressed = url.searchParams.get('launch_year');
                }
                if (this.launchPressed !== null) {
                      this.appService.launchPressed.next(this.launchPressed);
                      this.queryParams = {...this.queryParams, launch_success: this.launchPressed};
                    }
                if (this.landingPressed !== null) {
                      this.appService.landingPressed.next(this.landingPressed);
                      this.queryParams = {...this.queryParams, land_success: this.landingPressed};
                    }
                if (this.yearPressed !== null) {
                      this.appService.yearPressed.next(this.yearPressed);
                      this.queryParams = {...this.queryParams, launch_year: this.yearPressed};
                    }
                this.fetchData(this.queryParams);
                }

  ngOnInit(): void {
    this.appService.landingPressed.subscribe((data: null) => {
      if (data !== null) {
        this.landingPressed = data;
      }
    });
    this.appService.launchPressed.subscribe((data: null) => {
      if (data !== null) {
        this.launchPressed = data;
      }
    });
    this.appService.yearPressed.subscribe((data: null) => {
      if (data !== null) {
        this.yearPressed = data;
      }
    });

  }

  landingFilter(flag: boolean): void {
    this.appService.landingPressed.next(flag);
    this.queryParams = {...this.queryParams, land_success: flag};
    this.applyFilter(this.queryParams);
  }
  launchFilter(flag: boolean): void {
    this.appService.launchPressed.next(flag);
    this.queryParams = {...this.queryParams, launch_success: flag};
    this.applyFilter(this.queryParams);
  }

  yearFilter(flag: number): void {
    this.appService.yearPressed.next(flag);
    this.queryParams = {...this.queryParams, launch_year: flag};
    this.applyFilter(this.queryParams);
  }

  applyFilter(params: {}): void {
    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: params}).toString();
    this.location.go(url);
    this.programs = [];
    this.fetchData(params);
  }

  fetchData(params: Params): void {
    let mission: IMission;
    this.isLoadingData = true;
    this.programs = [];
    this.appService.getData(params).subscribe(res => {
      if (res && res.length) {
          res.forEach((program: IMission) => {
            mission = program;
            this.programs.push(mission);
          });
        } else {
          this.programs = [];
        }
      this.isLoadingData = false;
      },
      err => {
        console.log(err);
        this.isLoadingData = false;
      });
  }

  fetchYear(): void {
    this.isLoadingYear = true;
    const set = new Set<number>();
    this.appService.getData({}).subscribe(res => {
        if (res && res.length) {
          res.forEach((program: IMission) => {
            set.add(program.launch_year);
          });
          this.launchYears = [...set];
          this.isLoadingYear = false;
        }
      },
      err => {
        console.log(err);
        this.isLoadingYear = false;
      });
  }
}
