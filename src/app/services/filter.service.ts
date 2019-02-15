import { CompareOperator } from './../models/compare-operator.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Field } from '../models/field.model';
import { ListItem } from '../models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private fields: Field[] = [
    {
      id: '11',
      name: 'Test Name',
      type: 'string',
      autocompleteList: [
        { label: 'Value 1', id: '1' },
        { label: 'Value 2', id: '2' },
        { label: 'Value 3', id: '3' }
      ]
    },
    {
      id: '12',
      name: 'AVG',
      type: 'numeric',
      autocompleteList: [
        { label: '10', id: '1' },
        { label: '20', id: '2' },
        { label: '30', id: '3' }
      ]
    },
    {
      id: '13',
      name: 'Fails',
      type: 'numeric',
      autocompleteList: [
        { label: '10', id: '1' },
        { label: '20', id: '2' },
        { label: '30', id: '3' },
        { label: '40', id: '4' },
        { label: '50', id: '5' },
        { label: '60', id: '6' },
        { label: '70', id: '7' },
        { label: '80', id: '8' },
        { label: '90', id: '9' },
        { label: '100', id: '10' }
      ]
    }
  ];

  private compareOperators = {
    'string': [
      {id: 'equals', name: 'Equals'},
      {id: 'no_equals', name: 'No Equals'},
      {id: 'contains', name: 'Contains'}
    ],
    'numeric': [
      {id: 'equals', name: '=='},
      {id: 'no_equals', name: '<>'},
      {id: 'less_than', name: '<'},
      {id: 'great_than', name: '>'},
    ]
  };

  constructor() {}

  getFields(): Observable<Field[]> {
    return of(this.fields);
  }

  getCompareOperators(fieldId: string): CompareOperator[] {
    let fieldType = null;
    if (fieldId === '11' || fieldId === '12' || fieldId === '13') {
      fieldType = fieldId === '11' ? 'string' : 'numeric';
    }

    return fieldType ? this.compareOperators[fieldType] : [];
  }

  getListValues(fieldId: string): Observable<ListItem[]> {
    let list = null;
    if (fieldId === '11' || fieldId === '12' || fieldId === '13') {
      list =  this.fields[fieldId === '11' ? 0 : (fieldId === '12' ? 1 : 2)].autocompleteList;
    }

    return of(list);
  }

}
