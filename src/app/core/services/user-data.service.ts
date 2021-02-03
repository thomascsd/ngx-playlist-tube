import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_NAME = 'npt-token';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  tokenSubject$ = new BehaviorSubject<string>(
    window.localStorage.getItem(TOKEN_NAME)
  );

  token$ = this.tokenSubject$.asObservable();

  constructor() {}

  setToken(token: string) {
    this.tokenSubject$.next(token);
    window.localStorage.setItem(TOKEN_NAME, token);
  }
}
