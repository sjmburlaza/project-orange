import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from '../actions/cart.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private cartService: CartService
  ) {}

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      mergeMap(() => 
        this.cartService.getCart().pipe(
          tap(() => console.log('loadcart')),
          map(cart => CartActions.loadCartSuccess({ cart })),
          catchError(error => of(CartActions.loadCartFailure({ error }))),
        )
      )
    )
  );

  addEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addEntry),
      mergeMap(({ entry }) => 
        this.cartService.addEntry(entry).pipe(
          map(newEntry => CartActions.addEntrySuccess({ entry: newEntry })),
          catchError(error => of(CartActions.addEntryFailure({ error })))
        )
      )
    )
  );

  addSelectedService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addSelectedService),
      mergeMap(({ service }) => 
        this.cartService.addSelectedService(service).pipe(
          map(newService => CartActions.addSelectedServiceSuccess({ service: newService })),
          catchError(error => of(CartActions.addSelectedServiceFailure({ error })))
        )
      )
    )
  );

}
