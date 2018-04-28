import {Component, Input, OnInit, Output, EventEmitter, ElementRef} from '@angular/core';
import { Animations } from './animate-dropdown';

@Component({
  selector: 'app-dropdown-package',
  templateUrl: './dropdown-package.component.html',
  styleUrls: ['./dropdown-package.component.scss'],
  host: {
    '(document:click)': 'onClick()'
  },
  animations: [
    Animations.animateTrigger
  ]
})
export class DropdownPackageComponent implements OnInit {


  @Input() autocompletePackage: any;
  @Input() packageLabel: any;
  @Output() packageLabelChange: EventEmitter<any> = new EventEmitter<any>();

  public isOpen: boolean = false;
  constructor(private ref: ElementRef) { }

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
    this.toggleSubMenu();
  }

  onClick() {
    //console.log('document');
    console.log(this.ref.nativeElement.contains(event.target))
    if(!this.ref.nativeElement.contains(event.target)) this.isOpen = false;



  }

  toggleSubMenu(){
    //e.stopPropagation();
    this.isOpen = !this.isOpen;
  }

}
