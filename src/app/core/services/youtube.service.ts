import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
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

  GoogleAuth: any;
  private updateSigninStatus: authorized;

  constructor(private client: HttpClient, private remoteService: RemoteLibraryService) {
    this.host = environment.host;
    this.loadGapi();
  }

  loadGapi(): Observable<any> {
    const discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    const scope = appscopes.join(' ');

    if (this.GoogleAuth) {
      return of(this.GoogleAuth);
    }

    return new Observable<any>((subscriber) => {
      this.remoteService.loadScript('https://apis.google.com/js/api.js').subscribe(() => {
        gapi.load('client:auth2', () => {
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
              //this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus.bind(this, isAuthorized));
              subscriber.next(this.GoogleAuth);
              subscriber.complete();
            });
        });
      });
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
    // return this.client
    //   .get<PlayListItem[]>(url, {
    //     observe: 'response',p
    //   })
    //   .pipe(
    //     map((res) => {
    //       return res.body;
    //     }),
    //     catchError((err) => {
    //       if (err.status === 401) {
    //         const then = this.GoogleAuth.disconnect();
    //         console.log(then);
    //       }
    //       return of([]);
    //     })
    //   );
  }
}
