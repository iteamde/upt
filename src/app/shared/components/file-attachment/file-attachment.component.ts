import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-attachment',
  templateUrl: './file-attachment.component.html',
  styleUrls: ['file-attachment.component.scss']
})
export class FileAttachmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
/*
  docActions(): any {
    let addDocToDoc$ = this.addDocToDoc$
      .switchMap((res) => {
        return this.doc$.first()
          .map((doc: any) => {
            doc = doc.concat(res);
            return doc;
          });
      });
    let deleteFromDoc$ = this.deleteFromDoc$
      .switchMap((deleteDoc) => {
        this.doc$.subscribe((res) => {
          console.log('Model Service delete from doc ' + res);
        });
        return this.doc$.first()
          .map((doc: any) => {
            return doc.filter((el: any) => {
              return el.file_name != deleteDoc.file_name;
            });
          });
      });
    this.doc$ = Observable.merge(
      this.loadDoc$,
      this.updateDoc$,
      addDocToDoc$,
      deleteFromDoc$
    )
      .publishReplay(1)
      .refCount();

    this.doc$
      .subscribe(res => {
        this.doc = res;
        this.hasDocs = res.length > 0;
      });
  }

  fileActions(): any {
    let deleteFromFile$ = this.deleteFromFile$
      .switchMap((deleteFile) => {
        this.file$.subscribe((res) => {
          console.log('Model Service delete from file ' + res);
        });
        return this.file$.first()
          .map((file: any) => {
            return file.filter((el: any) => {
              return el.name != deleteFile.name;
            });
          });
      });
  }*/

}
