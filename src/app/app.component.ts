import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CoronaTracker';

  /* Set the width of the side navigation to 250px */
public openNav(): void {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
public closeNav(): void {
  document.getElementById("mySidenav").style.width = "0";
}
  
}
