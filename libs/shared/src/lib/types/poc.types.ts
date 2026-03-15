import { StateSignals, WritableStateSource } from "@ngrx/signals";

export type DefaultListState<Data> = {
  count: number;
  data: Data[];
  loading: boolean;
  hasSearched: boolean;
};

export type DefaultState<Data> = {
  data: Data | null;
  loading: boolean;
};

export type ManagementListItem = {
    id: number; 
}

export type Store<
  State extends object,
  Props extends object = Record<string, any>
> = StateSignals<State> & WritableStateSource<State> & Props;

export const DEFAULT_LIST_STATE = {
  count: 0,
  data: [],
  loading: false,
  hasSearched: false
};

