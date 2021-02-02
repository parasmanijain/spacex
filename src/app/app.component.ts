import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppService } from '../app/app.service';
import { IMission } from './interfaces/Mission';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  queryParams = {};
  data: any;
  constructor(private appService: AppService,
              private activatedRoute: ActivatedRoute,
              private location: Location, private router: Router,
              private breakpointObserver: BreakpointObserver) {
                this.fetchYear();
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
                this.fetchData(this.queryParams);
                }

  ngOnInit(): void {
    this.landingPressedSubscription = this.appService.landingPressed.subscribe((data: null) => {
      if (data !== null) {
        this.landingPressed = data;
      }
    });
    this.launchPressedSubscription = this.appService.launchPressed.subscribe((data: null) => {
      if (data !== null) {
        this.launchPressed = data;
      }
    });
    this.yearPressedSubscription = this.appService.yearPressed.subscribe((data: null) => {
      if (data !== null) {
        this.yearPressed = data;
      }
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
