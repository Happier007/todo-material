// ANGULAR
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// RXJS
import { Observable } from 'rxjs';

// MAIN
import { ITask } from '../../../../models/task.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public task$: Observable<ITask> = new Observable<ITask>();

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getTask();
  }

  private getTask(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.task$ = this.todoService.getTask(id);
  }
}
