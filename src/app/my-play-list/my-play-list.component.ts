import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { YoutubeService } from '../core/services/youtube.service';
import { PlayListItem } from '../core/models/PlayList';
import { UserDataService, PLAYLIST_TYPE } from '../core/services/user-data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-my-play-list',
  templateUrl: './my-play-list.component.html',
  styleUrls: ['./my-play-list.component.scss'],
})
export class MyPlayListComponent implements OnInit, AfterViewInit {
  playListItems$: Observable<PlayListItem[]>;
  isLoggedIn: boolean;

  constructor(
    private userDataService: UserDataService,
    private youtubeService: YoutubeService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.youtubeService.loadGapi(this.updateStatus);
  }

  ngOnInit(): void {
    this.userDataService.token$.pipe(tap((token) => this.getPlaylistItems(token)));
  }

  updateStatus(isAuthorized: boolean) {
    this.isLoggedIn = isAuthorized;
  }

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
    this.youtubeService.login().subscribe((token: string) => {
      this.userDataService.setToken(token);
      this.getPlaylistItems(token);
    });
  }
}
