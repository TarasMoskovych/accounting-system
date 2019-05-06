import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { UsersService, AuthService } from 'src/app/core';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  form: FormGroup;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur'
      }),
      name: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      agreement: new FormControl(false, [Validators.required, Validators.requiredTrue])
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit() {
    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);

    this.usersService.createUser(user)
      .pipe(
        switchMap(() => {
          return this.usersService.createEmail({ email });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.authService.setUser(user);
        this.router.navigate(['/login'], {
          queryParams: {
            isRegistered: true
          }
        });
      });
  }
}
