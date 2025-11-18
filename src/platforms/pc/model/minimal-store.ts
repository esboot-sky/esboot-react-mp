import { useAppStore } from './app/slice';

export type MinimalStoreType = typeof useAppStore;

export type MinimalRootState = ReturnType<typeof useAppStore.getState>;

export function useMinimalAppSelector<T>(selector: (state: MinimalRootState) => T): T {
  return useAppStore(selector);
}
