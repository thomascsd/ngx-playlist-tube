import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolBar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/List';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
})
export class MaterialModule {}
