export interface Location {
  address: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  lat: number;
  lon: number;
  store_number: string;
}

export interface PaymentMeta {
  by_order_of: null;
  payee: unknown;
  payer: unknown;
  payment_method: unknown;
  payment_processor: unknown;
  ppd_id: unknown;
  reason: unknown;
  reference_number: unknown;
}

export interface PlaidTransaction {
  account_id: string;
  amount: number;
  iso_currency_code: string;
  unofficial_currency_code: string;
  category: string[];
  category_id: string;
  check_number: string;
  date: string;
  authorized_date: string;
  location: Location;
  name: string;
  merchant_name: string;
  payment_meta: PaymentMeta;
  payment_channel: string;
  pending: boolean;
  pending_transaction_id: string;
  account_owner: string;
  transaction_id: string;
  transaction_code: string;
  transaction_type: string;
}
