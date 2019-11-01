// ANGULAR
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// MAIN
import { IListResponse, ITask } from '../../../models/task.interface';
import { TaskStatus } from '../../../models/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = '/api/tasks/';

  constructor(private http: HttpClient) {
  }

  public add(title: string): Observable<any> {
    const status = 0;
    const description = 'test';
    const due_date = this.formatDate(new Date());
    const newTask: ITask = {
      title,
      status,
      due_date,
      description
    }
    return this.http.post(this.url, newTask);
  }

  public getTasks(): Observable<any> {
    return this.http.get(this.url)
      .pipe(
        map((data: IListResponse) => {
          return data.results;
        })
      );
  }

  public getTask(id: any): Observable<any> {
    return this.http.get(this.url + id.toString() + '/')
      .pipe(
        map((data: ITask) => {
          return data;
        })
      );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + id + '/');
  }

  public update(task: ITask): Observable<any> {
    return this.http.put(this.url + task.id + '/', task);
  }

  public formatDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`;
  }

  public status(id: number): string {
    let statusName: string;
    switch (id) {
      case TaskStatus.TODO: {
        statusName = 'To Do';
        break;
      }
      case TaskStatus.PROGRESS: {
        statusName = 'In Progress';
        break;
      }
      case TaskStatus.DONE: {
        statusName = 'Done';
        break;
      }
      default: {
        statusName = 'To Do';
        break;
      }
    }
    return statusName;
  }
}
