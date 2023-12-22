import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent, Field } from '@dynamic-reactive-form';

@Component({
  selector: 'app-dynamic-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './dynamic-dialog.component.html',
  styleUrl: './dynamic-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogComponent {

  public savedDataFromForm?: any;
    
  protected readonly dialogRef = inject(MatDialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { fields: Field[], prefetch: any, isEdit: boolean }) {}

  valueChanges(data: any) {
    this.savedDataFromForm = data;
  }

  onCloseDialog() {
    this.dialogRef.close(undefined);
  }

  onDialogConfirm() {
    this.dialogRef.close(this.savedDataFromForm);
  }
}

