import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorsComponent } from './diretores.component';

describe('DiretoresComponent', () => {
  let component: DirectorsComponent;
  let fixture: ComponentFixture<DirectorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorsComponent]
    });
    fixture = TestBed.createComponent(DirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
