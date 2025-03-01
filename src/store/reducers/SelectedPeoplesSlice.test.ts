import selectedPeoplesSlice, {
  togglePeopleSelection,
  toggleSelectAll,
  clearSelections,
} from './SelectedPeoplesSlice';

describe('selectedPeoplesSlice', () => {
  it('should handle initial state', () => {
    expect(selectedPeoplesSlice(undefined, { type: 'unknown' })).toEqual({
      selected: {},
    });
  });

  it('should handle togglePeopleSelection', () => {
    const initialState = { selected: {} };
    const action = togglePeopleSelection('1');
    const state = selectedPeoplesSlice(initialState, action);
    expect(state.selected['1']).toBe(true);

    const nextState = selectedPeoplesSlice(state, action);
    expect(nextState.selected['1']).toBe(false);
  });

  it('should handle toggleSelectAll', () => {
    const initialState = { selected: { '1': false, '2': false } };
    const action = toggleSelectAll(['1', '2']);
    const state = selectedPeoplesSlice(initialState, action);
    expect(state.selected['1']).toBe(true);
    expect(state.selected['2']).toBe(true);

    const nextState = selectedPeoplesSlice(state, action);
    expect(nextState.selected['1']).toBe(false);
    expect(nextState.selected['2']).toBe(false);
  });

  it('should handle clearSelections', () => {
    const initialState = { selected: { '1': true, '2': true } };
    const action = clearSelections();
    const state = selectedPeoplesSlice(initialState, action);
    expect(state.selected).toEqual({});
  });
});
