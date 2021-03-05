import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../core/services/youtube.service';
import { PlayListItem } from '../core/models/PlayList';
import { Observable } from 'rxjs';
import { UserDataService, PLAYLIST_TYPE } from '../core/services/user-data.service';

@Component({
  selector: 'app-my-play-list',
  templateUrl: './my-play-list.component.html',
  styleUrls: ['./my-play-list.component.scss'],
})
export class MyPlayListComponent implements OnInit {
  playListItems$: Observable<PlayListItem[]>;

  constructor(
    private youtubeService: YoutubeService,
    private userDataService: UserDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  addItem(item: PlayListItem) {
    this.userDataService.addUserList(PLAYLIST_TYPE, item);
  }

  getPlaylistItems(token: string) {
    this.playListItems$ = this.youtubeService.getPlaylistItems(token);
  }

  goToDetail(item: PlayListItem) {
    this.userDataService.currentPlayList = {
      id: item.id,
      title: item.snippet.title,
    };
    this.router.navigate(['detail']);
  }

  login() {
    this.youtubeService.login();
  }
}
