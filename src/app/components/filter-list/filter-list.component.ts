import { FilterState } from './../../states/filter.states';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { DeleteFilterAction } from '../../actions/filter.actions';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.sass']
})
export class FilterListComponent implements OnInit {

  @Select(FilterState.filterList)
  filters;

  @Select(FilterState.filterTotal)
  filterTotal;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  editFilter(idFilter: string) {}

  deleteFilter(idFilter: string) {
    this.store.dispatch(new DeleteFilterAction(idFilter)) ;
  }

}
