import * as fromTask from './task.reducer';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {localStorageSync} from 'ngrx-store-localstorage';

export interface AppState {
  task: fromTask.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  task: fromTask.taskReducer,
};

/**
 * Writes the specified store data into the local session storage and retrieves it on app start. Therefore, the state survives a browser refresh.
 * @see https://github.com/btroncone/ngrx-store-localstorage
 * @param reducer reducer
 */
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  const keys = ['task'];
  return localStorageSync({keys, rehydrate: true, storage: localStorage})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

