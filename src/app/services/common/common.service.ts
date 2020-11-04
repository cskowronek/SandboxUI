import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {BaseService} from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }

  // Get API version information
  getAPI() {
    return this.http.get(this.BASE_PATH)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get metadata about the authenticated API user.
  getUser() {
    return this.http.get(this.BASE_PATH + 'me')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Get information about the system with which the user is interacting.
  getSystem() {
    return this.http.get(this.BASE_PATH + 'system')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
