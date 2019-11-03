import { TestBed } from '@angular/core/testing';

import { DatabaseConnectService } from './database-connect.service';

describe('DatabaseConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabaseConnectService = TestBed.get(DatabaseConnectService);
    expect(service).toBeTruthy();
  });
});
