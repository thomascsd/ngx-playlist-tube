import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { VideosRoutingModule } from './videos-routing.module';
import { TubeYoutubeComponent } from './tube-youtube/tube-youtube.component';
import { VideoComponent } from './video/video.component';
import { TubeRepeatComponent } from './tube-repeat/tube-repeat.component';
import { TubeShuffleComponent } from './tube-shuffle/tube-shuffle.component';

@NgModule({
  declarations: [TubeYoutubeComponent, VideoComponent, TubeRepeatComponent, TubeShuffleComponent],
  imports: [CommonModule, VideosRoutingModule, MaterialModule],
})
export class VideoModule {}
