import { rootReducer, store } from './store';

describe('Тестирование rootReducer', () => {
  it('проверка редьюсера', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const newState = store.getState();

    expect(state).toEqual(newState);
  });
});
