// src/background.ts

// This listener is fired when the extension is first installed,
// when it is updated to a new version, or when Chrome is updated.
chrome.runtime.onInstalled.addListener(() => {
  // Set the default behavior for the side panel.
  // This will open the side panel when the user clicks the extension's icon.
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});