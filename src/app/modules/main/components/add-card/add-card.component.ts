// ANGULAR
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// MAIN
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit, OnDestroy {

  @Output() clickEdit: EventEmitter<boolean> = new EventEmitter();
  private destroy$: Subject<void> = new Subject<void>();
  public addForm: FormGroup;

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private initForm(): void {
    this.addForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(3)]),
    });
  }

  private submitForm(form: any): void {
    this.todoService.add(form.title)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
          this.clickEdit.emit(true);
          this.addForm.reset();
        },
        error => {
          console.log(error);
        }
      );
  }
}
