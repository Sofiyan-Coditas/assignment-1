import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { finalize, map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = this.updateUrl(req);
    let bearer = window.sessionStorage.getItem('token');
    if (req.headers.has('X-Skip-Interceptor')) {
			req.headers.delete('X-Skip-Interceptor');
		} else {
			req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
			req = req.clone({ body: JSON.stringify(req.body) });
    }
    if (bearer !== null) {
			bearer = 'Bearer ' + bearer;
			req = req.clone({ headers: req.headers.set('Authorization', bearer) });
    }
    req = req.clone({ url });
		this.requests.push(req);
		return next.handle(req).pipe(
			map(response => {
				if (response instanceof HttpResponse) {
					this.removeRequest(req);
					return response;
				}
			}),
			catchError((error: HttpErrorResponse) => {
				this.removeRequest(req);
				// Check for un-authorized user and log it out
				if (error.status === 401) {
					// this.commonService.logoutUnAuthorizedUser();
				}
				if (error.status === 500) {
					console.log('SOMETHING_WENT_WRONG', '');
				} else if (error.error.detail) {
					console.log(error.error.detail, '');
				}
				console.log(error);
				return throwError(error);
			}),
			finalize(() => this.removeRequest(req))
		);
  }

  private updateUrl(req: any) {
		if (req.url.indexOf('i18n') !== -1) {
			return req.url;
		} else {
			req = req.clone({ withCredentials: true });
			return req.url;
		}
  }
  
  private removeRequest(req: HttpRequest<any>) {
		const requestIndex = this.requests.indexOf(req);
		if (requestIndex >= 0) {
			this.requests.splice(requestIndex, 1);
		}
		if (this.requests.length > 0) {
			// this.showLoader();
		} else {
			// this.hideLoader();
		}
	}
}
