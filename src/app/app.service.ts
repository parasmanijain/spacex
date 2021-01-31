import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Params, ParamMap } from '@angular/router';
import { MAIN_URL } from './constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  yearPressed: any = new BehaviorSubject(null);
  launchPressed: any = new BehaviorSubject(null);
  landingPressed: any = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getData(params: Params): Observable<any> {
    return this.http.get(MAIN_URL, {
      params
      });
  }
}
