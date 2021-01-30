import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TubeDetail } from '../models/TubeDetail';
import { environment } from '../../../environments/environment.prod';
import { AppToken } from '../models/AppToken';
import { PlayListDetailRoot } from '../models/PlaylistDetail';
import { PlayListRoot } from '../models/PlayList';

const appscopes = [
  encodeURIComponent('https://www.googleapis.com/auth/youtube'),
  encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly'),
  encodeURIComponent('https://www.googleapis.com/auth/youtubepartner'),
];

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  clientID: string;
  secretID: string;
  host: string;

  tubeDetail: TubeDetail = {
    isBusy: false,
    position: 0,
    totalResults: 0,
    pageToken: '',
    items: [],
  };

  constructor(private client: HttpClient) {
    this.host = environment.host;
  }

  login() {
    let requestToken = '';
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
      this.clientID +
      '&redirect_uri=' +
      this.host +
      '/callback&scope=' +
      appscopes.join(' ') +
      '&approval_prompt=force&response_type=code&access_type=offline';

    window.location.href = url;
  }

  getToken(requestToken: string): Observable<AppToken> {
    const url = 'https://www.googleapis.com/oauth2/v4/token';

    if (!requestToken) {
      const url = window.location.href;
      requestToken = url.split('code=')[1];
    }

    const body = {
      client_id: this.clientID,
      client_secret: this.secretID,
      redirect_uri: this.host,
      grant_type: 'authorization_code',
      code: requestToken,
    };

    return this.client.post<any>(url, body).pipe(
      map((data) => {
        let time = new Date();
        const hour = data.expires_in / (60 * 60);
        time.setHours(time.getHours() + hour);

        return {
          token: data.access_token as string,
          refreshToken: data.refresh_token as string,
          expire: time,
        } as AppToken;
      })
    );
  }

  isLogingIn() {
    const url = window.location.href;
    return url.indexOf('callback') !== -1;
  }

  isExpired(data) {
    let now = new Date();
    let nowTrick = 0,
      expiredTrick = 0;

    if (data) {
      now.setMinutes(now.getMinutes() - 2);
      nowTrick = now.getTime();

      if (typeof data.expire === 'string') {
        expiredTrick = new Date(data.expire).getTime();
      } else {
        expiredTrick = data.expire.getTime();
      }

      if (nowTrick >= expiredTrick) {
        return true;
      }
    }

    return false;
  }

  regetToken() {}

  getPlaylists(token: string): Observable<PlayListRoot> {
    const url =
      'https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&access_token=' +
      token;

    return this.client.get<PlayListRoot>(url);
  }

  getPlaylistDetail(token: string, playlistID: string) {
    if (this.tubeDetail.isBusy) {
      return;
    }
    this.tubeDetail.isBusy = true;

    if (
      this.tubeDetail.totalResults !== 0 &&
      this.tubeDetail.position !== 0 &&
      this.tubeDetail.position === this.tubeDetail.totalResults - 1
    ) {
      //目前item的index到達集合的長度時，不取得資料
      this.tubeDetail.isBusy = false;
      return;
    }

    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${playlistID}&access_token=${token}`;

    if (this.tubeDetail.pageToken) {
      url += '&pageToken=' + this.tubeDetail.pageToken;
    }

    this.client
      .get<PlayListDetailRoot>(url)
      .pipe(
        tap(() => (this.tubeDetail.isBusy = false)),
        map((root: PlayListDetailRoot) => {
          const yitems = root.data.items;
          const lastItem = yitems[yitems.length - 1];

          return {
            items: [...this.tubeDetail.items, ...yitems],
            pageToken: root.data.nextPageToken,
            totalResults: root.data.pageInfo.totalResults,
            position: lastItem.snippet.position,
          } as TubeDetail;
        })
      )
      .subscribe(
        (tubeDetail: TubeDetail) =>
          (this.tubeDetail = { ...this.tubeDetail, ...tubeDetail })
      );
  }
}
