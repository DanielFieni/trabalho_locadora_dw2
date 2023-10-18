import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordationComponent } from './accordation.component';

describe('AccordationComponent', () => {
  let component: AccordationComponent;
  let fixture: ComponentFixture<AccordationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordationComponent]
    });
    fixture = TestBed.createComponent(AccordationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
