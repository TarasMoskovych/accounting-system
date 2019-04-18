import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService, AuthService } from 'src/app/core/services';
import { Message } from 'src/app/shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur'
      }),
    });

    if (this.route.snapshot.queryParams.isRegistered) {
      const { email, password } = this.authService.getUser();
      this.showMessage('You can Log in System', 'success');
      this.form.patchValue({ email, password });
    }
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: any) => {
        if (user.email) {
          if (user.password === formData.password) {
            this.authService.login(user);
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Password is incorrect!', 'warning');
          }
        } else {
          this.showMessage('User is not found!');
        }
      });
  }

  onHideAlert() {
    this.message.text = '';
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
  }
}
