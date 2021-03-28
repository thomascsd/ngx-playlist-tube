import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'detail',
    loadChildren: () => import('./details/details.module').then((m) => m.DetailsModule),
  },
  {
    path: 'video',
    loadChildren: () => import('./videos/videos.module').then((m) => m.VideoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
