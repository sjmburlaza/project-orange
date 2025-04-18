export interface Cart {
    entries?: Entry[],
    servicesAvailable?: Service[],
    servicesSelected?: Service[]
}

export interface Entry {
    code: string;
    name: string;
    category: string;
    color: string;
    stockStatus: string;
    quantity: number;
    priceOld: Price;
    priceNow: Price;
    priceDiscounted: Price;
    priceSpecial: Price;
    priceSavings: Price;
}

interface Price {
    amount: number;
    amountFormatted: string;
    totalAmount: number;
    totalAmountFormatted: string;
}

export interface Service {
    code: string;
    name: string;
    description: string;
    amount?: string;
    iconUrl: string;
    insuranceCategory?: string;
    skuApplicable: string[];
}

