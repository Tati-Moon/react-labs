import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedPeoplesState {
  selected: Record<string, boolean>;
}

const initialState: SelectedPeoplesState = {
  selected: {},
};

const selectedPeoplesSlice = createSlice({
  name: 'selectedPeoples',
  initialState,
  reducers: {
    togglePeopleSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.selected[id] = !state.selected[id];
    },
    toggleSelectAll: (state, action: PayloadAction<string[]>) => {
      const allSelected = Object.values(state.selected).every(Boolean);
      action.payload.forEach((id) => {
        state.selected[id] = !allSelected;
      });
    },
    clearSelections: (state) => {
      state.selected = {};
    },
  },
});

export const { togglePeopleSelection, toggleSelectAll, clearSelections } =
  selectedPeoplesSlice.actions;
export default selectedPeoplesSlice.reducer;
