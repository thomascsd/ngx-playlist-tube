import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { YoutubeService } from '../core/services/youtube.service';
import { PlayListItem } from '../core/models/PlayList';
import { UserDataService, PLAYLIST_TYPE } from '../core/services/user-data.service';

@Component({
  selector: 'app-my-play-list',
  templateUrl: './my-play-list.component.html',
  styleUrls: ['./my-play-list.component.scss'],
})
export class MyPlayListComponent implements OnInit, AfterViewInit {
  playListItems: PlayListItem[] = [];
  isLoggedIn: boolean;

  constructor(
    private userDataService: UserDataService,
    private youtubeService: YoutubeService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    zip(this.userDataService.token$, this.youtubeService.loadGapi())
      .pipe(map(([token, _]) => token))
      .subscribe((token) => this.getPlaylistItems(token));
  }

  addItem(item: PlayListItem) {
    this.userDataService.addUserList(PLAYLIST_TYPE, item);
  }

  getPlaylistItems(token: string) {
    this.youtubeService.getPlaylistItems(token).subscribe((items) => (this.playListItems = items));
  }

  goToDetail(item: PlayListItem) {
    this.userDataService.currentPlayList = {
      id: item.id,
      title: item.snippet.title,
    };
    this.router.navigate(['detail']);
  }

  login() {
    this.youtubeService.login().subscribe((token: string) => {
      this.userDataService.setToken(token);
      this.getPlaylistItems(token);
    });
  }
}
