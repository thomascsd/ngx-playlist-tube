import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../core/services/youtube.service';
import { PlayListItem } from '../core/models/PlayList';
import { Observable } from 'rxjs';
import { UserDataService } from '../core/services/user-data.service';

@Component({
  selector: 'app-my-play-list',
  templateUrl: './my-play-list.component.html',
  styleUrls: ['./my-play-list.component.scss'],
})
export class MyPlayListComponent implements OnInit {
  playListItems$: Observable<PlayListItem[]>;

  constructor(
    private youtubeService: YoutubeService,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {}

  addItem(item: PlayListItem) {}

  getPlaylistItems(token: string) {
    this.playListItems$ = this.youtubeService.getPlaylistItems(token);
  }
}
