import { patchState, WritableStateSource } from "@ngrx/signals";

export function patchStateByKey<
  Store extends object,
  Property extends keyof Store,
  Patch extends Store[Property]
>(
  store: WritableStateSource<Store>,
  property: Property,
  patch: Patch extends object ? Partial<Patch> : Patch
): void {
  patchState(store, (state) => ({
    ...state,
    [property]:
      typeof patch === 'object' && !Array.isArray(patch) ? { ...state[property], ...patch } : patch
  }));
}