import {
  ApiService,
  DEFAULT_LIST_STATE,
  DefaultListState,
  patchStateByKey,
  Store,
  WasteType,
} from '@arcelor-mittal-pocs/shared';
import {
  EmptyFeatureResult,
  signalStoreFeature,
  SignalStoreFeature,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { RxMethod, rxMethod } from '@ngrx/signals/rxjs-interop';
import { OperatorFunction, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

const initialState: WasteState = {
  wasteTypes: DEFAULT_LIST_STATE,
};

export type WasteState = {
  wasteTypes: DefaultListState<WasteType>;
};

type WithWaste = {
  state: WasteState;
  props: {};
  methods: {
    getAllWasteTypes: RxMethod<{ userId: string }>;
  };
};

export function withWaste(): SignalStoreFeature<
  EmptyFeatureResult,
    WithWaste
> {
  return signalStoreFeature(
    withState<WasteState>(initialState),
     withProps(() => ({
      _apiService: inject(ApiService)
    })),
    withMethods((store) => ({
      getAllWasteTypes: rxMethod(getAllWasteTypes(store, store._apiService)),
    })),
  );
}

function getAllWasteTypes(
  store: Store<WasteState>,
   apiService: ApiService,
): OperatorFunction<
  {
    userId: string;
  },
  WasteType[]
> {
  return pipe(
    tap(() => patchStateByKey(store, 'wasteTypes', { loading: true })),
    switchMap(() =>
      apiService.getAllWasteTypes().pipe(
        tapResponse({
          next: (response) =>
            patchStateByKey(store, 'wasteTypes', {
              data: response,
              loading: false,
              hasSearched: true,
              count: response.length,
            }),
          error: () => patchStateByKey(store, 'wasteTypes', { loading: false }),
        }),
      ),
    ),
  );
}
