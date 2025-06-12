// import { Component } from '@angular/core';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
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

}
