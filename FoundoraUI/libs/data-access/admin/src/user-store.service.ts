import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ApiService } from '@foundora-ui/data-access/shared';
import { pipe, switchMap, takeWhile, tap } from 'rxjs';
import { User } from './model/user.model';

type StatusMessage = {
  title?: string;
  message?: string;
  type: 'danger' | 'warning' | 'success' | 'info';
};

type StoreState = 'pristine' | 'busy' | 'available';

type UserState = {
  users: User[];
  message: StatusMessage | null;
  status: StoreState;
};

const initialState: UserState = {
  users: [],
  message: null,
  status: 'pristine'
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    length: computed(() => state.users().length)
  })),
  withMethods((state, service = inject(ApiService))=>({
    load: rxMethod<void>(
      pipe(
        takeWhile(() => state.status() !== 'busy'),
        tap(()=> patchState(state,{status: 'busy'})),
        switchMap(()=>
          service.get('User').pipe(
            tapResponse({
              next(respose){
                patchState(state, {
                  users: respose as User[],
                  status: 'available'
                });
              },
              error(error){
                console.log(error);
                patchState(state, {status: 'available'});
              }
            })
          )
        )
      )
    )
  })),
  withHooks({
    onInit(store) {
      console.log('init');
      store.load();
    },
    onDestroy(store) {
      console.log('destroy');
    },
  })
);