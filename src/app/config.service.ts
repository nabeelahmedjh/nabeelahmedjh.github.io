import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppConfig {
  features: Record<string, boolean>;
}

const defaultConfig: AppConfig = {
  features: {
    blog: true,
    projects: true,
    featuredProjects: true,
    media: true,
  },
};

@Injectable({ providedIn: 'root' })
export class ConfigService {
  // Keep config in a signal so consumers can react if you ever reload it
  private readonly _config = signal<AppConfig>(defaultConfig);

  constructor(private readonly http: HttpClient) {}

  get value(): AppConfig {
    return this._config();
  }

  getFeature(flag: string): boolean {
    return !!this._config().features[flag];
  }

  async load(): Promise<void> {
    const url = new URL('config.json', document.baseURI).href;
    try {
      const data = (await this.http.get<Partial<AppConfig>>(url, { headers: { 'Cache-Control': 'no-store' } }).toPromise()) ?? {};
      // Merge with defaults to avoid undefined flags if the file is partial
      const merged: AppConfig = {
        ...defaultConfig,
        ...data,
        features: { ...defaultConfig.features, ...(data.features ?? {}) } as AppConfig['features'],
      };
      this._config.set(merged);
    } catch (err: any) {
      if (err.status !== undefined) {
        console.error('Failed to load runtime config:', err.status, err.statusText || err.message);
      } else {
        console.error('Error loading runtime config:', err);
      }
    }
  }
}
