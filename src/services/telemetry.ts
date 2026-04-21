
interface TelemetryEvent {
  eventName: string;
  timestamp: string;
  payload?: Record<string, any>;
}

const STORAGE_KEY = 'waverunner_telemetry_logs';
const MAX_LOG_SIZE = 200;

export const track = (eventName: string, payload?: Record<string, any>) => {
  try {
    const event: TelemetryEvent = {
      eventName,
      timestamp: new Date().toISOString(),
      payload
    };

    // 1. Console Output (Dev Mode style)
    console.debug(`[Telemetry] 📡 ${eventName}`, payload || '');

    // 2. Local Storage Persistence (Rolling Buffer)
    const existingLogsRaw = localStorage.getItem(STORAGE_KEY);
    let logs: TelemetryEvent[] = existingLogsRaw ? JSON.parse(existingLogsRaw) : [];
    
    logs.push(event);
    
    // Prune old events if exceeding max size
    if (logs.length > MAX_LOG_SIZE) {
      logs = logs.slice(logs.length - MAX_LOG_SIZE);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

  } catch (error) {
    // Fail silently to not impact user experience
    console.warn('[Telemetry] Failed to track event', error);
  }
};

export const getTelemetryLogs = (): TelemetryEvent[] => {
  try {
    const logs = localStorage.getItem(STORAGE_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch {
    return [];
  }
};
