import { TestBed } from '@angular/core/testing';

import { S3HelperService } from './s3-helper.service';

describe('S3HelperService', () => {
  let service: S3HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S3HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
