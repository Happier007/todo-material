import { TaskStatus } from './task-status.enum';

export interface ITask {
  id?: number;
  title: string;
  due_date: string;
  status: TaskStatus;
  description: string;
}

export interface IListResponse {
  count: number;
  results: ITask[];
  next: string;
  previous: string;
}

