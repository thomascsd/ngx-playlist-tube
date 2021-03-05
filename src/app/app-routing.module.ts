import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPlayListComponent } from './my-play-list/my-play-list.component';
import { LocalComponent } from './local/local.component';

const routes: Routes = [
  { path: '', redirectTo: 'local', pathMatch: 'full' },
  { path: 'myPlayList', component: MyPlayListComponent },
  { path: 'local', component: LocalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
