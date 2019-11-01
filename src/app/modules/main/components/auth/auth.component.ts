// ANGULAR
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// RXJS
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// MAIN
import { AuthService } from '../../services';
import { IUser } from '../../../../models/user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/),
        Validators.minLength(3)]),
      password: new FormControl(),
    });
  }

  private submitForm(form: IUser): void {
    this.authService.authenticate(form)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
          this.router.navigateByUrl('/todo');
        },
        error => {
          console.log(error);
        }
      );
  }
}
