import { TUser } from '@utils-types';
import {
  checkUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userActions';
import { initialState, userSlice } from './userSlice';

const user: TUser = {
  email: 'test@test.ru',
  name: 'Иван Иванов'
};

describe('проверка редьюсеров слайса user', () => {
  it('проверка редьюсера', () => {
    const state = userSlice.reducer(initialState, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('checkUser rejected', () => {
    const action = { type: checkUser.rejected.type };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('checkUser fulfilled', () => {
    const action = {
      type: checkUser.fulfilled.type,
      payload: user
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, user: user, isAuthChecked: true });
  });

  it('loginUser rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserError: 'Ошибка'
    });
  });

  it('loginUser fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: user
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, user: user, isAuthChecked: true });
  });

  it('registerUser rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      registerUserError: 'Ошибка'
    });
  });

  it('registerUser fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: user
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, user: user, isAuthChecked: true });
  });

  it('logoutUser rejected', () => {
    const action = { type: logoutUser.rejected.type };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('logoutUser fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('updateUser rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, updateUserError: 'Ошибка' });
  });

  it('updateUser fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: user
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, user: user });
  });
});
