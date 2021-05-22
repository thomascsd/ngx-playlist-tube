import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubeShuffleComponent } from './tube-shuffle.component';

describe('TubeShuffleComponent', () => {
  let component: TubeShuffleComponent;
  let fixture: ComponentFixture<TubeShuffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TubeShuffleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TubeShuffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
