import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingCountSubject = new BehaviorSubject<number>(0);

  get loadingCount():number {
    return this.loadingCountSubject.value;
  }

  set loadingCount(value:number) {
    this.loadingCountSubject.next(value);
  }

  get isLoading():boolean {
    return this.loadingCountSubject.value > 0;
  }
}
