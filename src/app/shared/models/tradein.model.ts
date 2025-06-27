export interface TradeIn {
  stepsHeader: StepHeader[];
  stepOne: Field[];
  stepTwo: Field[];
  stepThree: Field[];
  stepFour: Field[];
  stepOneDescription: StepOne;
  footerText: string;
}

export interface StepHeader {
  label: string;
  title: string;
}

export interface Field {
  title: string;
  field: string;
  placeholder?: string;
  content: any;
}

export interface StepOne {
  title: string;
  content: string[];
  note: string;
}

export interface StepTwo {

}

export interface StepThree {

}

export interface StepFour {

}

export interface CategoryTI {
  category: string;
  code: string;
  name: string;
}

export interface BrandTI {
  brandName: string;
  code: string;
  value: number;
  categoryCode: string;
  name: string;
}

export interface DeviceTI extends BrandTI {
  deviceName: string;
}

export interface StorageTI {
  size: string;
  code: string;
  value: number;
  deviceCode: string;
  name: string;
}