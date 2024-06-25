import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { EssentialComponent } from '../../../core/essentialComponent';
import { userTableConfig } from '../users.config';
import { User } from '../models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent extends EssentialComponent{

   usersService = inject(UsersService);
   tableConfig = userTableConfig
   users$ = this.usersService.getUsers();
  

   goToDetail(user:User){
     this.router.navigate([user.id])
   }
}
