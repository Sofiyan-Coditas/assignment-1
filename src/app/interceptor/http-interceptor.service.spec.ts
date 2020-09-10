import { TestBed } from '@angular/core/testing';

import { HttpInterceptorService } from './http-interceptor.service';
import { HttpRequest, HttpHandler } from '@angular/common/http';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call intercept method', () => {
    const interceptSpy = spyOn(service, 'intercept');
    const req = new HttpRequest('GET', 'https://google.com',);
    let next: HttpHandler;
    service.intercept(req, next);
    expect(interceptSpy).toHaveBeenCalledTimes(1);
  });
});
