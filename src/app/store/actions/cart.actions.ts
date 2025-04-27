import { createAction, props } from '@ngrx/store';

export const loadCart = createAction('[Cart] Load Cart');
export const loadCartSuccess = createAction('[Cart] Load Cart Success', props<{ cart: any }>());
export const loadCartFailure = createAction('[Cart] Load Cart Failure', props<{ error: any }>());

export const addEntry = createAction('[Cart] Add Entry', props<{ entry: any }>());
export const addEntrySuccess = createAction('[Cart] Add Entry Success', props<{ entry: any }>());
export const addEntryFailure = createAction('[Cart] Add Entry Failure', props<{ error: any }>());

export const addSelectedService = createAction('[Cart] Add Selected Service', props<{ service: any }>());
export const addSelectedServiceSuccess = createAction('[Cart] Add Selected Service Success', props<{ service: any }>());
export const addSelectedServiceFailure = createAction('[Cart] Add Selected Service Failure', props<{ error: any }>());
