import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService, AuthService } from 'src/app/core/services';
import { Message } from 'src/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  form: FormGroup;
  message: Message;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.usersService.getUserByCredentials(formData.email, formData.password)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        if (data) {
          this.authService.login(data);
          this.router.navigate(['/system', 'bill']);
        } else {
          this.showMessage('User is not found!');
        }
      });
  }

  onHideAlert(): void {
    this.message.text = '';
  }

  private createLoginForm(): void {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)]
      }),
    });

    if (this.route.snapshot.queryParams.isRegistered) {
      const { email, password } = this.authService.getUser();
      this.showMessage('You can Log in System', 'success');
      this.form.patchValue({ email, password });
    }
  }

  private showMessage(text: string, type: string = 'danger'): void {
    this.message = new Message(type, text);
  }
}
