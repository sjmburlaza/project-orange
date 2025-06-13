
export interface ProductModel {
    productId: string;
    name: string;
    category: string;
    imageUrl: string;
    colorsAvailable: string[];
    storageAvailable: StorageAvailable[];
    rating: string;
    priceOld?: Price;
    priceNow?: Price;
    priceDiscounted?: Price;
    priceSpecial?: Price;
    promotionText: string;
    description: string;
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