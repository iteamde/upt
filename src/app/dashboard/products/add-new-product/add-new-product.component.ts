import {Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Modal} from 'angular2-modal';
import { DestroySubscribers } from 'ngx-destroy-subscribers';

import {each, map, join, every, difference} from 'lodash';
import {AccountService} from '../../../core/services/account.service';
import {ModalWindowService} from '../../../core/services/modal-window.service';
import {ProductService} from '../../../core/services/product.service';
import {HelpTextModal} from '../../inventory/add-inventory/help-text-modal/help-text-modal-component';
import { Location } from '@angular/common';
import {CustomProductModel, CustomProductVariantModel} from '../../../models/custom-product.model';
import {ProductVariantsModel} from '../../../models/product-variants.model';
import {PackageModel} from '../../../models/inventory.model';
import {ToasterService} from '../../../core/services/toaster.service';
import {Router} from '@angular/router';

import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

const dummyInventory = [
  {type: 'Package', value: 'package', qty: 1},
  {type: 'Sub Package', value: 'sub_package'},
  {type: 'Consumable Unit', value: 'consumable_unit'}];

@Component({
  selector: 'app-add-new-product',
  templateUrl: 'add-new-product.component.html',
  styleUrls: ['add-new-product.component.scss']
})
@DestroySubscribers()
export class AddNewProductComponent implements OnInit {
  public subscribers: any = {};

  public variants: any = {};
  public product: CustomProductModel = new CustomProductModel();
  public step: number = 0;
  public vendors: any[] = [];
  public departmentCollection$: Observable<any> = new Observable<any>();
  public departmentCollection: any[];
  public productAccountingCollection$: Observable<any> = new Observable<any>();
  public productAccountingCollection: any[];
  public productCategoriesCollection$: Observable<any> = new Observable<any>();
  public productCategoriesCollection: any[];
  public newVariant: string = '';
  public logo: any;
  public logoPreview: string = null;
  public dummyProductVariants = ["Size", "Color", "Texture", "Grit", "Length", "Strength", "Prescription", "Type"];
  public productVariants: ProductVariantsModel[] = [
    {
      name: 'Color',
      values: ['Green', 'Blue', 'Navy'],
      newName: ''
    },
    {
      name: 'Size',
      values: ['S', 'M', 'XL'],
      newName: ''
    }
  ];


