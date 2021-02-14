import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

const TOKEN_NAME = 'npx-token';
const USER_LIST_NAME = 'npx-user-list';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private tokenSubject$ = new BehaviorSubject<string>(
    window.localStorage.getItem(TOKEN_NAME)
  );

  private userListSubject$ = new BehaviorSubject<Record<string, string[]>>(
    JSON.parse(window.localStorage.getItem(USER_LIST_NAME))
  );

  token$ = this.tokenSubject$.asObservable();

  constructor() {}

  setToken(token: string) {
    this.tokenSubject$.next(token);
    window.localStorage.setItem(TOKEN_NAME, token);
  }

  addUserList(item) {
    let index = 0;
    let added = false;
    let userList = this.getUserList();

    if (!userList) {
      userList = {};
    }

    _.each(userList, function (value, key) {
      index = _.findIndex(value, function (o) {
        return o.id === item.id;
      });

      //index = _.indexOf($localStorage.list, item.id);
      added = index !== -1;

      if (!added) {
        userList[key].push(item);
      }
    });

    this.userListSubject$.next(userList);
    return added;
  }

  getUserList() {
    return this.userListSubject$.value;
  }
}
