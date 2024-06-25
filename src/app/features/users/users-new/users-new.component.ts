import { Component, inject } from '@angular/core';
import { userFormConfig } from '../users.config';
import { UsersService } from '../users.service';
import { User } from '../models';
import { takeUntil } from 'rxjs';
import { EssentialComponent } from '../../../core/essentialComponent';
import { Router } from '@angular/router';
import { CanDeactivateComponent } from '../../../core/guards/canDeactivateComponent.guard';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrl: './users-new.component.scss'
})
export class UsersNewComponent extends EssentialComponent implements CanDeactivateComponent{
  formConfig = userFormConfig
  usersService = inject(UsersService)

  canDeactivateRoute: boolean = true


  
  createUser(user: User){
    this.usersService.addUser(user).pipe(
      takeUntil(this.destroy$)
    ).subscribe((_user) => {
      this.router.navigate(['/'])
    })
  }

  listenChanges(form: FormGroup){
    this.canDeactivateRoute = !form.dirty
  }

  canDeactivate(): boolean {
    return this.canDeactivateRoute
  }

  

}
