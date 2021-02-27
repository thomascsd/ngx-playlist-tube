import { Component, OnInit } from '@angular/core';
import { PlayListItem } from './../core/models/PlayList';
import {
  UserDataService,
  PLAYLIST_TYPE,
} from './../core/services/user-data.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss'],
})
export class LocalComponent implements OnInit {
  playListItems: PlayListItem[] = [];

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.playListItems = this.userDataService.getUserList()[PLAYLIST_TYPE];
  }

  delete(item: PlayListItem) {
    this.userDataService.deleteUserList(PLAYLIST_TYPE, item);
  }
}
