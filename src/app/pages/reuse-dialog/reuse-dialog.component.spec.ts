import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseDialogComponent } from './reuse-dialog.component';

describe('ReuseDialogComponent', () => {
  let component: ReuseDialogComponent;
  let fixture: ComponentFixture<ReuseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReuseDialogComponent]
    });
    fixture = TestBed.createComponent(ReuseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
