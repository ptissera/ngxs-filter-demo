
export class LoadDefaultValuesFilterAction {
  static readonly type = '[Filter Component] Load default values';
  constructor() {}
}


export class SelectFieldFilterAction {
  static readonly type = '[Filter Component] Select Field';
  constructor(public id: string) {}
}
