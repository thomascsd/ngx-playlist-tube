import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayListDetail, PlayListDetailItem } from '../models/PlaylistDetail';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListDetailService {
  isBusy: boolean;
  position: number = 0;
  totalResults: number = 0;
  pageToken: string = '';
  items: PlayListDetailItem[] = [];

  constructor(private client: HttpClient) {}

  getPlaylistDetail(token: string, playlistID: string) {
    if (this.isBusy) {
      return;
    }
    this.isBusy = true;

    if (this.totalResults !== 0 && this.position !== 0 && this.position === this.totalResults - 1) {
      //目前item的index到達集合的長度時，不取得資料
      this.isBusy = false;
      return;
    }

    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${playlistID}&access_token=${token}`;

    if (this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }

    this.client
      .get<PlayListDetail>(url)
      .pipe(
        tap(() => (this.isBusy = false)),
        map((data: PlayListDetail) => {
          const yitems = data.items;
          const lastItem = yitems[yitems.length - 1];

          this.pageToken = data.nextPageToken;
          this.totalResults = data.pageInfo.totalResults;
          this.position = lastItem.snippet.position;

          return yitems;
        })
      )
      .subscribe((items: PlayListDetailItem[]) => (this.items = [...this.items, ...items]));
  }
}
