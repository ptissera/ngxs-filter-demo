import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoadDefaultValuesFilterAction, SelectFieldFilterAction, AddFilterAction } from '../../actions/filter.actions';
import { FilterStateModel, FilterState } from '../../states/filter.states';


@Component({
  selector: 'app-ngxs-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {
  @Select(FilterState.fieldList)
  fields;

  @Select(FilterState.operatorList)
  operators;

  @Select(FilterState.valueList)
  values;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadDefaultValuesFilterAction());
  }

  selecteField(fieldId) {
    this.store.dispatch(new SelectFieldFilterAction(fieldId));
  }

  addFilter() {
    this.store.dispatch(new AddFilterAction({field: 'f', operator: 'o', value: 'v', id: ''}));
  }
}
