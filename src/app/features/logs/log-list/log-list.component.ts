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
  isLoading = false;
  errorMessage = '';

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    console.log('LogListComponent initialized');
    this.loadLogs();
  }

  loadLogs(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    if (this.selectedLevel || this.startDate || this.endDate) {
      // Use filtered logs
      this.logService.getFilteredLogs(this.selectedLevel, this.startDate, this.endDate)
        .subscribe({
          next: (logs) => {
            console.log('Filtered logs received:', logs);
            this.logs = logs;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading filtered logs:', error);
            this.errorMessage = 'Error al cargar los registros filtrados';
            this.isLoading = false;
          }
        });
    } else {
      // Use recent logs
      this.logService.getRecentLogs()
        .subscribe({
          next: (logs) => {
            console.log('Recent logs received:', logs);
            this.logs = logs;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error loading logs:', error);
            this.errorMessage = 'Error al cargar los registros';
            this.isLoading = false;
          }
        });
    }
  }

  clearFilters(): void {
    this.selectedLevel = '';
    this.startDate = undefined;
    this.endDate = undefined;
    this.loadLogs();
  }
}