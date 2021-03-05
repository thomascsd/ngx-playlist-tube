import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayListItem } from './../core/models/PlayList';
import { UserDataService, PLAYLIST_TYPE } from './../core/services/user-data.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss'],
})
export class LocalComponent implements OnInit {
  playListItems: PlayListItem[] = [];

  constructor(private userDataService: UserDataService, private router: Router) {}

  ngOnInit(): void {
    this.playListItems = this.userDataService.getUserList()[PLAYLIST_TYPE];
  }

  delete(item: PlayListItem) {
    this.userDataService.deleteUserList(PLAYLIST_TYPE, item);
  }

  goToDetail(item: PlayListItem) {
    this.userDataService.currentPlayList = {
      id: item.id,
      title: item.snippet.title,
    };
    this.router.navigate(['detail']);
  }
}
