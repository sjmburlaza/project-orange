export interface Voucher {
  id: string;
  code: string;
  description?: string;
  isExpired?: boolean;
  isApplied?: boolean;
}