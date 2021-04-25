import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtweetComponent } from './viewtweet.component';

describe('ViewtweetComponent', () => {
  let component: ViewtweetComponent;
  let fixture: ComponentFixture<ViewtweetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtweetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