  name: string;
  data1: any;
  cropperSettings1: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  show: boolean;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private accountService: AccountService,
              private productService: ProductService,
              private modal: Modal,
              private modalWindowService: ModalWindowService,
              private location: Location,
              private toasterService: ToasterService,
              private router: Router) {
    this.name = 'Angular2';
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 200;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 200;
    this.cropperSettings1.croppedHeight = 200;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 10;
    this.cropperSettings1.minHeight = 10;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.keepAspect = false;

    this.cropperSettings1.cropperDrawSettings.strokeColor = '#33c6d9';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.cropperSettings1.compressRatio = 1;
    this.cropperSettings1.preserveSize = true;
    this.cropperSettings1.noFileInput = true;

    this.show = false;
    this.data1 = {
      image: ''
    };
  }

  ngOnInit() {
    this.product.name = this.product.technical_name = this.productService.searchText;
    this.departmentCollection$ = this.accountService.getDepartments().take(1);
    this.productAccountingCollection$ = this.accountService.getProductAccounting().take(1);
    this.productCategoriesCollection$ = this.accountService.getProductCategories().take(1);
  }

  addSubscribers() {
    this.subscribers.departmenCollectiontSubscription = this.departmentCollection$
      .subscribe(departments => this.departmentCollection = departments);

    this.subscribers.productAccountingCollection = this.productAccountingCollection$
      .subscribe(collections => this.productAccountingCollection = collections);

    this.subscribers.productCategoriesCollection = this.productCategoriesCollection$
      .subscribe(productsCat => this.productCategoriesCollection = productsCat);
  }

  createVendorVariants() {
    let arr = map(this.productVariants, 'values');
    let newVar = (arr) => {
      return {...new CustomProductVariantModel(), name: join(arr, ' ')}
    };

    function recursive() {
      let r = [], arg = arguments, max = arg.length - 1;

      function helper(arr, i) {
        for (let j = 0, l = arg[i].length; j < l; j++) {
          let a = arr.slice(0); // clone arr
          a.push(arg[i][j]);
          if (i == max)
            r.push(newVar(a));
          else
            helper(a, i + 1);
        }
      }

      helper([], 0);
      return r;
    }

    return recursive(...arr);
  }

  setTechName = (name) => this.product.technical_name = name;

  // uploadLogo(file: any) {
  //   const reader = new FileReader();
  //   const formData = new FormData();
  //   reader.onload = ($event: any) => {
  //     this.logoPreview = $event.target.result;
  //     formData.append('image', file.target.files[0]);
  //     this.productService.addCustomProductImage(formData)
  //       .subscribe(url => this.product.image = url);
  //   };
  //   reader.readAsDataURL(file.target.files[0]);
  // }

  openHelperModal() {
    this.modal.open(HelpTextModal, this.modalWindowService
      .overlayConfigFactoryWithParams({'text': ''}, true, 'mid'));
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    let files: File[] = inputValue.files;
    this.addFile(files);
  }

  onFileDrop(file: any): void {
    let myReader: any = new FileReader();
    myReader.fileName = file.name;
    this.addFile(file);
  }

  addFile(files) {
    const formData = new FormData();
    each(files, (file, i) => formData.append(`documents[${i}]`, file));
    this.productService.addCustomProductDocument(formData)
      .subscribe(urls =>
        this.product.attachments = this.product.attachments.concat(urls))
  }

  removeFile(i) {
    this.product.attachments.splice(i, 1)
  }

  deleteItem = (variant, i) => {
    variant.splice(i, 1);
  };

  deleteVariant = (i) => {
    this.productVariants.splice(i, 1);
  };

  addVariant = (variant, i) => {
    if (!variant) return;
    this.productVariants[i].values.push(variant);
    this.productVariants[i].newName = '';
  };

  onProductVariantSelect = (name) => {
    if (!name) return;
    this.productVariants.push(new ProductVariantsModel({name}));
    this.newVariant = '';
  };

  goBack = (): void => this.location.back();

  onSubmit() {
    const product = this.formatProduct(this.product);
    this.productService.addCustomProduct(product)
      .subscribe((product) => {
        this.toasterService.pop('', 'Product successfully added');
        this.productService.addToCollection$.next([product]);
        this.router.navigate(['/products']);
      });
  }

  formatProduct(product) {
    const attachments = map(product.attachments, 'public_url');
    return {...product, attachments};
  }

  canProceed() {
    if (this.step == 0) {
      return this.product.name;
    }
    if (this.step == 1) {
      return this.validVariants();
    }
  }

  get availableVariants() {
    return difference(this.dummyProductVariants, map(this.productVariants, 'name'));
  }

  validVariants() {
    return every(this.productVariants, 'name') &&
      every(this.productVariants, (v) => v.values.length > 0);
  }

  productNotValid() {
    return this.product.vendor_variants.length < 1;
  }

  onVendorChosen(customVendor) {
    const variants = this.createVendorVariants();
    const inventory_by = [map(dummyInventory, (inv) => new PackageModel(inv))];
    const vendor = {...customVendor, inventory_by, variants};
    this.product.vendor_variants.unshift(vendor);
  }

  onVendorDelete(i) {
    this.product.vendor_variants.splice(i, 1);
  }


  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  fileChangeListener($event) {
    this.show = true;
    const formData = new FormData();
    const image: any = new Image();
    const file: File = $event.target.files[0];
    console.log(file);
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      console.log(image.src);
      this.cropper.setImage(image);
      formData.append('image', file);
      this.productService.addCustomProductImage(formData)
        .subscribe(url => this.product.image = url);
    };
    myReader.readAsDataURL(file);

  }


  rotateBase64Image(base64data) {

    const canvas: any = document.createElement('canvas');
    canvas.setAttribute('width', 200);
    canvas.setAttribute('height', 200);
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(0,0);
    canvas.width=canvas.width;
    const image = new Image();
    image.src = base64data;
    image.onload =  () =>{
      ctx.translate(canvas.width/2, canvas.height/2);
      ctx.rotate(90* Math.PI / 180);
      ctx.drawImage(image, -100,-100, canvas.width,canvas.height);
      //console.log(canvas.toDataURL("image/jpeg"), canvas.width,canvas.height, image.width,image.height);
      this.data1.image = canvas.toDataURL("image/jpeg");
    };

  }

  saveBlob(dataURI){
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    const formData = new FormData();
    const croppedImage = blob;
    formData.append("image", croppedImage);
    this.productService.addCustomProductImage(formData)
      .subscribe(url => this.product.image = url);
    console.log(blob);
  }

}

