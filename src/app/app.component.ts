import {Component} from '@angular/core';
import {AuthConfig, NullValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {ClienteService} from "./cliente.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-oauth2';

  constructor(private oauthService: OAuthService, private clienteService: ClienteService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8081/realms/agenda',
    redirectUri: window.location.origin,
    clientId: 'agenda-client-web',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin());
  }

  login(): void {
    this.oauthService.initImplicitFlowInternal();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  listarClientes() {
    this.clienteService.listar().subscribe(resp => console.log(resp));
  }
}
