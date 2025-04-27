import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
    selectCartState,
    (state: CartState) => state
  );

export const selectEntries = createSelector(
  selectCartState,
  (state: CartState) => state.entries
);

export const selectServicesAvailable = createSelector(
  selectCartState,
  (state: CartState) => state.servicesAvailable
);

export const selectServicesSelected = createSelector(
  selectCartState,
  (state: CartState) => state.servicesSelected
);

export const selectLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);

export const selectError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);
