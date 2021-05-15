import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { CurrentData } from '../models/CurrentData';
import { PlayListItem } from '../models/PlayList';

const TOKEN_NAME = 'npx-token';
const USER_LIST_NAME = 'npx-user-list';
const C_USER_LIST = 'npx-C-user-list';

export const PLAYLIST_TYPE = 'p';
export const VIDEO_TYPE = 'v';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private tokenSubject$ = new BehaviorSubject<string>(window.localStorage.getItem(TOKEN_NAME));

  private userListSubject$ = new BehaviorSubject<Record<string, PlayListItem[]>>(
    JSON.parse(window.localStorage.getItem(USER_LIST_NAME))
  );

  private currentPlayListSubject$ = new BehaviorSubject<Partial<CurrentData>>(
    JSON.parse(window.sessionStorage.getItem(C_USER_LIST))
  );

  private currentVideoSubject$ = new BehaviorSubject<Partial<CurrentData>>({});

  token$ = this.tokenSubject$.asObservable();

  constructor() {}

  getCurrentPlayList() {
    return this.currentPlayListSubject$.asObservable();
  }

  set currentPlayList(value: Partial<CurrentData>) {
    this.currentPlayListSubject$.next(value);
    sessionStorage.setItem(C_USER_LIST, JSON.stringify(value));
  }

  getCurrentVideo() {
    return this.currentVideoSubject$.asObservable();
  }

  set currentVideo(value: Partial<CurrentData>) {
    this.currentVideoSubject$.next(value);
  }

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
      userList[key] = [];
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

  getUserListByKey(key: string) {
    const userList = this.getUserList();
    let items: PlayListItem[] = [];

    if (userList && Object.keys(userList)) {
      items = userList[key];
    }

    return items;
  }

  deleteUserList(type: string, item: PlayListItem) {
    let userList = this.getUserList();

    userList[type] = _.without(userList[type], item);

    this.userListSubject$.next(userList);
    window.localStorage.setItem(USER_LIST_NAME, JSON.stringify(userList));
  }
}
