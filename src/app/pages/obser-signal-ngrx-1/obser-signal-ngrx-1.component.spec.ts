import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserSignalNgrx1Component } from './obser-signal-ngrx-1.component';

describe('ObserSignalNgrx1Component', () => {
  let component: ObserSignalNgrx1Component;
  let fixture: ComponentFixture<ObserSignalNgrx1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObserSignalNgrx1Component]
    });
    fixture = TestBed.createComponent(ObserSignalNgrx1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
