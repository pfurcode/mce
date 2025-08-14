// src/services/DataService.ts

import type { AppSettings } from '../types/settings';

export class DataService {

  /**
   * Retrieves a value from chrome.storage.sync.
   * @param key The key of the setting to retrieve.
   * @param defaultValue The value to return if the key is not found.
   * @returns A promise that resolves with the stored value or the default value.
   */
  public static get<K extends keyof AppSettings>(
    key: K, 
    defaultValue: AppSettings[K]
  ): Promise<AppSettings[K]> {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        // Resolve with the stored value if it exists, otherwise use the provided default
        resolve((result[key] as AppSettings[K]) ?? defaultValue);
      });
    });
  }

  /**
   * Saves a value to chrome.storage.sync.
   * @param key The key of the setting to save.
   * @param value The value to save.
   * @returns A promise that resolves when the operation is complete.
   */
  public static set<K extends keyof AppSettings>(key: K, value: AppSettings[K]): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });
  }
}