import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from '../../core/services/user-data.service';
import { YoutubeService } from '../../core/services/youtube.service';
import { TubeDetail } from '../../core/models/TubeDetail';
import { PlayListDetailItem } from '../../core/models/PlaylistDetail';
import { CurrentData } from '../../core/models/CurrentData';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  title: string = '';
  tubeDetail: TubeDetail;

  constructor(
    private router: Router,
    private userService: UserDataService,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    zip([this.userService.token$, this.userService.getCurrentPlayList()])
      .pipe(
        map(([token, currentData]) => {
          const data: CurrentData = currentData as CurrentData;
          const id = data.id;
          this.title = data.title;
          this.youtubeService.getPlaylistDetail(token as string, id);
          return this.youtubeService.tubeDetail;
        })
      )
      .subscribe((tb) => {
        this.tubeDetail = tb;
      });
  }

  goToVideo(item: PlayListDetailItem) {
    this.userService.currentVideo = {
      id: item.snippet.resourceId.videoId,
      index: item.snippet.position,
      title: item.snippet.title,
    };
    this.router.navigate(['video']);
  }
}
