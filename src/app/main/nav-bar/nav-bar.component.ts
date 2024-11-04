// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isMobile: boolean = false;
  categories = [
    'Shop',
    'AI',
    'Mobile',
    'TV & AV',
    'Home Appliances',
    'Computing',
    'Displays',
    'Accessories',
    'SmartThings'
  ];

  constructor() {
    this.checkDeviceType();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event) this.checkDeviceType();
  }

  checkDeviceType() {
    this.isMobile = window.innerWidth < 768;
  }

}
