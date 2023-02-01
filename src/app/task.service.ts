import {Injectable} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from '../app/store/app.reducer';
import {State} from './store/task.reducer';
import {Task} from "./interfaces/task.interface";
import {addTaskToCache, removeTaskFromCache, updateTaskInCache} from "./store/task.actions";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  destroy$: Subject<null> = new Subject();
  taskObservable: Observable<State>;
  apiKey?: string;
  tasksByUid: Map<string, Task> = new Map<string, Task>();
  tasksChangedSubject: Subject<Task[]> = new Subject<Task[]>()

  constructor(private store: Store<fromApp.AppState>,
              private apiService: ApiService) {
    this.taskObservable = this.store.select(state => state.task);
    this.loadTasksFromCache();
    this.loadTasksFromApi();
  }

  private loadTasksFromApi() {
    this.apiService.loadTasks().then(tasks => {
      if (tasks !== undefined && tasks.length > 0) {
        tasks.forEach(task => {
          if (task.uid) {
            this.tasksByUid.set(task.uid, task);
            this.store.dispatch(addTaskToCache({task}));
          }
        });
        this.tasksChangedSubject.next(tasks)
      }
    })
  }

  private loadTasksFromCache() {
    this.taskObservable.pipe(takeUntil(this.destroy$)).subscribe(state => {
      if (state.tasks) {
        this.tasksByUid = new Map<string, Task>();
        state.tasks.forEach(task => {
          if (task.uid) {
            this.tasksByUid.set(task.uid, task);
            this.apiService.updateTaskInBackend(task)
          } else {
            this.apiService.addTaskToBackend(task).then(uid => {
                task = {...task, uid}
                this.tasksByUid.set(uid, task);
                this.store.dispatch(addTaskToCache({task}));
              }
            )
          }
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

  saveTask(task: Task) {
    task = {...task, cacheDate: new Date()}

    if (task.uid) {
      this.updateTaskInBackend(task)
      this.store.dispatch(updateTaskInCache({task}));
    } else {
      this.addTaskToBackend(task).then(uid => {
        task = {...task, uid}
        this.store.dispatch(addTaskToCache({task}));
      }).catch((error: string) => {
          console.error("Error saving task in backend. Is the backend available? " + error)
          task = {
            ...task, uid: (task.summary + this.getRandomInt(99999999999))
          }
          this.store.dispatch(addTaskToCache({task}));
        }
      )
    }

  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  private addTaskToBackend(task: Task) {
    return this.apiService.addTaskToBackend(task)
  }

  private updateTaskInBackend(task: Task) {
    return this.apiService.updateTaskInBackend(task)
  }

  deleteTask(task: Task) {
    if (task?.uid === undefined)
      return
    this.store.dispatch(removeTaskFromCache({task}))
    return this.apiService.deleteTaskInBackend(task.uid)
  }
}
