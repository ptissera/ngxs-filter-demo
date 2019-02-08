export interface Field {
  id: string;
  name: string;
  type: string;
  autocompleteList: {
      label: string;
      id: string;
  }[];
}
