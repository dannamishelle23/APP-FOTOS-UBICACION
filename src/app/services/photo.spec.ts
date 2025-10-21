import { TestBed } from '@angular/core/testing';
import { Platform } from '@ionic/angular';

import { PhotoService } from './photo';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Platform]
    });
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});