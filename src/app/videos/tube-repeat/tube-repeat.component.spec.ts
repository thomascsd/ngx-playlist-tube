import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubeRepeatComponent } from './tube-repeat.component';

describe('TubeRepeatComponent', () => {
  let component: TubeRepeatComponent;
  let fixture: ComponentFixture<TubeRepeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TubeRepeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TubeRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
