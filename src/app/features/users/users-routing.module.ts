import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { canDeactivateComponentGuard } from '../../core/guards/canDeactivateComponent.guard';
import { resolveGuard } from '../../core/guards/resolve.guard';

const routes: Routes = [
    {
        path: '',
        component: UsersListComponent,   
    },
    {
        path: 'new',
        component: UsersNewComponent,
        canDeactivate: [canDeactivateComponentGuard]
    },
    {
        path: ':id',
        component: UsersDetailComponent,
        resolve: { user: resolveGuard }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
