/**
 * 页面redux module模板
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface IState {
  text: string;
}

function createInitializedState(): IState {
  return {
    text: 'hello world',
  };
}

export const slice = createSlice({
  name: 'hello',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: createInitializedState(),
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const {
  setText,
} = slice.actions;

export const selectHello = (state: RootState) => state.hello.text;

export default slice.reducer;
