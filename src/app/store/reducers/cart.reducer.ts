import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  entries: any[];
  servicesAvailable: any[];
  servicesSelected: any[];
  loading: boolean;
  error: any;
}

export const initialState: CartState = {
  entries: [],
  servicesAvailable: [],
  servicesSelected: [],
  loading: false,
  error: null
};

export const cartReducer = createReducer(
  initialState,

  on(CartActions.loadCart, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CartActions.loadCartSuccess, (state, { cart }) => ({
    ...state,
    entries: cart.entries,
    servicesAvailable: cart.servicesAvailable,
    servicesSelected: cart.servicesSelected,
    loading: false
  })),
  
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(CartActions.addEntrySuccess, (state, { entry }) => ({
    ...state,
    entries: [...state.entries, entry]
  })),

  on(CartActions.addSelectedServiceSuccess, (state, { service }) => ({
    ...state,
    servicesSelected: [...state.servicesSelected, service]
  }))
);
