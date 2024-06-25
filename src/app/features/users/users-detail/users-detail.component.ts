import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { EssentialComponent } from '../../../core/essentialComponent';
import { userFormConfig } from '../users.config';
import { catchError, map, takeUntil, throwError } from 'rxjs';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss',
})
export class UsersDetailComponent extends EssentialComponent {
  usersService = inject(UsersService);
  formConfig = userFormConfig;

  user$ = this.route.data.pipe(
    map((data) => data['user']),
  );

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log(data)
    })
  }

  deleteUser(user: any) {
    this.usersService
      .deleteUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  updateUser(user: any) {
    this.usersService
      .updateUser({ ...user, id: this.routeParams['id'] })
      .pipe(takeUntil(this.destroy$))
      .subscribe((_user) => {
        this.router.navigate(['/']);
      });
  }
}
