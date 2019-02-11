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
      name: 'Name',
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
    if (fieldId === '11' || fieldId === '12') {
      fieldType = fieldId === '11' ? 'string' : 'numeric';
    }

    return fieldType ? this.compareOperators[fieldType] : [];
  }

  getListValues(fieldId: string): Observable<ListItem[]> {
    let list = null;
    if (fieldId === '11' || fieldId === '12') {
      list =  this.fields[fieldId === '11' ? 0 : 1].autocompleteList;
    }

    return of(list);
  }

}
