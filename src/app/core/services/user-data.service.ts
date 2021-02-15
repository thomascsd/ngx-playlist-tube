import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { PlayListItem } from '../models/PlayList';

const TOKEN_NAME = 'npx-token';
const USER_LIST_NAME = 'npx-user-list';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private tokenSubject$ = new BehaviorSubject<string>(
    window.localStorage.getItem(TOKEN_NAME)
  );

  private userListSubject$ = new BehaviorSubject<
    Record<string, PlayListItem[]>
  >(JSON.parse(window.localStorage.getItem(USER_LIST_NAME)));

  token$ = this.tokenSubject$.asObservable();

  constructor() {}

  setToken(token: string) {
    this.tokenSubject$.next(token);
    window.localStorage.setItem(TOKEN_NAME, token);
  }

  addUserList(key: string, item: PlayListItem) {
    let index = 0;
    let added = false;
    let userList = this.getUserList();

    if (!userList) {
      userList = {};
      userList[key].push(item);
      added = true;
    } else {
      _.each(userList, (v, k) => {
        index = _.findIndex(v, (o) => o.id === item.id);

        //index = _.indexOf($localStorage.list, item.id);
        added = index !== -1;

        if (!added) {
          userList[k].push(item);
        }
      });
    }

    this.userListSubject$.next(userList);
    window.localStorage.setItem(USER_LIST_NAME, JSON.stringify(userList));
    return added;
  }

  getUserList() {
    return this.userListSubject$.value;
  }
}
