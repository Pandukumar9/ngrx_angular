import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserSignalNgrxListComponent } from './obser-signal-ngrx-list.component';

describe('ObserSignalNgrxListComponent', () => {
  let component: ObserSignalNgrxListComponent;
  let fixture: ComponentFixture<ObserSignalNgrxListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObserSignalNgrxListComponent]
    });
    fixture = TestBed.createComponent(ObserSignalNgrxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
