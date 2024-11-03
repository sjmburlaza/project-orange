import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../shared/models/product.model';

interface MainGroup {
  groupName: string,
  group: SubGroup[]
}

interface SubGroup {
  name: string,
  isSelected: boolean
}

enum Price {
  TEN_BELOW = "0 - 10,000",
  TWENTY_BELOW = "10,001 - 20,000",
  THIRTY_BELOW = "20,001 - 30,000",
  FORTY_BELOW = "30,001 - 40,000",
  FIFTY_BELOW = "40,001 - 50,000",
  FIFTY_UP = "50,001 and up"
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private destroy$ = new Subject<void>();
  products!: ProductModel[];
  // colorsAvailable: string[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.products = data.products;
        // console.log(this.products)
      });

    
  }

  getColorsAvailable(products: ProductModel[]) {
    const colors: string[] = [];
    products?.forEach(p => {
      p.colorsAvailable.forEach(color => {
        if (color?.name && !colors.includes(color?.name)) {
          colors.push(color.name);
        }
      })
    })
    return colors
  }

  getPrices() {
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

  getSubGroup(names: string[]): SubGroup[] {
    return names.map((name) => {
      return {
        name: name,
        isSelected: false
      }
    });
  }

  ngOnDestory(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
