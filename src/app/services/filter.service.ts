import { Injectable } from "@angular/core";
import { Observable, Subscriber } from "rxjs";

import { Field } from "../models/field.model";
import { CompareOperator } from '../models/compare-operator.model';
import { ListItem } from '../models/list-item.model';

@Injectable({
  providedIn: "root"
})
export class FilterService {
  private fields: Field[] = [
    {
      id: '11',
      name: "Name",
      type: "string",
      autocompleteList: [
        { label: "Value 1", id: "1" },
        { label: "Value 2", id: "2" },
        { label: "Value 3", id: "3" }
      ]
    },
    {
      id: '12',
      name: "AVG",
      type: "numeric",
      autocompleteList: [
        { label: "10", id: "1" },
        { label: "20", id: "2" },
        { label: "30", id: "3" }
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

  getFields() {
    return Observable.create((observer: Subscriber<Field[]>) => {
      observer.next(this.fields);
      observer.complete();
    }).toPromise();
  }

  getCompareOperators(fieldId: string) {
    let fieldType = null;
    if (fieldId == '11' || fieldId == '12') {
      fieldType = fieldId == '11' ? 'string' : 'numeric';
    }

    return fieldType ? this.compareOperators[fieldType] : [];
  }

  getListValues(fieldId: string) {
    let list = null;
    if (fieldId == '11' || fieldId == '12') {
      list =  this.fields[fieldId == '11' ? 0 : 1].autocompleteList;
    }

    return Observable.create((observer: Subscriber<ListItem[]>) => {
        observer.next(list);
        observer.complete();
    }).toPromise();
  }

}
