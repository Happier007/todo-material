import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITask } from '../../../../models/task.interface';
import { STATUSES } from '../../../../models/statuses';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements OnInit {

  public editForm: FormGroup;
  public task: ITask;
  public statuses = STATUSES;

  constructor(
    private dialogRef: MatDialogRef<EditCardComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.task = data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(3)]),
      due_date: new FormControl(),
      description: new FormControl(),
      status: new FormControl(),
    });
    this.editForm.patchValue(this.task);
  }

  private submitForm(form) {
    this.dialogRef.close(form);
  }

  private close() {
    this.dialogRef.close();
  }
}


