import { Component, OnInit, ViewChild } from '@angular/core';
import { TubeYoutubeComponent } from '../tube-youtube/tube-youtube.component';
import { UserDataService } from '../../core/services/user-data.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  title: string = '';
  index: number = 0;
  playlistId: string = '';
  @ViewChild('player', { static: true }) player: TubeYoutubeComponent;

  constructor(private UserDataService: UserDataService) {}

  ngOnInit(): void {
    this.UserDataService.getCurrentVideo().subscribe((data) => {
      this.title = data.title;
      this.playlistId = data.id;
      this.index = data.index;
    });
  }
  prev() {
    this.player.prev();
  }

  next() {
    this.player.next();
  }

  shuffle() {
    this.player.shuffle(true);
  }

  shuffleNone() {
    this.player.shuffle(false);
  }

  repeat() {
    this.player.repeat();
  }

  repeatOnce() {
    this.player.repeatOne();
  }

  repeatNone() {
    this.player.repeatNone();
  }
}
