import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../base/base.service';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RealmsService extends BaseService{

  // base API path
  BASE_PATH = super.BASE_PATH + 'realms/';

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Show realm information.  Equivalent to:
   * <pre><code>
   *   /realms/{realm}/
   * </pre></code>
   * @param realmId The four-letter ID of the realm.
   */
  getRealm(realmId: string) {
    return this.http.get(this.BASE_PATH + realmId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Show current realm configuration.  Equivalent to:
   * <pre><code>
   *   /realms/{realm}/configuration
   * </pre></code>
   * @param realmId The four-letter ID of the realm.
   */
  getConfiguration(realmId: string) {
    return this.http.get(this.BASE_PATH + realmId + '/configuration')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Update the customizable configuration of a realm.  Equivalent to:
   * <pre><code>
   *   /realms/{realm}/configuration
   * </pre></code>
   * @param realmId The four-letter ID of the realm.
   * @param configuration The four-letter ID of the realm.
   */
  updateConfiguration(realmId: string, configuration: UpdateRequestModel ) {
    return this.http.patch(
      this.BASE_PATH + realmId + '/configuration',
      configuration
    ).pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
