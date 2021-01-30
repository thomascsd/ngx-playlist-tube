import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../core/services/youtube.service';
import { PlayListRoot, PlayListItem } from '../core/models/PlayList';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-play-list',
  templateUrl: './my-play-list.component.html',
  styleUrls: ['./my-play-list.component.scss'],
})
export class MyPlayListComponent implements OnInit {
  playListItem$: Observable<PlayListItem[]>;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {}

  getPlaylists(token: string) {
    this.playListItem$ = this.youtubeService
      .getPlaylists(token)
      .pipe(map((root) => root.data.items));
  }
}
