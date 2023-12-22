import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {

  public dialogRef = inject(MatDialogRef)

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseDialog() {
    this.dialogRef.close(false);
  }
  onDeleteRow() {
    this.dialogRef.close(true);
  }
}
