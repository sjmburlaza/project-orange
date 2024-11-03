import { group } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/shared/models/product.model';

interface Group {
  color: string[],
  price: string[],
  category: string[],
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
  selector: 'app-products-menu',
  templateUrl: './products-menu.component.html',
  styleUrls: ['./products-menu.component.scss']
})
export class ProductsMenuComponent {
  @Input() products!: ProductModel[];
  groups: any = {
    "color": {},
    "price": {},
    "category": {}
  }

  colorsAvailable: string[] = [];
  categoryAvailable: string[] = [];

  constructor() {}

  ngOnInit() {

    this.getGroups();
    console.log('groups', this.groups)
  }

  getColorsAvailable(products: ProductModel[]): string[] {
    const colors: string[] = [];
    products?.forEach(p => {
      p.colorsAvailable.forEach(color => {
        if (color?.name && !this.colorsAvailable.includes(color?.name)) {
          colors.push(color.name);
        }
      })
    })
    return colors;
  }

  getColorGroup(products: ProductModel[]) {
    const colorsAvailable = this.getColorsAvailable(products);
    const colorGroup: any = {};

    colorsAvailable.forEach(color => {
      colorGroup[color] = [];
    })

    products.forEach(product => {
      product.colorsAvailable.forEach(color => {
        const colorName = color.name;
        if (colorName) colorGroup[colorName].push(product)
      })
    })

    return colorGroup;
  }

  getPriceGroup(products: ProductModel[]) {
    const priceGroup: any = {
      [Price.TEN_BELOW]: [],
      [Price.TWENTY_BELOW]: [],
      [Price.THIRTY_BELOW]: [],
      [Price.FORTY_BELOW]: [],
      [Price.FIFTY_BELOW]: [],
      [Price.FIFTY_UP]: []
    }

    products.forEach(p => {
      const price = +p.price

      if (price < 10000) {
        priceGroup[Price.TEN_BELOW].push(p);
      } else if (price < 20000) {
        priceGroup[Price.TWENTY_BELOW].push(p);
      } else if (price < 30000) {
        priceGroup[Price.THIRTY_BELOW].push(p);
      } else if (price < 40000) {
        priceGroup[Price.FORTY_BELOW].push(p);
      } else if (price < 50000) {
        priceGroup[Price.FIFTY_BELOW].push(p);
      } else {
        priceGroup[Price.FIFTY_UP].push(p);
      }
    })

    return priceGroup;
  }

  getCategoriesAvailable(products: ProductModel[]): string[] {
    const categories: string[] = [];

    products.forEach(p => {
      if (p?.category && !this.categoryAvailable.includes(p.category)) {
        categories.push(p.category);
      }
    })

    return categories;
  }

  getCategoriesGroup(products: ProductModel[]) {
    const categoriesAvailable: string[] = this.getCategoriesAvailable(products);
    const catGroup: any = {};

    categoriesAvailable.forEach(c => {
      catGroup[c] = [];
    });

    products.forEach(product => {
      catGroup[product.category].push(product);
    });

    return catGroup;
  }

  getGroups() {
    this.groups.color = this.getColorGroup(this.products);

  }

}
