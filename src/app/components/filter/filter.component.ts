import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoadDefaultValuesFilterAction, SelectFieldFilterAction } from '../../actions/filter.actions';
import { FilterStateModel, FilterState } from '../../states/filter.states';


@Component({
  selector: 'ngxs-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {
  
  @Select(state => state.filter.fields$)
  fields$;

  @Select(FilterState.operatorList)
  operators;

  @Select(FilterState.valueList)
  values$;
  
  constructor(private store: Store) { }

  ngOnInit() {    
    this.store.dispatch(new LoadDefaultValuesFilterAction());
  }

  selecteField(fieldId) {    
    this.store.dispatch(new SelectFieldFilterAction(fieldId));
  }
}
