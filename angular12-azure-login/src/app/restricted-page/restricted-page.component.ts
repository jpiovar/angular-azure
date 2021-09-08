import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.scss']
})
export class RestrictedPageComponent implements OnInit {

  constructor(private msalService: MsalService) { }

  ngOnInit(): void {
  }

  getName(): string {
    const res = this.msalService?.instance?.getActiveAccount();
    return <string>res?.name;
  }

}
