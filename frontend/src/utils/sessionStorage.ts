

// Function to set an item in session storage
export const setSessionItem = <T>(key: string, value: T): void => {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  };
  
  // Function to get an item from session storage
  export const getSessionItem = <T>(key: string): T | null => {
    const serializedValue = sessionStorage.getItem(key);
    if (!serializedValue) {
      return null;
    }
    try {
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error('Error parsing session storage item:', error);
      return null;
    }
  };
  
  // Function to remove an item from session storage
  export const removeSessionItem = (key: string): void => {
    sessionStorage.removeItem(key);
  };