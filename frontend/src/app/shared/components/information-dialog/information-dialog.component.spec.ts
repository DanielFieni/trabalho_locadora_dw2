import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDialogComponent } from './information-dialog.component';

describe('InformationDialogComponent', () => {
  let component: InformationDialogComponent;
  let fixture: ComponentFixture<InformationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationDialogComponent]
    });
    fixture = TestBed.createComponent(InformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
