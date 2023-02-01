import {Injectable} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from '../app/store/app.reducer';
import {State} from './store/task.reducer';
import {Task} from "./interfaces/task.interface";
import {addTaskToCache, removeTaskFromCache} from "./store/task.actions";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  destroy$: Subject<null> = new Subject();
  taskObservable: Observable<State>;
  apiKey?: string;
  tasksByUid: Map<string, Task> = new Map<string, Task>();
  tasksChangedSubject: Subject<Task[]> = new Subject<Task[]>()

  constructor(private store: Store<fromApp.AppState>) {
    this.taskObservable = this.store.select(state => state.task);

    this.taskObservable.pipe(takeUntil(this.destroy$)).subscribe(state => {
      if (state.tasks) {
        this.tasksByUid = new Map<string, Task>();
        state.tasks.forEach(task => {
          if (task.uid)
            this.tasksByUid.set(task.uid, task);
        });
        this.tasksChangedSubject.next(this.getTasks())
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  getTasks(): Task[] {
    return [...this.tasksByUid.values()]
  }

  getTasksChangedSubject(): Subject<Task[]> {
    return this.tasksChangedSubject
  }

  addTask(task: Task): Boolean {
    task = {...task, cacheDate: new Date()}

    if (task.uid) {
      this.updateTaskInBackend(task)
    } else {
      const uid = this.insertTaskInBackend(task)
      task = {...task, uid}
    }

    this.store.dispatch(addTaskToCache({task}));
    return true
  }

  private insertTaskInBackend(task: Task) {
    return "dhfghfghfg"
  }

  private updateTaskInBackend(task: Task) {

  }

  deleteTask(task: any) {
    this.store.dispatch(removeTaskFromCache({task}))
  }
}
