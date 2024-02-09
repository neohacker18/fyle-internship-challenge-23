import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { CacheResolverService } from './cache-resolver.service';
const TIME_TO_LIVE = 1000;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private cacheResolver: CacheResolverService
  ) {}

  getUser(githubUsername: string): Observable<any> {
    const cachedResponse=this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`, {
        observe: 'response',
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          this.cacheResolver.set(
            `https://api.github.com/users/${githubUsername}`,
            response,
            TIME_TO_LIVE
          );
        })
      );
      return cachedResponse
  }

  getRepos(githubUsername: string, currentPage: number): Observable<any> {
    const cachedResponse=this.httpClient
      .get(`https://api.github.com/users/${githubUsername}/repos?sort=updated&page=${currentPage}&per_page=6`, {
        observe: 'response',
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          this.cacheResolver.set(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&page=${currentPage}&per_page=6`,
            response,
            TIME_TO_LIVE
          );
        })
      );
      return cachedResponse
  }
}
