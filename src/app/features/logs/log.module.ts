import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogListComponent } from './log-list/log-list.component';
import { LogRoutingModule } from './log-routing.module';
import { MaterialModule } from '../../shared/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LogListComponent],
  imports: [
    CommonModule,
    FormsModule,
    LogRoutingModule,
    MaterialModule,
    MatProgressSpinnerModule,
  ],
})
export class LogModule {}