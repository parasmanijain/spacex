import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, forkJoin } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppService } from '../app/app.service';
import { IMission } from './interfaces/Mission';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'SpaceX';
  programs = Array<IMission>();
  launchYears = Array<number>();
  isLoadingData = false;
  isLoadingYear = false;
  landingPressed: any = null;
  launchPressed: any = null;
  yearPressed: any = null;
  smallScreen = false;

  private landingPressedSubscription = new Subscription();
  private launchPressedSubscription = new Subscription ();
  private yearPressedSubscription = new Subscription ();

  queryParams: any = {};
  data: any;
  constructor(private appService: AppService,
              private activatedRoute: ActivatedRoute,
              private location: Location, private router: Router,
              private breakpointObserver: BreakpointObserver) {
                if (typeof window !== 'undefined') {
                  const url = new URL(window.location.href);
                  this.launchPressed = url.searchParams.get('launch_success');
                  this.landingPressed = url.searchParams.get('land_success');
                  this.yearPressed = url.searchParams.get('launch_year');
                }
                if (this.launchPressed !== null) {
                  this.launchPressed  = this.launchPressed === 'true';
                  this.appService.launchPressed.next(this.launchPressed);
                  this.queryParams = {...this.queryParams, launch_success: this.launchPressed};
                    }
                if (this.landingPressed !== null) {
                  this.landingPressed  = this.landingPressed === 'true';
                  this.appService.landingPressed.next(this.landingPressed);
                  this.queryParams = {...this.queryParams, land_success: this.landingPressed};
                    }
                if (this.yearPressed !== null) {
                      this.appService.yearPressed.next(this.yearPressed);
                      this.queryParams = {...this.queryParams, launch_year: this.yearPressed};
                    }

                const yearList = this.appService.getData({});
                const launches = this.appService.getData(this.queryParams);
                forkJoin([yearList, launches]).subscribe(results => {
                  this.updateYearList(results[0]);
                  this.updateMissionList(results[1]);
                });
                }

  ngOnInit(): void {
    this.landingPressedSubscription = this.appService.landingPressed.subscribe((data: null) => {
        this.landingPressed = data;
    });
    this.launchPressedSubscription = this.appService.launchPressed.subscribe((data: null) => {
        this.launchPressed = data;
    });
    this.yearPressedSubscription = this.appService.yearPressed.subscribe((data: null) => {
        this.yearPressed = data;
    });
    this.breakpointObserver.observe([
      '(max-width: 1024px)'
        ]).subscribe(result => {
          if (result.matches) {
            this.smallScreen = true;
          } else {
            this.smallScreen = false;
          }
        });
  }

  landingFilter(flag: boolean): void {
    if (flag === this.appService.landingPressed.getValue()) {
      this.appService.landingPressed.next(null);
      delete this.queryParams.land_success;
    } else {
      this.appService.landingPressed.next(flag);
      this.queryParams = {...this.queryParams, land_success: flag};
    }
    this.applyFilter(this.queryParams);
  }

  launchFilter(flag: boolean): void {
    if (flag === this.appService.launchPressed.getValue()) {
      this.appService.launchPressed.next(null);
      delete this.queryParams.launch_success;
    } else {
      this.appService.launchPressed.next(flag);
      this.queryParams = {...this.queryParams, launch_success: flag};
    }
    this.applyFilter(this.queryParams);
  }

  yearFilter(flag: number): void {
    if (flag === this.appService.yearPressed.getValue()) {
      this.appService.yearPressed.next(null);
      delete this.queryParams.launch_year;
    } else {
      this.appService.yearPressed.next(flag);
      this.queryParams = {...this.queryParams, launch_year: flag};
    }
    this.applyFilter(this.queryParams);
  }

  applyFilter(params: {}): void {
    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: params}).toString();
    this.location.go(url);
    this.programs = [];
    this.fetchData(params);
  }

  fetchData(params: Params): void {
    this.isLoadingData = true;
    this.appService.getData(params).subscribe(res => {
      if (res && res.length) {
        this.updateMissionList(res);
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

  updateMissionList(results: Array<IMission>): void {
    let mission: IMission;
    this.programs = [];
    results.forEach((program: IMission) => {
      mission = program;
      this.programs.push(mission);
    });
  }

  updateYearList(results: Array<IMission>): void {
    if (results && results.length) {
      const set = new Set<number>();
      results.forEach((program: IMission) => {
        set.add(program.launch_year);
      });
      this.launchYears = [...set];
    }
  }

  ngOnDestroy(): void {
    if (this.landingPressedSubscription) {
      this.landingPressedSubscription.unsubscribe();
    }
    if (this.launchPressedSubscription) {
      this.launchPressedSubscription.unsubscribe();
    }
    if (this.yearPressedSubscription) {
      this.yearPressedSubscription.unsubscribe();
    }
  }
}
