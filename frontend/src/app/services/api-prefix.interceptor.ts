import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from '../../environments/environment';


/**
 * Prefixes all requests with `environment.apiUrl` and `environment.appUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor() {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
      console.log(environment.apiUrl);
    request = request.clone({ url: environment.apiUrl + request.url });
    return next.handle(request);
  }
}
