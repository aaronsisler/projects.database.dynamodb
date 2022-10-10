export interface Transaction {
  partitionKey?: string;
  sortKey?: string;
  data?: string;
  category?: string;
}
