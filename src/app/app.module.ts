import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './home/home.component';
import { LocalComponent } from './local/local.component';
import { MyPlayListComponent } from './my-play-list/my-play-list.component';
import { DetailComponent } from './detail/detail.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LocalComponent,
    MyPlayListComponent,
    DetailComponent,
    VideoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
