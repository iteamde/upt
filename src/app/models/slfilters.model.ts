export class SlFilters {
  location: string;
  vendor: string;
  price_max: string;
  price_min: string;
  onlymy: boolean;
  
  constructor() {
    this.location = '';
    this.vendor = '';
    this.price_max = '';
    this.price_min = '';
    this.onlymy = false;
  }
}
