import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ApiService } from '@foundora-ui/data-access/shared';
import { pipe, switchMap, takeWhile, tap } from 'rxjs';
import { Role } from './model/role.model';
import { HttpHeaders } from '@angular/common/http';
import { UserStore } from './user-store.service';

type StatusMessage = {
  title?: string;
  message?: string;
  type: 'danger' | 'warning' | 'success' | 'info';
};

type StoreState = 'pristine' | 'busy' | 'available';

type RoleState = {
  roles: Role[];
  message: StatusMessage | null;
  status: StoreState;
};

const initialState: RoleState = {
    roles: [],
  message: null,
  status: 'pristine'
};

export const RoleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    length: computed(() => state.roles().length)
  })),
  withMethods((state, service = inject(ApiService))=>({
    load: rxMethod<void>(
      pipe(
        takeWhile(() => state.status() !== 'busy'),
        tap(()=> patchState(state,{status: 'busy'})),
        switchMap(()=>
          service.get('Role').pipe(
            tapResponse({
              next(respose){
                patchState(state, {
                  roles: respose as Role[],
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
    ),
    create: rxMethod<{roleName: string}>(
        pipe(
        takeWhile(() => state.status() !== 'busy'),
        tap(()=> patchState(state,{status: 'busy'})),
        switchMap((payload)=>
          service.post('Role',payload,new HttpHeaders({'Content-Type': 'application/json',})).pipe(
            tapResponse({
              next(respose){
                patchState(state, {
                    message: {
                        title: 'Role was Created',
                        type: 'success',
                        message: '${payload.name} was created'
                    },
                    status: 'available',
                    roles: [...state.roles(), respose as Role]
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
    ),
  })),
  withMethods((state, service = inject(ApiService), userStore = inject(UserStore))=>({
    assign: rxMethod<{UserId: string, RoleName: string}>(
        pipe(
        takeWhile(() => state.status() !== 'busy'),
        tap(()=> patchState(state,{status: 'busy'})),
        switchMap((payload)=>
          service.post('Role/assign',payload,new HttpHeaders({'Content-Type': 'application/json',})).pipe(
            tapResponse({
              next(respose){
                patchState(state, {
                    message: {
                        title: 'Role was assigned to User',
                        type: 'success',
                        message: '${payload.RoleName} was assigned to User'
                    },
                    status: 'available',
                });
                userStore.users().map((user) =>
                  user.id === payload.UserId
                    ? { ...user, roles: [...user.roles, payload.RoleName] }
                    : user
                );
              },
              error(error){
                console.log(error);
                patchState(state, {status: 'available'});
              }
            })
          )
        )
      )
    ),
    remove: rxMethod<{UserId: string, RoleName: string}>(
      pipe(
      takeWhile(() => state.status() !== 'busy'),
      tap(()=> patchState(state,{status: 'busy'})),
      switchMap((payload)=>
        service.post('Role/remove',payload,new HttpHeaders({'Content-Type': 'application/json',})).pipe(
          tapResponse({
            next(respose){
              patchState(state, {
                  message: {
                      title: 'Role was removed from User',
                      type: 'success',
                      message: '${payload.RoleName} was removed from User'
                  },
                  status: 'available',
              });
              userStore.users().map((user) =>
                user.id === payload.UserId
                ? { ...user, roles: user.roles.filter((role) => role !== payload.RoleName) }
                : user
              );
            },
            error(error){
              console.log(error);
              patchState(state, {status: 'available'});
            }
          })
        )
      )
    )
  ),
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