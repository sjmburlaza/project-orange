import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Group, MainGroup, Price, SubGroup } from '../shared/models/group.model';
import { ProductModel } from '../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private destroy$ = new Subject<void>();
  products!: ProductModel[];
  groups: MainGroup[] = [];
  selectedProducts: ProductModel[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.products = data.products;
        this.groups = this.getMainGroup(this.products);
        this.selectedProducts = [...this.products];
      });
  }

  getMainGroup(products: ProductModel[]): MainGroup[] {
    const mainGroup: MainGroup[] = [
      {
        groupName: Group.COLOR,
        group: this.getSubGroup(this.getColorsAvailable(products)),
        isExpanded: true
      },
      {
        groupName: Group.PRICE,
        group: this.getSubGroup(this.getPrices()),
        isExpanded: true
      },
      {
        groupName: Group.CATEGORY,
        group: this.getSubGroup(this.getCategoriesAvailable(products)),
        isExpanded: true
      }
    ]
    return mainGroup;
  }

  getSubGroup(names: string[]): SubGroup[] {
    return names.map((name) => {
      return {
        name: name,
        isSelected: false
      }
    });
  }

  getColorsAvailable(products: ProductModel[]): string[] {
    const colors: string[] = [];

    products?.forEach(p => {
      p.colorsAvailable.forEach(color => {
        if (color?.name && !colors.includes(color?.name)) {
          colors.push(color.name);
        }
      })
    })
    return colors;
  }

  getPrices(): string[] {
    return [
      Price.TEN_BELOW,
      Price.TWENTY_BELOW,
      Price.THIRTY_BELOW,
      Price.FORTY_BELOW,
      Price.FIFTY_BELOW,
      Price.FIFTY_UP
    ]
  }

  getCategoriesAvailable(products: ProductModel[]): string[] {
    const categories: string[] = [];

    products.forEach(p => {
      if (p?.category && !categories.includes(p.category)) {
        categories.push(p.category);
      }
    })
    return categories;
  }

  onSelectGroup(groups: MainGroup[]) {
    const selected = this.getSelectedProducts(groups);
    this.selectedProducts = selected && selected?.length > 0 ? selected : this.products;
  }

  getSelectedProducts(mainGroups: MainGroup[]) {
    if (mainGroups.length < 1) {
      return;
    }
    const subGroups: SubGroup[] = mainGroups
      .map(mainGroup => mainGroup.group || [])
      .reduce((acc, group) => acc.concat(group.filter(subGroup => subGroup.isSelected)), []); 

    const selectedProducts: ProductModel[] = [];

    this.products.forEach(product => {
      subGroups.forEach(subGroup => {
        if ( product.colorsAvailable.map(color => color.name).filter(Boolean).includes(subGroup.name) ||
          product.priceGroup === subGroup.name ||
          product.category === subGroup.name) {
          selectedProducts.push(product);
        }
      })
    })

    return selectedProducts.filter((product, index) => 
      selectedProducts.findIndex(p => p.productId === product.productId) === index
    );


  }

  ngOnDestory(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
