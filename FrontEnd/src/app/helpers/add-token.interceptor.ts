import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toastr:ToastrService,private loginService:LoginService,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=localStorage.getItem('token');
    if(token){
      request = request.clone({setHeaders:{Authorization:`Bearer ${token}`}})
    }
    //cambio para el error 401
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error && (error.status == 401||error.status == 0) ){//porsicaso pongo tambien en status 0
            this.toastr.error('Sesion expirada','Error!');
            this.loginService.removelocalStorage();
            this.router.navigate(['/inicio/login']);
          }
          return throwError(error);
      }));
  }
}
