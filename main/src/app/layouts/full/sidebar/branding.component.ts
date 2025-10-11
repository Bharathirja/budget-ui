import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  imports: [],
  template: `
    <!-- <a href="/" class="logodark"> -->
      <!-- <img
        src="./assets/images/logos/dark-logo.svg"
        class="align-middle m-2"
        alt="logo"
      /> -->
    <!-- <img class="align-middle m-2" src="/assets/images/logo/budget-logo.svg" alt="Budget Logo"  style="margin-right:8px;" />
    <span class="logo-text f-w-700 f-s-20 text-primary">Budget</span> -->
    <!-- </a> -->
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();
  constructor(private settings: CoreService) {}
}
