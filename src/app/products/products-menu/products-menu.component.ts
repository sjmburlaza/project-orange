import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MainGroup } from 'src/app/shared/models/group.model';


@Component({
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.scss']
})
export class ProductsMenuComponent {
  @Input() groups!: MainGroup[];
  @Output() selectGroupEvent = new EventEmitter<MainGroup[]>();

  constructor() {}

  ngOnInit() {

  }

  toggleAccordion(groupName: string | undefined) {
    this.groups.map(g => {
      if (g.groupName === groupName) {
        g.isExpanded = !g.isExpanded;
      }
    })
  }

  onSelect(event: Event) {
    if (event) {
      this.selectGroupEvent.emit(this.groups);
    }
  }

}
