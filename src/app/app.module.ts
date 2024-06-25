import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { API_URL } from './core/tokens';
import { LoggingInterceptor, loggingInterceptor } from './core/interceptors/logging.interceptor';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './shared/loading/loading.interceptor';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: API_URL,
      useValue: '/api'
    },
    provideHttpClient(
      withFetch(),
      // withInterceptorsFromDi(),
      withInterceptors([
        loadingInterceptor,
        loggingInterceptor,
        headersInterceptor,
        errorInterceptor
      ])
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
