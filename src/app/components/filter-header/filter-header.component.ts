import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { FilterState } from '../../states/filter.states';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css']
})
export class FilterHeaderComponent implements OnInit {

  @Select(FilterState.filterTotal)
  filterTotal;

  @Select(FilterState.totalFieldsByType('numeric'))
  totalNumericFields;

  @Select(FilterState.totalFieldsByType('string'))
  totalStringFields;

  constructor() { }

  ngOnInit() {
  }

}
