import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular12-azure';

  apiResponse: string = '';

  constructor(
    private msalService: MsalService,
    private httpClient: HttpClient,
  ) {

  }
  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(res => {
      if (res?.account) {
        this.msalService.instance.setActiveAccount(res.account);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  login() {
    this.msalService.loginRedirect();
    // this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
    //   this.msalService.instance.setActiveAccount(response.account);
    // });
  }

  logout() {
    this.msalService.logout();
  }

  callProfile() {
    this.httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe(res => {
      this.apiResponse = JSON.stringify(res);
    });
  }
}
