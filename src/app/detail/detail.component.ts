import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from './../core/services/user-data.service';
import { YoutubeService } from '../core/services/youtube.service';
import { TubeDetail } from '../core/models/TubeDetail';
import { PlayListDetailItem } from '../core/models/PlaylistDetail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  title: string = '';
  tubeDetail: TubeDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserDataService,
    private youtubeService: YoutubeService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    zip([this.userService.token$, this.route.params])
      .pipe(
        map(([token, params]) => {
          const id = params['id'] as string;
          this.youtubeService.getPlaylistDetail(token as string, id);
          return this.youtubeService.tubeDetail;
        })
      )
      .subscribe((tb) => {
        this.tubeDetail = tb;
      });
  }

  goToVideo(item: PlayListDetailItem) {
    this.router.navigate(['video']);
  }
}
