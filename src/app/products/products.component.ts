import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductService } from '../services/product.service';
import { RightMenuGroup } from '../shared/models/group.model';
import { ProductModel } from '../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private unsubscribe$ = new Subject<void>();
  products!: ProductModel[];
  groups: RightMenuGroup[] = [];
  filteredProducts!: ProductModel[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.handleProductData(data));
  }

  handleProductData(data: any): void {
    this.filteredProducts = data;
  }

  onSelectGroup(group: any): void {
    console.log(group)
  }

  ngOnDestory(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
