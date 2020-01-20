import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('PROBAO INTERSEPT');
    if (sessionStorage.getItem('key') != null) {
      console.log('INTERSEPTOVAO');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem('key')}`
        }
      });
    }
    return next.handle(request);
  }
}
