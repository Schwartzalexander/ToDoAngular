import {createAction, props} from '@ngrx/store';
import {Task} from "../interfaces/task.interface";

export const addTaskToCache = createAction('[Task] Adding task to cache', props<{ task: Task }>());
export const removeTaskFromCache = createAction('[Task] Removing task from cache', props<{ task: Task }>());
export const clearTaskCache = createAction('[Task] Clearing task cache');
export const clearTasks = createAction('[Task] Clearing all tasks');






