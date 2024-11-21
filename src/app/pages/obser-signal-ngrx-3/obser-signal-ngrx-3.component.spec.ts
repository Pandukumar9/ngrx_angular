import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserSignalNgrx3Component } from './obser-signal-ngrx-3.component';

describe('ObserSignalNgrx3Component', () => {
  let component: ObserSignalNgrx3Component;
  let fixture: ComponentFixture<ObserSignalNgrx3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObserSignalNgrx3Component]
    });
    fixture = TestBed.createComponent(ObserSignalNgrx3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
