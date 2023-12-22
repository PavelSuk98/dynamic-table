import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Field, FieldType, KeyValuePair, SentenceCasePipe } from '@dynamic-reactive-form';
import { firstValueFrom } from 'rxjs';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';
import { UserTableModel } from '../../models/user.dto';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, MatTableModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, SentenceCasePipe
  ],
  providers: [MatDialog],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {

  readonly FieldType = FieldType;
  
  private _fieldDefinition: Field[] = [];

  private _data = new Array();

  get data() {
    return this._data;
  }

  get fieldDefinition() {
    return this._fieldDefinition;
  }

  displayColumnDefinitions: string[] = [];

  protected readonly dialog = inject(MatDialog);

  @Input({ required: true })
  set tableConfiguration(fields: any) {
    this._fieldDefinition = fields;
    this.displayColumnDefinitions = [...fields.filter((field: Field) => field.visible ).map((field: Field) => field.name), 'action'];
  }

  @Input() set data(jsonData: UserTableModel[]) {
    this._data = jsonData;
    console.log(jsonData);
  };

  async onRecordCreate(): Promise<void> {
    const preparedJson = await this.getFieldStructureForDialog({}, 'CREATE');
    console.log(preparedJson);

    const dialogRef: MatDialogRef<DynamicDialogComponent, any> = 
    this.dialog.open(DynamicDialogComponent, { data: { fields: preparedJson.fields, prefetch: preparedJson.prefillData}});

    const result = await firstValueFrom(dialogRef.afterClosed());
  
  }

  async onRecordEdit(data: any): Promise<void> {

    const preparedJson = await this.getFieldStructureForDialog(data, 'EDIT');

    const dialogRef: MatDialogRef<DynamicDialogComponent, any> = 
    this.dialog.open(DynamicDialogComponent, { data: { fields: preparedJson.fields, prefetch: preparedJson.prefillData, isEdit: true}});

    await firstValueFrom(dialogRef.afterClosed());
  }
 
  async onRecordRemove(id: string): Promise<void> {
    const dialogRef: MatDialogRef<DeleteDialogComponent, boolean> = this.dialog.open(DeleteDialogComponent);

    await firstValueFrom(dialogRef.afterClosed());

  }

  private async getFieldStructureForDialog(data: any, action: 'CREATE' | 'EDIT' ): Promise<{ fields: Field[], prefillData: Array<any>}> {

    const prefillData: KeyValuePair[] = [];

    const fields: Field[] = [];

    for (let i = 0; i < this.fieldDefinition.length; i++) {
      const fieldDef = this.fieldDefinition[i];

      const field: Field = {
        name: fieldDef.name,
        type: fieldDef.type,
      };

      let fieldValue = data[fieldDef.name];

      if(action !== 'CREATE') {
        prefillData.push({ key: fieldDef.name, value: fieldValue});
      } else {
        prefillData.push({ key: fieldDef.name, value: fieldDef.exampleValue()});
      }

      fields.push(field)
    }

    return { fields: fields, prefillData: prefillData};
  }
 }
