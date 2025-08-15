// src/services/ChromeService.ts

/**
 * A service for interacting with the Chrome Extension APIs.
 * This class centralizes all browser-specific calls.
 */
export class ChromeService {
  /**
   * Fetches all tabs in the current window.
   */
  public static async getOpenTabs(): Promise<chrome.tabs.Tab[]> {
    return chrome.tabs.query({ currentWindow: true });
  }

  /**
   * Fetches all tabs and tab groups in the current window.
   */
  public static async getTabsAndGroups(): Promise<{
    tabs: chrome.tabs.Tab[];
    groups: chrome.tabGroups.TabGroup[];
  }> {
    const tabs = await chrome.tabs.query({ currentWindow: true });
const groups = chrome.tabGroups
      ? await chrome.tabGroups.query({ windowId: chrome.windows.WINDOW_ID_CURRENT })
      : [];    return { tabs, groups };
  }

  /**
   * Closes a specific tab by its ID.
   */
  public static async closeTab(tabId: number): Promise<void> {
    return chrome.tabs.remove(tabId);
  }

  /**
   * Copies a given text string to the user's clipboard.
   */
  public static async copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  /**
   * Switches the active tab in the current window.
   */
  public static async switchToTab(tabId: number): Promise<chrome.tabs.Tab | undefined> {
    const tab = await chrome.tabs.get(tabId);
    if (tab.windowId) {
      await chrome.windows.update(tab.windowId, { focused: true });
    }
    return chrome.tabs.update(tabId, { active: true });
  }

  /**
   * Creates a new, empty tab.
   */
  public static async createNewTab(): Promise<chrome.tabs.Tab> {
    return chrome.tabs.create({});
  }

  /**
   * Duplicates a specific tab.
   */
  public static async duplicateTab(tabId: number): Promise<chrome.tabs.Tab | undefined> {
    return chrome.tabs.duplicate(tabId);
  }

  /**
   * Closes all tabs within a given group.
   */
  public static async closeGroup(tabs: chrome.tabs.Tab[], groupId: number): Promise<void> {
    const tabIdsToClose = tabs.filter(t => t.groupId === groupId && t.id).map(t => t.id!);
    if (tabIdsToClose.length > 0) {
      return chrome.tabs.remove(tabIdsToClose as [number, ...number[]]);
    }
  }

  /**
   * Moves all tabs from a group into a new window.
   */
  public static async moveGroupToNewWindow(tabs: chrome.tabs.Tab[], group: chrome.tabGroups.TabGroup): Promise<void> {
    const tabIdsToMove = tabs.filter(t => t.groupId === group.id && t.id).map(t => t.id!);
    if (tabIdsToMove.length > 0) {
      const newWindow = await chrome.windows.create({ tabId: tabIdsToMove[0] });
      if (!newWindow?.id) return;

      if (tabIdsToMove.length > 1) {
        await chrome.tabs.move(tabIdsToMove.slice(1), { windowId: newWindow.id, index: -1 });
      }
      
      const newGroupId = await chrome.tabs.group({
        tabIds: tabIdsToMove as [number, ...number[]],
        createProperties: { windowId: newWindow.id }
      });
      await chrome.tabGroups.update(newGroupId, { title: group.title, color: group.color });
    }
  }

  /**
   * Ungroups all tabs within a given group.
   */
  public static async ungroup(tabs: chrome.tabs.Tab[], groupId: number): Promise<void> {
    const tabIdsToUngroup = tabs.filter(t => t.groupId === groupId && t.id).map(t => t.id!);
    if (tabIdsToUngroup.length > 0) {
      return chrome.tabs.ungroup(tabIdsToUngroup as [number, ...number[]]);
    }
  }

  // New methods to resolve compilation errors
  /**
   * Toggles the pinned status of a tab.
   */
  public static async togglePin(tabId: number, pinned: boolean): Promise<void> {
    await chrome.tabs.update(tabId, { pinned: !pinned });
  }

  /**
   * Toggles the muted status of a tab.
   */
  public static async toggleMute(tabId: number, muted: boolean): Promise<void> {
    await chrome.tabs.update(tabId, { muted: !muted });
  }

  /**
   * Exports a list of open tabs to an HTML file.
   */
  public static async exportTabsToFile(tabs: chrome.tabs.Tab[]): Promise<void> {
    const content = `
      <html>
        <head>
          <title>Exported Tabs</title>
        </head>
        <body>
          <h1>Open Tabs</h1>
          <ul>
            ${tabs.map(tab => `<li><a href="${tab.url}">${tab.title}</a></li>`).join('')}
          </ul>
        </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({
      url: url,
      filename: 'exported-tabs.html',
      saveAs: true,
    }, () => {
      URL.revokeObjectURL(url);
    });
  }

  public static async getRecentlyClosedTabs(maxTabs: number): Promise<chrome.sessions.Session[]> {
      return chrome.sessions.getRecentlyClosed({ maxResults: maxTabs });
  }

  public static async restoreTab(sessionId: string): Promise<chrome.sessions.Session | undefined> {
      return chrome.sessions.restore(sessionId);
  }
}