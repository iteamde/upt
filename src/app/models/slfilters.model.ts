export class SlFilters {
  location: string;
  vendor: string;
  onlymy: boolean;
  minPrice: number;
  maxPrice: number;

  constructor() {
    this.location = '';
    this.vendor = '';
    this.onlymy = false;
    this.minPrice = 0;
    this.maxPrice =  +Infinity;
  }
}
