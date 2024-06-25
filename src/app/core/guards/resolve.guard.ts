import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { UsersService } from "../../features/users/users.service";
import { catchError, finalize } from "rxjs";
import { LoadingService } from "../../shared/loading/loading.service";


export const resolveGuard: ResolveFn<any> = (route, _state) => {
    const router = inject(Router);
    const loadingService = inject(LoadingService);
    loadingService.loadingCount += 1;
    return inject(UsersService).getUser(route.params['id']).pipe(
        catchError((error) => {
            loadingService.loadingCount = 0;
            router.navigate(['/']);
            throw error;
        }),
        finalize(() => {
            loadingService.loadingCount -= 1;
        })
    );
}