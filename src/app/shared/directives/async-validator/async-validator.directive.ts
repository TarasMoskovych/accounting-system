import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, first, map, delay, switchMap, tap } from 'rxjs/operators';
import { Observable, Observer, timer, of } from 'rxjs';

import { RecordsService, UsersService } from 'src/app/core';

@Directive({
  selector: '[appAsyncValidator][formControlName], [appAsyncValidator][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncValidatorDirective,
      multi: true
    }
  ]
})
export class AsyncValidatorDirective implements Validator {
  constructor(
    private recordsService: RecordsService,
    private usersService: UsersService
  ) { }

  validate(c: AbstractControl): Observable <{[key: string]: any}> {
    const formGroupName = this.getFormGroupName(c);
    let callback = null;

    switch (true) {
      case formGroupName.includes('category'):
        callback = this.validateCategory.bind(this);
        break;
      case formGroupName.includes('email'):
        callback = this.validateEmail.bind(this);
        break;
      default:
        callback = null;
    }

    if (!callback) {
      return of(null);
    }

    return of(false).pipe(
      delay(500),
      switchMap(() => callback(c.value)),
      switchMap(data =>  data ? of({ duplicate: true }) : of(null))
    );
  }

  private validateEmail(email: string) {
    return this.usersService.checkEmail(email);
  }

  private validateCategory(category: string) {
    return this.recordsService.checkCategories(category);
  }

  private getFormGroupName(control: AbstractControl): string | null {
    const group = control.parent as FormGroup;
    let name: string;

    if (!group) { return null; }

    Object.keys(group.controls).forEach(key => {
      const childControl = group.get(key);

      if (childControl !== control) { return null; }

      name = key;
    });

    return name;
  }
}
