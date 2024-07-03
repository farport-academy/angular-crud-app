import { Component, inject } from '@angular/core';
import {
  globalSignupFormConfig,
  userSignupFormConfig,
} from '../../../core/configs';
import { User } from '../../../core/models';
import { EssentialComponent } from '../../../core/components/essentialComponent';
import { CanDeactivateComponent } from '../../../core/guards/can-exit.guard';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/auth/auth.service';
import { take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent
  extends EssentialComponent
  implements CanDeactivateComponent
{
  formConfig = userSignupFormConfig;
  globalValidators = globalSignupFormConfig;
  authService = inject(AuthService);
  canLeave = true;

  dialogTitle = 'Sei Sicuro? ';
  dialogContent = 'I tuoi dati andranno persi';


  createUser(user: User) {
    const { confirmPassword, ...currentUser } = user;
    this.authService
      .signup(currentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.canLeave = true;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('erroneous', err.message);
        },
      });
  }

  canDeactivate() {
    return this.canLeave;
  }

  monitorFormState(form: FormGroup) {
    console.log(form.valid);

    this.canLeave = !(form.touched && form.dirty) && form.valid;
  }
}
