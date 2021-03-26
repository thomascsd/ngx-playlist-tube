import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TubeDetail } from '../models/TubeDetail';
import { environment } from '../../../environments/environment';
import { PlayListDetail } from '../models/PlaylistDetail';
import { PlayListItem, PlayList } from '../models/PlayList';
import { RemoteLibraryService } from './remote-library.service';

const appscopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtubepartner',
];

declare var gapi;
type authorized = (isAuthorized: boolean) => any;

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

  private GoogleAuth: any;
  private updateSigninStatus: authorized;

  constructor(private client: HttpClient, private remoteService: RemoteLibraryService) {
    this.host = environment.host;
  }

  loadGapi(updateStatus: authorized) {
    this.updateSigninStatus = updateStatus;
    this.remoteService.loadScript('https://apis.google.com/js/api.js').subscribe(() => {
      gapi.load('client:auth2', this.initClient.bind(this));
    });
  }

  private initClient() {
    // In practice, your app can retrieve one or more discovery documents.
    const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    const scope = appscopes.join(' ');

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client
      .init({
        apiKey: environment.googleApiKey,
        clientId: environment.googleClientId,
        discoveryDocs: [discoveryUrl],
        scope: scope,
      })
      .then(() => {
        this.GoogleAuth = gapi.auth2.getAuthInstance();
        const user = this.GoogleAuth.currentUser.get();
        var isAuthorized: boolean = user.hasGrantedScopes(scope);

        // Listen for sign-in state changes.
        this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus.bind(this, isAuthorized));

        // setSigninStatus();
      });
  }

  login(): Observable<string> {
    return new Observable<string>((subscriber) => {
      this.GoogleAuth.signIn().then((res) => {
        subscriber.next(res.getAuthResponse().access_token);
        subscriber.complete();
      });
    });
  }

  isLoggedIn() {
    return this.GoogleAuth.isSignedIn.get();
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

  getPlaylistItems(token: string): Observable<PlayListItem[]> {
    const url =
      'https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&mine=true&access_token=' +
      token;

    return this.client.get<PlayList>(url).pipe(map((root) => root.items));
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
      .get<PlayListDetail>(url)
      .pipe(
        tap(() => (this.tubeDetail.isBusy = false)),
        map((data: PlayListDetail) => {
          const yitems = data.items;
          const lastItem = yitems[yitems.length - 1];

          return {
            items: [...this.tubeDetail.items, ...yitems],
            pageToken: data.nextPageToken,
            totalResults: data.pageInfo.totalResults,
            position: lastItem.snippet.position,
          } as TubeDetail;
        })
      )
      .subscribe(
        (tubeDetail: TubeDetail) => (this.tubeDetail = { ...this.tubeDetail, ...tubeDetail })
      );
  }
}
