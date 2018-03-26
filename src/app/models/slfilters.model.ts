export class SlFilters {
  location: string;
  vendor: string;
  onlymy: boolean;
  someRange:number[];

  constructor() {
    this.location = '';
    this.vendor = '';
    this.onlymy = false;
    this.someRange = [0,100000];
  }
}
