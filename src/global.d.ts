export {};

declare global {
  interface Window {
    electronAPI: {
      saveData: (data: unknown) => void;
      loadData: () => unknown;
    };
  }
}
