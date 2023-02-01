import {Injectable} from '@angular/core';
import {Task} from "./interfaces/task.interface";
import {environment} from "../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, of, throwError} from "rxjs";
import {MessageResult} from "./interfaces/results/messageResult.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient) {
  }


  async addTaskToBackend(task: Task): Promise<string> {
    const url = environment.backend_api_path + environment.backend_api_request_add_task;
    const result = await this.httpClient.post<MessageResult>(url, task)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error.error || 'Server error');
        })
      ).toPromise();
    if (result?.message === undefined)
      throw Error(`Request ${url} didn't return a uid.`)
    return result.message;
  }

  async updateTaskInBackend(task: Task): Promise<string | undefined> {
    const url = environment.backend_api_path + environment.backend_api_request_update_task;
    return await this.httpClient.post<string>(url, task)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error.error || 'Server error');
        })
      ).toPromise();
  }


  async deleteTaskInBackend(uid: string): Promise<string | undefined> {
    const url = environment.backend_api_path + environment.backend_api_request_delete_task;
    return await this.httpClient.post<string>(url, uid)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error.error || 'Server error');
        })
      ).toPromise();
  }

  async loadTasks(): Promise<Task[] | undefined> {
    const url = environment.backend_api_path + environment.backend_api_request_get_all_tasks;
    return await this.httpClient.get<Task[]>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error);
          return throwError(error.error || 'Server error');
        })
      ).toPromise()

  }
}

const handleError = (requestPath: string, errorResponse: any) => {

  console.log(requestPath + ' failed: ' + errorResponse?.message + ' | ' + errorResponse?.message);

  return of();
};
