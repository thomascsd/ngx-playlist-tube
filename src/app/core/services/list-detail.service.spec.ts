import { TestBed } from '@angular/core/testing';

import { ListDetailService } from './list-detail.service';

describe('ListDetailService', () => {
  let service: ListDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
