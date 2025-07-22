import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogListComponent } from './log-list/log-list.component';
import { LogRoutingModule } from './log-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, LogRoutingModule],
})
export class LogModule {}
