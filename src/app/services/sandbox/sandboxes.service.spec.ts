import {TestBed} from '@angular/core/testing';

import {SandboxesService} from './sandboxes.service';

describe('SandboxesService', () => {
  let service: SandboxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SandboxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
