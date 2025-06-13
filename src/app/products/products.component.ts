import { Component } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Group, Price, RightMenuGroup, RightMenuSubGroup } from '../shared/models/group.model';
import { ProductModel } from '../shared/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import * as CartActions from '../store/actions/cart.actions';
import { CartState } from '../store/reducers/cart.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  private unsubscribe$ = new Subject<void>();
  products: ProductModel[] = [];
  groups: RightMenuGroup[] = [];
  selectedProducts: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private store: Store<CartState>,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => this.handleProductData(data));
  }

  handleProductData(data: any): void {
    this.products = data;
    this.groups = this.getGroups(this.products);
    this.selectedProducts = [...this.products];
  }

  getGroups(products: ProductModel[]): RightMenuGroup[] {
    const mainGroup: RightMenuGroup[] = [
      {
        groupName: Group.CATEGORY,
        group: this.getSubGroup(this.getCategoriesAvailable(products)),
        isExpanded: true
      },
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
    ]
    return mainGroup;
  }

  getSubGroup(names: string[]): RightMenuSubGroup[] {
    return names.map((name) => {
      return {
        name: name,
        isSelected: false
      }
    });
  }

  getColorsAvailable(products: ProductModel[]): string[] {
    const colors: string[] = [];

    products?.forEach(product => {
      colors.push(...product.colorsAvailable)
    })
    return [...new Set(colors)];
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

  onSelectGroup(groups: RightMenuGroup[]): void {
    const selected = this.getSelectedProducts(groups);
    this.selectedProducts = selected && selected?.length > 0 ? selected : this.products;
  }

  getSelectedProducts(mainGroups: RightMenuGroup[]): ProductModel[] | undefined {
    if (mainGroups.length < 1) {
      return;
    }
    const subGroups: RightMenuSubGroup[] = mainGroups
      .map(mainGroup => mainGroup.group || [])
      .reduce((acc, group) => acc.concat(group.filter(subGroup => subGroup.isSelected)), []); 

    const selectedProducts: ProductModel[] = [];

    this.products.forEach(product => {
      subGroups.forEach(subGroup => {
        if ( product.colorsAvailable.filter(Boolean).includes(subGroup.name) || product.category === subGroup.name) {
          selectedProducts.push(product);
        }
      })
    })

    return selectedProducts.filter((product, index) => 
      selectedProducts.findIndex(p => p.sku === product.sku) === index
    );
  }

  addToCart(product: ProductModel): void {
    this.cartService.addEntry(product).pipe(take(1)).subscribe({
      next: () => this.store.dispatch(CartActions.loadCart()),
      error: (err) => console.error('Adding failed', err)
    });
  }
  
  ngOnDestory(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
