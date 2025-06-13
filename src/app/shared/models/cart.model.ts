export interface Cart {
    entries?: ProductModel[];
    servicesAvailable?: Service[];
    servicesSelected?: Service[];
}

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

interface StorageAvailable {
    size: string;
}

interface Price {
    amount: number;
    amountFormatted: string;
    totalAmount: number;
    totalAmountFormatted: string;
}

export interface Service {
    id: string;
    code: string;
    name: string;
    description: string;
    amount?: string;
    iconUrl: string;
    insuranceCategory?: string;
    skuApplicable: string[];
    details?: InsuranceDetails | any;
    plan?: InsurancePlan;
}

export interface InsuranceDetails {
    title: string;
    subtitle: string;
    plans: InsurancePlan[];
    tnc: { mainText: string, subtext: string};
}

export interface InsurancePlan {
    name: string;
    code: string;
    amount: string;
}

export interface AvailableService {

}

export interface selectedService {

}

