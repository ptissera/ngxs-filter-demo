import { Field } from './field.model';
import { CompareOperator } from './compare-operator.model';
import { FilterValue } from './filter-value.model';
import { Observable } from 'rxjs';

export interface Filter {
  id: string;
  field: string;
  operator: string;
  value: string;
}
