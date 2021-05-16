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
  template: '<div id="player" #player></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TubeYoutubeComponent implements AfterViewInit {
  @Input() videoId: string = '';
  @Input() playlistId: string = '';
  @Input() index: number = 0;
  @ViewChild('player') player: ElementRef;

  constructor(private remoteService: RemoteLibraryService) {}

  ngAfterViewInit(): void {
    const url = 'https://www.youtube.com/iframe_api';
    this.remoteService.loadScript(url).subscribe(() => this.loadCompletely());
  }

  loadCompletely() {
    var $container; //$(element).parents('.container');
    var width = $container.width();
    var height = 0;

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

    // scope.$on('tube.prev', function () {
    //   player.previousVideo();
    // });

    // scope.$on('tube.next', function () {
    //   player.nextVideo();
    // });

    // scope.$on('tube.repeat', function () {
    //   enableRepeatOne = false;
    //   player.setLoop(true);
    // });

    // scope.$on('tube.repeatOne', function () {
    //   enableRepeatOne = true;
    // });

    // scope.$on('tube.repeatNone', function () {
    //   enableRepeatOne = false;
    //   player.setLoop(false);
    // });

    // scope.$on('tube.shuffle', function (e, data) {
    //   player.setShuffle(data);
    // });

    // if (player) {
    //   console.log('plyaer is not null, videoid:' + scope.videoid);
    //   init();
    // } else {
    //   $window.onYouTubeIframeAPIReady = function () {
    //     init();
    //   };
    // }
  }

  playerReadyHandler() {
    player.loadPlaylist({
      list: this.playlistId,
      listType: 'playlist',
      index: this.index,
    });
    //player.playVideo();
  }

  playerStateChangeHandler(e) {
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
