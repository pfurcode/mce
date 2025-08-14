// src/services/DataService.ts

import type { AppSettings } from '../types/settings';
import { defaultSettings } from './defaultSettings';
import merge from 'lodash-es/merge';

/**
 * A type-safe service for interacting with chrome.storage.sync.
 */
export class DataService {
  /**
   * Retrieves the entire settings object, merged with defaults.
   */
  public static async getSettings(): Promise<AppSettings> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(null, (savedSettings) => {
        const fullSettings = merge({}, defaultSettings, savedSettings);
        resolve(fullSettings);
      });
    });
  }

  /**
   * Saves the entire settings object or a part of it.
   */
  public static async saveSettings(settings: Partial<AppSettings>): Promise<void> {
    return chrome.storage.sync.set(settings);
  }
}