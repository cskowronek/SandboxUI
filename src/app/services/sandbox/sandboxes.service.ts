import {Injectable} from '@angular/core';
import {BaseService} from '../base/base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {SandboxProvisioningRequestModel} from '../../shared/models/sandbox-provisioning-request-model.model';
import {SandboxUpdateRequestModel} from '../../shared/models/sandbox-update-request-model.model';
import {SandboxAliasModel} from '../../shared/models/sandbox-alias-model.model';
import {SandboxOperationRequestModel} from '../../shared/models/sandbox-operation-request-model.model';

@Injectable({
  providedIn: 'root'
})
export class SandboxesService extends BaseService{

  BASE_PATH = super.BASE_PATH + 'sandboxes/';

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Return all sandboxes of a realm.  Equivalent to:
   * <pre><code>
   *   /sandboxes
   * </code></pre>
   * @param includeDeleted  If set, return deleted sandboxes.
   */
  getSandboxes(includeDeleted: boolean) {
    const queryString = new HttpParams()
      .set('include_deleted', String(includeDeleted));
    return this.http.get(this.BASE_PATH, {params: queryString})
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Create a new sandbox within the realm. Equivalent to:
   * <pre><code>
   *   /sandboxes
   * </code></pre>
   * @param provisioningRequest Metadata about the new sandbox.
   * @see SandboxProvisioningRequestModel
   */
  createSandbox(provisioningRequest: SandboxProvisioningRequestModel) {
    return this.http.post(this.BASE_PATH, provisioningRequest)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Return details on a specific sandbox in a realm. Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}
   * </code></pre>
   * @param sandboxId The sandbox UUID.
   */
  getSandbox(sandboxId: string) {
    return this.http.get(this.BASE_PATH + sandboxId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Update a sandbox.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}
   * </code></pre>
   * @param updateRequest  Sandbox values to update.
   * @param sandboxId      The sandbox UUID.
   * @see SandboxUpdateRequestModel
   */
  updateSandbox(updateRequest: SandboxUpdateRequestModel, sandboxId: string) {
    return this.http.patch(this.BASE_PATH + sandboxId, updateRequest)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Delete a specific sandbox in a realm.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}
   * </code></pre>
   * @param sandboxId The sandbox UUID.
   */
  deleteSandbox(sandboxId: string) {
    return this.http.delete(this.BASE_PATH + sandboxId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Create a new sandbox alias.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/aliases
   * </code></pre>
   * Note that only a name is required to be passed in alias config
   * @param aliasConfig The alias for the sandbox
   * @param sandboxId The sandbox UUID.
   * @see SandboxAliasModel
   */
  createSandboxAlias(aliasConfig: SandboxAliasModel, sandboxId: string) {
    return this.http.post(this.BASE_PATH + sandboxId, aliasConfig)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieve a list of aliases for a sandbox.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/aliases
   * </code></pre>
   * @param sandboxId The sandbox UUID.
   */
  getSandboxAliases(sandboxId: string) {
    return this.http.get(this.BASE_PATH + sandboxId + '/aliases')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Read Alias configuration  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/aliases/{sandboxAliasId}
   * </code></pre>
   * Retrieves a dedicated alias for the sandbox. Can be called without authentication to get cookie values for the alias.
   * @param sandboxId       The sandbox UUID.
   * @param sandboxAliasId  The sandbox alias UUID..
   */
  getAliasConfiguration(sandboxId: string, sandboxAliasId: string) {
    return this.http.get(this.BASE_PATH + sandboxId + '/aliases/' + sandboxAliasId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a dedicated alias configuration for a sandbox.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/aliases/{sandboxAliasId}
   * </code></pre>
   * Retrieves a dedicated alias for the sandbox. Can be called without authentication to get cookie values for the alias.
   * @param sandboxId       The sandbox UUID.
   * @param sandboxAliasId  The sandbox alias UUID..
   */
  deleteAlias(sandboxId: string, sandboxAliasId: string) {
    return this.http.delete(this.BASE_PATH + sandboxId + '/aliases/' + sandboxAliasId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Request an operation on a sandbox within the realm.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/operations
   * </code></pre>
   * @param operation Operation to be carried out on a sandbox.
   * @param sandboxId The sandbox UUID.
   * @see SandboxOperationRequestModel
   */
  runSandboxOperation(operation: SandboxOperationRequestModel, sandboxId: string) {
    return this.http.post(this.BASE_PATH + sandboxId + '/operations', operation)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieve a list of all past and present operations on a sandbox within the realm. Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/operations
   * </code></pre>
   * @param from            Earliest date for which data is in the response. Thirty days in the past by default. Format is ISO 8601.
   * @param to              Latest date for which data is included in the response. Today's date by default. Format is ISO 8601.
   * @param operationState  State of operations included in the response. By default, all operations are included.
   * @param status          Status of operations included in the response. By default, all operations are included.
   * @param operation       Order of the list. Default value is ''asc''.
   * @param sortOrder       Order of the list. Default value is ''asc''.
   * @param sortBy          Field by which to order the list. By default, the list is not ordered.
   * @param page            The page to access in a paged response. Page numbers start with '0', which is the default value.
   * @param perPage         Count of elements on a page. The default value is '20'.
   * @param sandboxId       The sandbox UUID.
   * Note that only the "sandboxId" parameter is required.
   */
  // tslint:disable-next-line:max-line-length
  getSandboxOperations(from: string, to: string, operationState: string, status: string, operation: string, sortOrder: string, sortBy: string, page: number, perPage: number, sandboxId: string) {
    const queryString = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('oeration_state', operationState)
      .set('status', status)
      .set('operation', operation)
      .set('sort_order', sortOrder)
      .set('sort_by', sortBy)
      .set('page', String(page))
      .set('per_page', String(perPage));
    return this.http.get(this.BASE_PATH + sandboxId + '/operations', {params: queryString})
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Return details of a sandbox operation that was recently submitted, is currently in progress, or has already finished.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/operations/{operationId}
   * </code></pre>
   * @param sandboxId   The sandbox UUID.
   * @param operationId The sandbox UUID.
   */
  getSandboxOperation(sandboxId: string, operationId: string) {
    return this.http.get(this.BASE_PATH + sandboxId + '/operations/' + operationId)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Return all settings of the sandbox.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/settings
   * </code></pre>
   * @param sandboxId The sandbox UUID.
   */
  getSandboxSettings(sandboxId: string) {
    return this.http.get(this.BASE_PATH + sandboxId + '/settings')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Return information on sandbox usage.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/usage
   * </code></pre>
   * @param sandboxId The sandbox UUID.
   * @param from      Earliest date for which data is in the response. Thirty days in the past by default. Format is ISO 8601.
   * @param to        Latest date for which data is in the response. Thirty days in the past by default. Format is ISO 8601.
   */
  getSandboxUsage(sandboxId: string, from: string, to: string) {
    return this.http.get(this.BASE_PATH + sandboxId + '/settings')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Return information on sandbox storage capacity.  Equivalent to:
   * <pre><code>
   *   /sandboxes/{sandboxId}/storage
   * </code></pre>
   * @param sandboxId The sandbox UUID.
   */
  getSandboxStorage(sandboxId: string) {
    return this.http.get(this.BASE_PATH + sandboxId + '/storage')
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
