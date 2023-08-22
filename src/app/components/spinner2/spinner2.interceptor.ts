import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { Spinner2Service } from './spinner2.service';
export const IS_SPINNER_ENABLED = new HttpContextToken<boolean>(() => false);

@Injectable()
export class Spinner2Interceptor implements HttpInterceptor {
  constructor(
    public spinner2Service: Spinner2Service,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !this.loaderService.state &&
      !window.location.pathname.includes('discover') &&
      // !window.location.pathname.includes('referrals') &&
      !window.location.pathname.includes('dashboard') &&
      !window.location.pathname.includes('quote-details') &&
      // !window.location.pathname.includes('subscriptions') &&
      !window.location.pathname.includes('find-my-partners') &&
      req?.body?.url !== '/V8/custom/portal/fetch-subscribed-plan' &&
      req?.body?.url !== '/V8/custom/portal/email-list' &&
      req?.body?.url !== '/V8/custom/portal/send-message'
    )
      this.spinner2Service.show();
    return next.handle(req).pipe(
      finalize(() => {
        if (!req.context.get(IS_SPINNER_ENABLED)) this.spinner2Service.hide();
      })
    );
  }
}
