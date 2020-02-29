import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class ContactService {
  readonly API_ROOT_URL = '';

  constructor(private http: HttpClient) {}

  sendEmail(queryObject: any) {
    const body = JSON.stringify(queryObject);
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post(`${this.API_ROOT_URL}/sendemail`, body, {headers: headers, observe: 'response'});
  }
}