import {
  ApiService,
  DEFAULT_LIST_STATE,
  DefaultListState,
  patchStateByKey,
  Store,
} from '@arcelor-mittal-pocs/shared';
import {
  EmptyFeatureResult,
  signalStoreFeature,
  SignalStoreFeature,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { Container } from '../../../containers/src/lib/types/containers.types';
import { inject } from '@angular/core';
import { RxMethod, rxMethod } from '@ngrx/signals/rxjs-interop';
import { OperatorFunction, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

const initialState: ContainersState = {
  containers: DEFAULT_LIST_STATE,
};

export type ContainersState = {
  containers: DefaultListState<Container>;
};

type WithContainers = {
  state: ContainersState;
  props: {};
  methods: {
    getAllContainers: RxMethod<{ userId: string }>;
  };
};

export function withContainers(): SignalStoreFeature<
  EmptyFeatureResult,
    WithContainers
> {
  return signalStoreFeature(
    withState<ContainersState>(initialState),
     withProps(() => ({
      _apiService: inject(ApiService)
    })),
    withMethods((store) => ({
      getAllContainers: rxMethod(getAllContainers(store, store._apiService)),
    })),
  );
}

function getAllContainers(
  store: Store<ContainersState>,
   apiService: ApiService,
): OperatorFunction<
  {
    userId: string;
  },
  Container[]
> {
  return pipe(
    tap(() => patchStateByKey(store, 'containers', { loading: true })),
    switchMap(() =>
      apiService.getAllContainers().pipe(
        tapResponse({
          next: (response) =>
            patchStateByKey(store, 'containers', {
              data: response,
              loading: false,
              hasSearched: true,
              count: response.length,
            }),
          error: () => patchStateByKey(store, 'containers', { loading: false }),
        }),
      ),
    ),
  );
}
