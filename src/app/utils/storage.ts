// Storage utility that falls back to in-memory storage when localStorage is unavailable
class StorageService {
  private inMemoryStorage: Map<string, string> = new Map();
  private useLocalStorage: boolean = false;

  constructor() {
    // Test if localStorage is available
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      this.useLocalStorage = true;
    } catch (e) {
      this.useLocalStorage = false;
      console.warn('localStorage is not available, using in-memory storage');
    }
  }

  getItem(key: string): string | null {
    if (this.useLocalStorage) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('Error reading from localStorage:', e);
      }
    }
    return this.inMemoryStorage.get(key) || null;
  }

  setItem(key: string, value: string): void {
    if (this.useLocalStorage) {
      try {
        localStorage.setItem(key, value);
        return;
      } catch (e) {
        console.error('Error writing to localStorage:', e);
      }
    }
    this.inMemoryStorage.set(key, value);
  }

  removeItem(key: string): void {
    if (this.useLocalStorage) {
      try {
        localStorage.removeItem(key);
        return;
      } catch (e) {
        console.error('Error removing from localStorage:', e);
      }
    }
    this.inMemoryStorage.delete(key);
  }

  clear(): void {
    if (this.useLocalStorage) {
      try {
        localStorage.clear();
        return;
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
    }
    this.inMemoryStorage.clear();
  }
}

export const storage = new StorageService();
