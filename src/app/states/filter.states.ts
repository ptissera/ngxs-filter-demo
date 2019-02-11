import { FilterStateModel } from './filter.states';
import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import {
  SelectFieldFilterAction,
  LoadDefaultValuesFilterAction,
  LoadFieldsSuccessFilterAction,
  LoadFieldsErrorFilterAction,
  LoadListOfValuesSuccessFilterAction,
  LoadListOfValuesErrorFilterAction,
  AddFilterAction,
  DeleteFilterAction
} from '../actions/filter.actions';
import { FilterService } from '../services/filter.service';
import { CompareOperator } from '../models/compare-operator.model';
import { Field } from '../models/field.model';
import { ListItem } from '../models/list-item.model';
import { Filter } from '../models/filter.model';

export interface FilterStateModel {
  fields: Field[];
  compareOperators: CompareOperator[];
  listItemValues: ListItem[];
  filterList: Filter[];
}

export const getAppInitialState = (): FilterStateModel => ({
  fields: [],
  compareOperators: [],
  listItemValues: [],
  filterList: []
});

@State<FilterStateModel>({
  name: 'filter',
  defaults: getAppInitialState()
})
export class FilterState {
  constructor(private store: Store, private filterService: FilterService) {}

  @Selector()
  static fieldList(state: FilterStateModel) {
    return state.fields;
  }

  @Selector()
  static operatorList(state: FilterStateModel) {
      return state.compareOperators;
  }

  @Selector()
  static valueList(state: FilterStateModel) {
      return state.listItemValues.map(item => {
        const {id, label} = item;
        return {id, label};
      });
  }

  @Selector()
  static filterList(state: FilterStateModel) {
    return state.filterList;
  }

  @Selector()
  static filterTotal(state: FilterStateModel) {
    return state.filterList.length || 0;
  }

  @Action(SelectFieldFilterAction)
  async SelectFieldState(ctx: StateContext<FilterStateModel>, action: SelectFieldFilterAction) {
    const state = ctx.getState();
    const current = {
      compareOperators: this.filterService.getCompareOperators(action.id)
    };
    ctx.patchState({
      ...state,
      ...current
    });
    this.filterService.getListValues(action.id).subscribe(
      data => {
        this.store.dispatch(new LoadListOfValuesSuccessFilterAction(data));
      },
      error => {
        this.store.dispatch(new LoadListOfValuesErrorFilterAction(error));
      }
    );
  }

  @Action(LoadListOfValuesSuccessFilterAction)
  LoadListOfValuesSuccessState(ctx: StateContext<FilterStateModel>, action: LoadListOfValuesSuccessFilterAction) {
    const state = ctx.getState();
    const current = {
      listItemValues: action.values
    };
    ctx.patchState({
      ...state,
      ...current
    });
  }

  @Action(LoadDefaultValuesFilterAction)
  async LoadDefaultValuesState(ctx: StateContext<FilterStateModel>) {
    this.filterService.getFields().subscribe(
      data => {
        this.store.dispatch(new LoadFieldsSuccessFilterAction(data));
      },
      error => {
        this.store.dispatch(new LoadFieldsErrorFilterAction(error));
      }
    );
  }

  @Action(LoadFieldsSuccessFilterAction)
  LoadFieldsSuccessState(ctx: StateContext<FilterStateModel>, action: LoadFieldsSuccessFilterAction) {
    const state = ctx.getState();
    const current = {
      fields: action.fields
    };
    ctx.patchState({
      ...state,
      ...current
    });
  }

  @Action(AddFilterAction)
  AddFilterState(ctx: StateContext<FilterStateModel>, action: AddFilterAction) {
    const state = ctx.getState();
    action.filter.id = 'id-' + Math.random().toString(36).substr(2, 16);
    const current = {
      filterList: [...state.filterList, action.filter]
    };
    ctx.patchState({
      ...state,
      ...current
    });
  }

  @Action([LoadFieldsErrorFilterAction, LoadListOfValuesErrorFilterAction])
  ErrorHandlerState(ctx: StateContext<FilterStateModel>, actions) {
    console.log(actions);
  }

  @Action(DeleteFilterAction)
  DeleteFilterState(ctx: StateContext<FilterStateModel>, action: DeleteFilterAction) {
    const state = ctx.getState();
    const current = {
      filterList: [...[...state.filterList.filter(filter => filter.id !== action.idFilter)]]
    };
    ctx.patchState({
      ...state,
      ...current
    });
  }
}


