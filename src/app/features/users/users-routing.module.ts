import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersComponent } from './users.component';
import { userResolver, usersResolver } from '../../core/resolvers/user.resolver';
import { canExitGuard } from '../../core/guards/can-exit.guard';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children:[
            {
                path: '',
                component: UsersListComponent,   
                resolve:{
                    users: usersResolver
                }
            },
            {
                path: ':id',
                component: UsersDetailComponent,
                resolve: {
                    user: userResolver
                },
                canDeactivate: [canExitGuard]
            }
        ]
    }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
