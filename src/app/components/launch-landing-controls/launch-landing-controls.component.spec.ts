import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchLandingControlsComponent } from './launch-landing-controls.component';

describe('LaunchLandingControlsComponent', () => {
  let component: LaunchLandingControlsComponent;
  let fixture: ComponentFixture<LaunchLandingControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchLandingControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchLandingControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
