import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailComponent } from './detail/detail.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, DetailsRoutingModule, MaterialModule, InfiniteScrollModule],
})
export class DetailsModule {}
