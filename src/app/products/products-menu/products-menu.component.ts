import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RightMenuGroup } from 'src/app/shared/models/group.model';


@Component({
    selector: 'app-products-menu',
    templateUrl: './products-menu.component.html',
    styleUrls: ['./products-menu.component.scss'],
    standalone: false
})
export class ProductsMenuComponent {
  @Input() groups!: RightMenuGroup[];
  @Output() selectGroupEvent = new EventEmitter<RightMenuGroup[]>();

  constructor() {}

  ngOnInit() {
    console.log('groups', this.groups)
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
