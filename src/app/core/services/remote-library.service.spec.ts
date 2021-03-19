import { TestBed } from '@angular/core/testing';

import { RemoteLibraryService } from './remote-library.service';

describe('RemoteLibraryService', () => {
  let service: RemoteLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoteLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
