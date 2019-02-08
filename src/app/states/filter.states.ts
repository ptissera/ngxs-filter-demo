import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { SelectFieldFilterAction, LoadDefaultValuesFilterAction } from '../actions/filter.actions';
import { FilterService } from '../services/filter.service';
import { CompareOperator } from '../models/compare-operator.model';
import { Observable, of, Subscriber } from 'rxjs';
import { Field } from '../models/field.model';
import { ListItem } from '../models/list-item.model';
import { Filter } from '../models/filter.model';

export interface FilterStateModel {
  fields$: Observable<Field[]>;
  compareOperators: CompareOperator[];
  listItemValues$: Observable<ListItem[]>;
  filterList: Filter[]
}

export const getAppInitialState = (): FilterStateModel => ({
  fields$: of([]),
  compareOperators: [],
  listItemValues$: of([]),
  filterList:[]
});

@State<FilterStateModel>({
  name: 'filter',
  defaults: getAppInitialState()
})
export class FilterState {
  constructor(private store: Store, private filterService: FilterService) {}

  @Selector()
  static fieldList(state: FilterStateModel) {
    return state.fields$;
  }

  @Selector()
  static operatorList(state: FilterStateModel) {
      return state.compareOperators;
  }

  @Selector()
  static valueList(state: FilterStateModel) {
      return state.listItemValues$;
  }

  @Action(SelectFieldFilterAction)
  async SelectFieldState(ctx: StateContext<FilterStateModel>, action: SelectFieldFilterAction) {
    const state = ctx.getState();
    const current = {
      compareOperators: this.filterService.getCompareOperators(action.id),
      listItemValues$: await this.filterService.getListValues(action.id)
    };

    ctx.setState({
      ...state,
      ...current
    });
  }

  @Action(LoadDefaultValuesFilterAction)
  async LoadDefaultValuesState(ctx: StateContext<FilterStateModel>) {
    const state = ctx.getState();
    const current = {
      fields$: await this.filterService.getFields()
    };

    const newState = {
      ...state,
      ...current
    }
    
    ctx.setState(newState);
  }
}