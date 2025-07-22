import { Component, OnInit } from '@angular/core';
import { LogEntry, LogLevel } from '../../../shared/models/log-entry.model';
import { LogService } from '../../../core/services/log.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrl: './log-list.component.scss'
})
export class LogListComponent implements OnInit {
  logs: LogEntry[] = [];
  logLevels = Object.values(LogLevel);
  selectedLevel: string = '';
  startDate?: Date;
  endDate?: Date;
  displayedColumns: string[] = ['timestamp', 'level', 'message', 'username'];

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    console.log('LogListComponent initialized'); // Para debugging
    this.loadLogs();
  }

  loadLogs(): void {
    console.log('Loading logs...'); // Para debugging
    this.logService.getRecentLogs()
      .subscribe({
        next: (logs) => {
          console.log('Logs received:', logs); // Para debugging
          this.logs = logs;
        },
        error: (error) => {
          console.error('Error loading logs:', error);
        }
      });
  }
}
