// @ts-expect-error - Template file, path will be resolved when copied to project
// eslint-disable-next-line @dz-web/esboot/no-cross-platform-imports
import { useAppStore } from '@mobile/model/app/slice';

import useHelloStore from './hello/slice';

export type RootState = ReturnType<typeof useAppStore.getState> & {
  hello: ReturnType<typeof useHelloStore.getState>;
};

export function useAppSelector<T>(selector: (state: RootState) => T): T {
  const appState = useAppStore();
  const helloState = useHelloStore();
  const combinedState = { ...appState, hello: helloState } as RootState;
  return selector(combinedState);
}
