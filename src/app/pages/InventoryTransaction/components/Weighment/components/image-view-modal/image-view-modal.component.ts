import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-view-modal',
  templateUrl: './image-view-modal.component.html',
  styleUrls: ['./image-view-modal.component.scss']
})
export class ImageViewModalComponent{
  src: string = "";
  constructor(private dialogRef: MatDialogRef<ImageViewModalComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.src = data.src;
  }

}
