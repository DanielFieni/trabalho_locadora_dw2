import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateFormComponent } from './associate-form.component';

describe('AssociateFormComponent', () => {
  let component: AssociateFormComponent;
  let fixture: ComponentFixture<AssociateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociateFormComponent]
    });
    fixture = TestBed.createComponent(AssociateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
