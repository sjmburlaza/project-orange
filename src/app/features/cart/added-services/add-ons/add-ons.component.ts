import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddOn, AddOnCategory, AddOnProduct } from 'src/app/core/models/add-on.model';
import { AddOnsService } from 'src/app/core/services/add-ons.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-add-ons',
  templateUrl: './add-ons.component.html',
  styleUrls: ['./add-ons.component.scss'],
  standalone: true,
  imports: [CommonModule, ProductCardComponent]
})
export class AddOnsComponent implements OnInit {
  addOns: AddOn[] | undefined;
  itemsAdded = 0;
  addOnsCategories: AddOn[] = [];
  categoryProducts: AddOnProduct[] = [];
  mainProductSummary = '';
  CATEGORIES_IN_DESKTOP = 4;
  CATEGORIES_IN_MOBILE = 2;
  addOnStart = 0;
  addOnEnd = 0;
  addOnPrice = 0;
  addOnSavings = 0;
  selectedItemsQty = 0;
  selectedItemsAmount = 0;


  constructor(
    private addOnsService: AddOnsService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.addOnEnd = this.CATEGORIES_IN_DESKTOP;

    this.addOnsService.getAddOns().subscribe(res => {
      this.addOns = res;
      this.categoryProducts = res[0]?.products || [];
      this.addOnsCategories = res.slice(this.addOnStart, this.addOnEnd);
    });
  }

  onSelectCategory(item: AddOn) {
    this.categoryProducts = item.products || [];
  }

  goBack(): void {

  }

  goNext(): void {

  }

  close(): void {
    this.modalService.closeAll();
  }
}
