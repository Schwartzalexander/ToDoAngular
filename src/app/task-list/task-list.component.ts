import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../task.service";
import {Subject, takeUntil} from "rxjs";
import {Task} from "../interfaces/task.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  destroy$: Subject<null> = new Subject();
  public tasks: Task[] = [];
  public summaryMaxLength = 80;
  form!: FormGroup;
  public formError = "";
  public selectedTask?: Task;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    let tasksChangedSubject = this.taskService.tasksChangedSubject;
    tasksChangedSubject.pipe(takeUntil(this.destroy$)).subscribe(tasks => {
      this.tasks = tasks
    })
    this.form = this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  getColor(task: Task) {
    if (task.completed)
      return "#80FF80"
    return "whitesmoke";
  }

  private createForm(): FormGroup {
    const builder = this.formBuilder;

    return builder.group({
      summary: [null, Validators.required],
      dueDate: [null, Validators.required],
      completed: [null],
      description: [null, Validators.required],

    });

  }

  save() {
    if (!this.form.valid) {
      this.formError = $localize`The form is invalid. Saving not possible.`
      return
    }

    let summary = this.form.value.summary;
    let description = this.form.value.description;
    let completed = this.form.value.completed === true
    let dueDate = this.form.value.dueDate

    if (!completed && this.selectedTask?.completed === true) {
      this.formError = $localize`A completed task cannot be uncompleted.`
      return
    }
    let task: Task = {summary, description, completed, dueDate}
    if (this.selectedTask?.uid)
      task = {...task, uid: this.selectedTask.uid}
    this.taskService.saveTask(task);
    this.formError = ""
    this.resetForm();


  }

  private resetForm() {
    this.form.reset()
    Object.keys(this.form.controls).forEach(key => {
      this.form!.get(key)!.setErrors(null);
    });
    this.selectedTask = undefined
  }

  select(task: Task) {
    if (this.selectedTask === task) {
      this.selectedTask = undefined
      this.resetForm();
      return
    }
    this.selectedTask = task
    this.form.patchValue({
      summary: task.summary,
      description: task.description,
      completed: task.completed,
      dueDate: task.dueDate
    })
  }

  delete(task: Task) {
    this.taskService.deleteTask(task)
    this.selectedTask = undefined
    this.resetForm()
  }

  getSaveButtonLabel(): string {
    if (this.selectedTask === undefined)
      return $localize`Create`
    else
      return $localize`Update`
  }
}
