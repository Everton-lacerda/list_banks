import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

export const authConfig: AuthConfig = {
  clientId: environment.clientId,
  scope: environment.scope,
  responseType: 'code',
  issuer: environment.issuer,
  tokenEndpoint: environment.accessTokenURL,
  sessionChecksEnabled: true,
  showDebugInformation: true,
}
