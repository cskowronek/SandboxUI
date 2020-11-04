import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  // base API path
  BASE_PATH = '/';

  constructor(protected http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Handle API errors
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) { // client-side error
      console.error('An error occurred:', error.error.message);
    } else { // server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
