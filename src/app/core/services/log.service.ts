import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from '../../shared/constant/shared-constants';
import { LogEntry } from '../../shared/models/log-entry.model';

@Injectable({ providedIn: 'root' })
export class LogService {
  constructor(private http: HttpClient) {}

  getRecentLogs(): Observable<LogEntry[]> {
    return this.http.get<LogEntry[]>(`${API_URLS.LOG.BASE}/recent`);
  }
  
  getLogsByLevel(level: string): Observable<number> {
    const params = new HttpParams().set('level', level);
    return this.http.get<number>(`${API_URLS.LOG.BASE}/count`, { params });
  }
}
