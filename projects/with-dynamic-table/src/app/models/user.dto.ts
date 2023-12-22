import { Validators } from '@angular/forms';
import { Field, FieldType, KeyValuePair } from '@dynamic-reactive-form';

export const userConfiguration = [
    {
        name: 'id',
        type: FieldType.TEXTFIELD,
        visible: false,
        exampleValue: () => 'John Doe',
    },
   
    {
        name: 'email',
        type: FieldType.TEXTFIELD,
        visible: true,
        exampleValue: () => 'email@example.com',
    },
    {
        name: 'username',
        type: FieldType.TEXTFIELD,
        visible: true,
        validation: [Validators.required, Validators.maxLength(25)],
        exampleValue: () => 'John Doe',
    },
    {
        name: 'password',
        type: FieldType.TEXTFIELD,
        visible: true,
        exampleValue: () => '',
    },
    {
        name: 'birthdate',
        type: FieldType.DATEPICKER,
        visible: true,
        exampleValue: () => new Date(),
    },
    {
        name: 'registeredAt',
        type: FieldType.DATEPICKER,
        visible: true,
        exampleValue: () => new Date(),
    },
] as const;

export type UserTableModel = {
    [Col in (typeof userConfiguration)[number] as Col['name']]: ReturnType<Col['exampleValue']>;
}


