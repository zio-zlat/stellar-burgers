import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsThunk } from '../../services/ingredients/actions';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { checkUser } from '../../services/user/actions';
import {
  clearOrderByNumber,
  getNumber
} from '../../services/orderNumber/slice';
import { clearSelectIngredient } from '../../services/ingredients/slice';

export const App = () => {
  const dispatch = useDispatch();
  const numberOrder = useSelector(getNumber);
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(checkUser());
  }, []);

  const closeModal = () => {
    if (numberOrder) {
      dispatch(clearOrderByNumber());
      return navigate(-1);
    }
    dispatch(clearSelectIngredient());
    return navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={numberOrder ? `#${numberOrder}` : 'Загрузка'}
                children={<OrderInfo />}
                onClose={closeModal}
              />
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                children={<IngredientDetails />}
                onClose={closeModal}
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={numberOrder ? `#${numberOrder}` : 'Загрузка'}
                children={<OrderInfo />}
                onClose={closeModal}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};
