import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {addTaskToCache, clearTaskCache, removeTaskFromCache} from './task.actions';
import {environment} from '../../environments/environment';
import {Task} from '../interfaces/task.interface';


export interface State {
  tasks: Task[];
}

export const initialState: State = {
  tasks: [],
};

function logDebugMessages(actionName: string, state: State, newState: any): void {
  if (environment.enableReducerLogging) {
    console.log((new Date()).toLocaleString() + ': ' + actionName);
    console.log(state);
    console.log(newState);
  }
}

function copyExistingTasksWithoutGivenOne(state: State, task: Task) {
  const newTasks: Task[] = [];
  const nowUtc = new Date().getTime();
  for (const taskFromState of state.tasks) {
    // Skip the task with the ID of the given task, because we will add the given task object later
    if (task.uid === taskFromState.uid)
      continue;
    // Also skip, if the cached task is too old (or has no cache date)
    if (!taskFromState.cacheDate || (nowUtc - taskFromState.cacheDate.getTime() > environment.defaultTaskCacheAgeInSec * 1000))
      continue;
    const taskCopy: Task = {...taskFromState};
    newTasks.push(taskCopy);
  }
  return newTasks;
}

const reducer: ActionReducer<State, Action> = createReducer(
  initialState,

  on(addTaskToCache, (state, {task}) => {
    const newTasks = copyExistingTasksWithoutGivenOne(state, task);
    newTasks.push(task);
    const newState = {...state, tasks: newTasks};

    logDebugMessages('addTaskToCache', state, newState);
    return newState;
  }),
  on(removeTaskFromCache, (state, {task}) => {
    const newTasks = copyExistingTasksWithoutGivenOne(state, task);
    const newState = {...state, tasks: newTasks};

    logDebugMessages('addTaskToCache', state, newState);
    return newState;
  }),
  on(clearTaskCache, (state) => {
    const newState = {...state, tasks: []};
    logDebugMessages('clearTaskCache', state, newState);
    return newState;
  }),
);

export function taskReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
