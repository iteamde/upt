import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dropdown-package',
  templateUrl: './dropdown-package.component.html',
  styleUrls: ['./dropdown-package.component.scss'],
  host: {
    "(document:click)": "onClick()"
  }
})
export class DropdownPackageComponent implements OnInit {


  @Input() autocompletePackage: any;
  @Input() packageLabel: any;
  @Output() packageLabelChange: EventEmitter<any> = new EventEmitter<any>();

  public isOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  // hideSubMenu(){
  //   //console.log(el);
  //   setTimeout(()=>{
  //     this.isOpen = false;
  //   },500);
  // }

  packageChange(value){
    //console.log('emit event', value);
    this.packageLabelChange.emit(value);
  }

  onClick() {
    //console.log('document');
    this.isOpen = false;
  }

  toggleSubMenu(e){
    e.stopPropagation();
    this.isOpen = !this.isOpen;
  }

}
