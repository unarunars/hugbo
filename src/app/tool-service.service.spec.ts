import { TestBed } from '@angular/core/testing';

import { ToolServiceService } from './tool-service.service';

describe('ToolServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolServiceService = TestBed.get(ToolServiceService);
    expect(service).toBeTruthy();
  });
});
