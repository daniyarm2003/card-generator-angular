import { TestBed } from '@angular/core/testing';

import { TrackedFileService } from './tracked-file.service';

describe('TrackedFileService', () => {
  let service: TrackedFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackedFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
