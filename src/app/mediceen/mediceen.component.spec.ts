import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediceenComponent } from './mediceen.component';

describe('MediceenComponent', () => {
  let component: MediceenComponent;
  let fixture: ComponentFixture<MediceenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediceenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediceenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
