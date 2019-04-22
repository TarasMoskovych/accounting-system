import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UsersService, AuthService } from 'src/app/core';
import { User } from 'src/app/shared/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private sub$: Subscription;

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
        asyncValidators: this.validateEmail.bind(this),
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
    if (this.sub$) { this.sub$.unsubscribe(); }
  }

  onSubmit() {
    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);

    this.sub$ = this.usersService.createUser(user).pipe(switchMap(() => {
      return this.usersService.createEmail({ email });
    })).subscribe(() => {
        this.authService.setUser(user);
        this.router.navigate(['/login'], {
          queryParams: {
            isRegistered: true
          }
        });
      });
  }

  private validateEmail(control: FormControl): Observable<any> {
    return this.usersService.checkEmail(control.value)
      .pipe(switchMap((user: User) => user && user.email ? of({ duplicateEmail: true }) : of(null)));
  }
}
