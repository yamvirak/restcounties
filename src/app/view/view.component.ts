import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';



@Component({
  templateUrl: 'view.component.html',
})

export class ViewComponent implements OnInit{

  public isSaving:boolean = false;
  public dataHasChanged:boolean = false; 
  constructor(
    public _dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){ 
  
  }
  
  ngOnInit(){
   console.log(this.data);
  }



}
