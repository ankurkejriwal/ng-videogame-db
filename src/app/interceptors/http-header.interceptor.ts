import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable,throwError as observableThrowError } from "rxjs";
import {catchError} from 'rxjs/operators'

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor{

    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next : HttpHandler
    ): Observable<HttpEvent<any>>{
        req = req.clone({
            setHeaders:{
                'x-rapidapi-key': '1cb18a7356msh43c9b045fdff024p1c7ea0jsnc690cf69f50d',
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
            },
            setParams:{
                key:'112ca699f8e84b649607c6ea9f331a1c',
            }
        });

        return next.handle(req);
    }
}