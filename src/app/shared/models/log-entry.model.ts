export interface LogEntry {
    id: number;
    timestamp: Date;
    level: string;
    message: string;
    /* exception?: string;
    username?: string;
    action?: string;
    controller?: string; */
}

// Enum para los niveles de log
export enum LogLevel {
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    INFORMATION = 'INFORMATION',
    DEBUG = 'DEBUG'
}