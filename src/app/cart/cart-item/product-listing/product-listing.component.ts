import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {
  @Input() item!: ProductModel;
  @Output() deleteEntryEvent = new EventEmitter<string>();

  deleteEntry(itemId: string): void {
    this.deleteEntryEvent.emit(itemId);
  }
}
