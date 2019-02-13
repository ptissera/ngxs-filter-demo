import { Filter } from './../models/filter.model';
import { ListItem } from './../models/list-item.model';
import { Field } from './../models/field.model';

export class LoadDefaultValuesFilterAction {
  static readonly type = '[Filter Component] Load default values';
  constructor() {}
}

export class SelectFieldFilterAction {
  static readonly type = '[Filter Component] Select Field';
  constructor(public id: string) {}
}

export class LoadFieldsSuccessFilterAction {
  static readonly type = '[Filter Component] Load Field Success';
  constructor(public fields: Field[]) {}
}

export class LoadListOfValuesSuccessFilterAction{
  static readonly type = '[Filter Component] Load List of values Success';
  constructor(public values: ListItem[]) {}
}

export class LoadFieldsErrorFilterAction {
  static readonly type = '[Filter Component] Load Field Error';
  constructor(public error: any) {}
}

export class LoadListOfValuesErrorFilterAction {
  static readonly type = '[Filter Component] Load List of values Error';
  constructor(public error: any) {}
}

export class AddFilterAction {
  static readonly type = '[Filter Component] Add Filter';
  constructor(public filter: Filter) {}
}

export class EditFilterAction {
  static readonly type = '[Filter Component] Edit Filter';
  constructor(public filter: Filter) {}
}

export class DeleteFilterAction {
  static readonly type = '[Filter List Component] Delete Filter';
  constructor(public idFilter: string) {}
}

export class SelectFilterToEditAction {
  static readonly type = '[Filter List Component] Select Filter to Edit';
  constructor(public idFilter: string) {}
}
