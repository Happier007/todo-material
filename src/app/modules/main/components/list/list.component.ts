// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// RXJS
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// MAIN
import { ITask } from '../../../../models/task.interface';
import { EditCardComponent } from '../edit-card/edit-card.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public tasks$: Observable<ITask[]> = new Observable<ITask[]>();

  constructor(private todoService: TodoService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTaskList(): void {
    this.tasks$ = this.todoService.getTasks();
  }

  public delete(id: number): void {
    this.todoService.delete(id)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data) => {
          this.getTaskList();
        }
      );
  }

  private openDialog(taskID: number): void {
    this.todoService.getTask(taskID)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (data: ITask) => {
          this.createDialog(data);
        });
  }

  private createDialog(task: ITask) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = task;

    const dialogRef = this.dialog.open(EditCardComponent, dialogConfig);
    dialogRef.afterClosed()
      .pipe(
        map((item) => {
          item.due_date = this.todoService.formatDate(item.due_date);
          return item;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => {
        if (result) {
          this.todoService.update(result)
            .pipe(
              takeUntil(this.destroy$)
            )
            .subscribe(
              (data) => {
                this.getTaskList();
              });
        }
      });
  }

  private editTaskEvent(isNewTask: boolean): void {
    if (isNewTask) {
      this.getTaskList();
    }
  }

  private status(statusID: number): string {
    return this.todoService.status(statusID);
  }
}



