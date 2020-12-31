import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlayListComponent } from './my-play-list.component';

describe('MyPlayListComponent', () => {
  let component: MyPlayListComponent;
  let fixture: ComponentFixture<MyPlayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlayListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
