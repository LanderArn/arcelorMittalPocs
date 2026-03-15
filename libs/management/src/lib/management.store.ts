import {
  DEFAULT_LIST_STATE,
  DefaultListState,
} from '@arcelor-mittal-pocs/shared';
import { signalStore, withState } from '@ngrx/signals';
import { Container } from '../../../containers/src/lib/types/containers.types';

import { withContainers } from '@arcelor-mittal-pocs/containers';

const initialState: ManagementState = {
  containers: DEFAULT_LIST_STATE,
};

export type ManagementState = {
  containers: DefaultListState<Container>;
};

export const ManagementStore = signalStore(
  withState(initialState),
  withContainers(),
);
