import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SloveniaComponent } from './slovenia.component';

describe('SloveniaComponent', () => {
  let component: SloveniaComponent;
  let fixture: ComponentFixture<SloveniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SloveniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SloveniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
