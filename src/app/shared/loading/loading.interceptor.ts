import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, catchError, finalize } from "rxjs";
import { LoadingService } from "./loading.service";

export function loadingInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>>{
    const loadingService = inject(LoadingService);
    
    loadingService.loadingCount += 1
    return next(req).pipe(
        catchError((_error) => {
            loadingService.loadingCount = 0
            throw _error
        }),
        finalize(() => {
            loadingService.loadingCount -= 1
        })
    );
}