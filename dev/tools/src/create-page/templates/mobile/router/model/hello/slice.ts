import type { RootState } from '../store';

/**
 * 页面store module模板
 */
import { create } from 'zustand';

interface IHelloState {
  count: number;
}

interface IHelloStore extends IHelloState {
  increase: (amount: number) => void;
}

const useHelloStore = create<IHelloStore>(set => ({
  count: 0,
  increase: (amount: number) => {
    set(state => ({ count: state.count + amount }));
  },
}));

export const selectCount = (state: RootState) => state.hello.count;

export const increase = (amount: number) => useHelloStore.getState().increase(amount);

export default useHelloStore;
