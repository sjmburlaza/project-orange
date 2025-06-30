export interface Summary {
  items: SummaryItem[];
  total: SummaryPrice;
}

export interface SummaryItem {
  code: string;
  name: string;
  amount: SummaryPrice;
}

export interface SummaryPrice {
  value: number;
  formattedValue: string;
}