export interface TradeIn {
  stepsHeader: StepHeader[];
  stepOneDescription: StepOneDescription;
  footerText: string;
}

export interface StepOneDescription {
  title: string; 
  content: any; 
  note: string
}

export interface StepHeader {
  label: string;
  title: string;
  subtext?: string;
}

export interface TradeInStep {
  id: number;
  stepOne?: StepOneField[];
  formData?: FormData;
  summary?: StepOneSummary;
  stepTwo?: StepTwo;
  stepThree?: StepThreeField[];
  stepFour?: StepFour;
}

export interface FormData {
  postalCode: string;
  category: string;
  brand: string;
  device: string;
  storage: string;
}

export interface StepOneSummary {
  brand: string;
  device: string;
  storage: string;
  finalAmount: number;
}

export interface StepOneField {
  title: string;
  fieldName: string;
  placeholder: string;
  value: string;
  // options: string[] | CategoryTI[] | BrandTI[] | DeviceTI[] | StorageTI[] | undefined;
  options: any;
}

export interface StepTwo {
  text1: string;
  icon: string;
  iconText: string;
  text2: string;
  imei: {label: string; placeholder: string; value: string};
}

export interface StepThreeField {
  code: string;
  question: string;
  info: string;
  response: string;
}

export interface StepFour {
  boxHeader: string;
  boxSubtext: string;
  disclaimer: string;
  tncHeader: string;
  tncText1: string;
  tncText2: string;
}

export interface CategoryTI {
  category: string;
  code: string;
  name: string;
}

export interface BrandTI {
  brandName: string;
  code: string;
  amount: number;
  categoryCode: string;
  name: string;
}

export interface DeviceTI {
  deviceName: string;
  brandName: string;
  code: string;
  amount: number;
  categoryCode: string;
  name: string;
}

export interface StorageTI {
  size: string;
  code: string;
  amount: number;
  deviceCode: string;
  name: string;
}

export type TradeInOption = string | CategoryTI | BrandTI | DeviceTI | StorageTI;
