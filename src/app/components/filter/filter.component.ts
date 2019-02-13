import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoadDefaultValuesFilterAction, SelectFieldFilterAction, AddFilterAction, EditFilterAction } from '../../actions/filter.actions';
import { FilterState } from '../../states/filter.states';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';


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

  @Select(FilterState.selectedFilter)
  selectedFilter;

  selectedId = null;

  filterForm;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.createForm();
    this.selectedId = null;
    this.selectedFilter.subscribe((data) => {
      if (data) {
        this.selectedId = data.id;
        this.store.dispatch(new SelectFieldFilterAction(data.field)).subscribe(() => {
          this.filterForm.patchValue({
            selectedField: data.field,
            selectedOperator: data.operator,
            selectedItemValue: data.value
          });
        });
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadDefaultValuesFilterAction());
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
        selectedField: ['', Validators.required],
        selectedOperator: ['', Validators.required],
        selectedItemValue: ['', Validators.required]
      });
}

  selecteField(fieldId) {
    this.store.dispatch(new SelectFieldFilterAction(fieldId));
  }

  editFilter() {
    this.store.dispatch(new EditFilterAction({
      field: this.filterForm.value.selectedField,
      operator: this.filterForm.value.selectedOperator,
      value: this.filterForm.value.selectedItemValue,
      id: this.selectedId
    })).subscribe(() => {
      this.clearForm();
    });
  }

  cancel() {
    this.clearForm();
  }

  addFilter() {
    this.store.dispatch(new AddFilterAction({
      field: this.filterForm.value.selectedField,
      operator: this.filterForm.value.selectedOperator,
      value: this.filterForm.value.selectedItemValue,
      id: null
    })).subscribe(() => {
        this.clearForm();
    });
  }

  private clearForm() {
    this.filterForm.reset();
    this.selectedId = null;
  }
}
