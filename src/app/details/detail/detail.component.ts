import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from '../../core/services/user-data.service';
import { ListDetailService } from '../../core/services/list-detail.service';
import { PlayListDetailItem } from '../../core/models/PlaylistDetail';
import { CurrentData } from '../../core/models/CurrentData';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  title: string = '';
  items: PlayListDetailItem[] = [];

  constructor(
    private router: Router,
    private userService: UserDataService,
    public listDetailService: ListDetailService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    zip(this.userService.token$, this.userService.getCurrentPlayList())
      .pipe(
        map(([token, currentData]) => {
          const data: CurrentData = currentData as CurrentData;
          const id = data.id;
          this.title = data.title;
          this.listDetailService.getPlaylistDetail(token as string, id);
          return this.listDetailService.items;
        })
      )
      .subscribe((items) => (this.items = items));
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
