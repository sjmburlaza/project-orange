
export interface ProductModel {
    id: string;
    sku: string;
    name: string;
    category: string;
    imageUrl: string;
    colorSelected: string;
    colorsAvailable: string[];
    storageAvailable: StorageAvailable[];
    rating: string;
    priceOld?: Price;
    priceNow?: Price;
    priceDiscounted?: Price;
    priceSpecial?: Price;
    promotionText: string;
    description: string;
    stockStatus: string;
    stockLevel: number;
}

export interface Price {
    amount?: number;
    amountFormatted?: string;
    totalAmount?: number;
    totalAmountFormatted?: string;
}

interface StorageAvailable {
    size: string;
}