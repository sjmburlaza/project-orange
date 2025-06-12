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
    title: string,
    subtitle: string,
    plans: InsurancePlan[],
    tnc: { mainText: string, subtext: string}
}

export interface InsurancePlan {
    name: string,
    code: string,
    amount: string
}

export interface AvailableService {

}

export interface selectedService {

}

