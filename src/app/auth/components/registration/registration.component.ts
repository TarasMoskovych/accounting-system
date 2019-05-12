import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { UsersService, AuthService, BillService } from 'src/app/core';
import { User, Bill } from 'src/app/shared/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  form: FormGroup;
  currencies = ['USD', 'EUR', 'UAH'];

  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService,
    private billsService: BillService
  ) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit(): void {
    const { email, password, name, bill, currency } = this.form.value;
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
        this.billsService.createBill(new Bill(bill, currency, user.id))
          .subscribe((data: Bill) => {
            this.router.navigate(['/login'], {
              queryParams: {
                isRegistered: true
              }
            });
          });
      });
  }

  private createRegistrationForm(): void {
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
      bill: new FormControl(0, {
        validators: [Validators.required, Validators.minLength(0)],
        updateOn: 'blur'
      }),
      currency: new FormControl(this.currencies[0], {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      agreement: new FormControl(false, [Validators.required, Validators.requiredTrue])
    });
  }
}
