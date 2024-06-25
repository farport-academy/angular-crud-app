import { Component, inject } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  template: `
    @if(loadingService.isLoading){ 
      ...loading 
    } @else {
    <ng-content></ng-content>
    }
  `,
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
}
