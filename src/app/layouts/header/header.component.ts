import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  verifybtn: boolean = false;

  btnAllow() {
    this.verifybtn = true;
  }

  btnDeny() {
    this.verifybtn = false;
  }
}
