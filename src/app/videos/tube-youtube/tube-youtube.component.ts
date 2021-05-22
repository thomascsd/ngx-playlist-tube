import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { RemoteLibraryService } from '../../core/services/remote-library.service';

declare var YT;
let player: any = null;
let enableRepeatOne = false;

@Component({
  selector: 'app-tube-youtube',
  template: `<div id="player" #player></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TubeYoutubeComponent implements AfterViewInit {
  @Input() videoId: string = '';
  @Input() playlistId: string = '';
  @Input() index: number = 0;
  @ViewChild('player') player: ElementRef;

  constructor(private remoteService: RemoteLibraryService) {}

  prev() {
    player.previousVideo();
  }

  next() {
    player.nextVideo();
  }

  repeat() {
    enableRepeatOne = false;
    player.setLoop(true);
  }

  repeatOne() {
    enableRepeatOne = true;
  }

  repeatNone() {
    enableRepeatOne = false;
    player.setLoop(false);
  }

  shuffle(e, data) {
    player.setShuffle(data);
  }

  ngAfterViewInit(): void {
    const url = 'https://www.youtube.com/iframe_api';
    this.remoteService.loadScript(url).subscribe(() => this.loadCompletely());
  }

  private loadCompletely() {
    //var $container; //$(element).parents('.container');
    let width = 600; //$container.width();
    let height = 0;

    if (width >= 600) {
      width = 600;
    }
    height = width * (3 / 4);

    player = new YT.Player('player', {
      playerVars: {
        autoplay: 1,
        html5: 1,
        modesbranding: 0,
        showinfo: 0,
        controls: 1,
      },
      height: height,
      width: width,
      events: {
        onReady: this.playerReadyHandler,
        onStateChange: this.playerStateChangeHandler,
      },
      //videoId: scope.videoid
    });

    // if (player) {
    //   console.log('plyaer is not null, videoid:' + scope.videoid);
    //   init();
    // } else {
    //   $window.onYouTubeIframeAPIReady = function () {
    //     init();
    //   };
    // }
  }

  private playerReadyHandler() {
    player.loadPlaylist({
      list: this.playlistId,
      listType: 'playlist',
      index: this.index,
    });
    //player.playVideo();
  }

  private playerStateChangeHandler(e) {
    if (e.data === YT.PlayerState.ENDED) {
      var pos = player.getPlaylistIndex();
      if (enableRepeatOne) {
        player.playVideoAt(pos - 1);
      } else {
        this.index = pos;
        this.playerReadyHandler();
      }
    }
  }
}
