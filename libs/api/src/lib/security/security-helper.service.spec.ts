import { TestBed } from '@angular/core/testing';

import { SecurityHelperService } from './security-helper.service';

describe('SecurityHelperService', () => {
    let service: SecurityHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SecurityHelperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
