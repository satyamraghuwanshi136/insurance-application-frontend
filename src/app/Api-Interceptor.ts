import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(public loginService: LoginService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = req;

    const token = this.loginService.getToken();
    if(token != null){
      apiReq = apiReq.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }


    apiReq = apiReq.clone({ url: `http://localhost:8072${req.url}` });
    return next.handle(apiReq);
  }
}