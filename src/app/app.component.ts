import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ViewComponent } from './view/view.component';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restcountries';
  public isSearching: boolean = false;
  public thisSearching: boolean = true;
  public data: any[] = [];
  public tableSize: number = 25;
  public limit: number = 25;
  public page: number = 1;
  public name: string = '';
  public count: number = 0;
  public key: string = 'cca2';
  public reverse: boolean = false;
  public countryName: any;
  sortDirection: string = 'asc'; // Initial sort direction
  sortedColumn: string = ''; // Initial sorted column

  constructor(

    private _service: HttpClient,
    private _dialog: MatDialog
  ) { 
    // this.sortData = this.desserts.slice();
  }


  ngOnInit(): void {
    this.listing();
    console.log(this.countryName);
  }

  listing() {
    
      this._service.get('https://restcountries.com/v3.1/all').subscribe(
        (res: any) => {
          this.data = res;
          console.log(this.data.length);
        }
      );
    
    
  }

  onPageChanged(event: any){
    this.page = event;
    this.listing();
  }

  // onPageSizeChanged(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.listing();
  // }

  openViewForm(row: any = null): void {
    const dialogRef = this._dialog.open(ViewComponent, { data: row });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listing();
      }
    });
  }


  Search(){
    if(this.countryName == ""){
      this.ngOnInit()
    }else{
      this.data = this.data.filter(res =>{
        this._service.get('https://restcountries.com/v3.1/name/'+this.countryName).subscribe(
          (res: any) => {
            this.data = res;
            console.log(this.data.length);
          },
          (error: any) => {
            console.error(error);
          }
        );
      })
    }
  }
  sort(column: string) {
    if (this.sortedColumn === column) {
      // If the same column is clicked again, reverse the sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If a different column is clicked, set the sort column and direction
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }
    this.data.sort((a, b) =>{
      const valueA = this.getValue(a, column);
      const valueB = this.getValue(b, column);

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  getValue(obj: any, column: string): any {
    // Helper function to get the value of a nested property in the object
    const properties = column.split('.');
    let value = obj;

    for (const prop of properties) {
      value = value[prop];
    }

    return value;
  }
}

