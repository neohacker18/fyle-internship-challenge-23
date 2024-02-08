import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string):Observable<User>{
    return this.httpClient.get<User>(`https://api.github.com/users/${githubUsername}`);
  }

  getRepos(githubUsername: string,currentPage:number):Observable<any>{
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  }
}
