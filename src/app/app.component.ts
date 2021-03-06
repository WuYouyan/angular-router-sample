import { Component } from '@angular/core';
import { slideInAnimation } from 'src/assets/animations';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'angular-router-sample';

  // Diagnostic only: inspec touter configuration
  constructor(router: Router) { 
    // Use a custom replacer to display function names in the route configs
    const replacer = (key, value) => (typeof value ==='function') ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
