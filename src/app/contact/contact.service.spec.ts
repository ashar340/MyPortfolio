import { TestBed, inject } from '@angular/core/testing';

import { ContactService } from './contact.service';
import 'rxjs/add/operator/map';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService]
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));

  it('should send POST',
    inject([HttpTestingController, ContactService], (httpMock: HttpTestingController, contactService: ContactService) => {

        const mockResponse = 2;

        contactService.sendEmail({}).subscribe(response => {
          expect(response.body).toEqual(mockResponse);
        });

        const mockRequest = httpMock
          .expectOne(`${contactService.API_ROOT_URL}/sendemail`);

        expect(mockRequest.request.responseType).toEqual('json');
        expect(mockRequest.request.method).toBe('POST');

        mockRequest.flush(mockResponse);
      }
    )
  );
});
