import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserSignalNgrx2Component } from './obser-signal-ngrx-2.component';

describe('ObserSignalNgrx2Component', () => {
  let component: ObserSignalNgrx2Component;
  let fixture: ComponentFixture<ObserSignalNgrx2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObserSignalNgrx2Component]
    });
    fixture = TestBed.createComponent(ObserSignalNgrx2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
