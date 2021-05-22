import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TubeYoutubeComponent } from './tube-youtube.component';

describe('TubeYoutubeComponent', () => {
  let component: TubeYoutubeComponent;
  let fixture: ComponentFixture<TubeYoutubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TubeYoutubeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TubeYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
