import { useState } from "react";

// export const useLocalStorage = (key: string, initialValue: string = "") => {
//   const [value, setValue] = useState(() => {
//     const item = window.localStorage.getItem(key);
//     return item || initialValue;
//   });

//   useEffect(() => {
//     const item = value;
//     window.localStorage.setItem(key, item);
//     // eslint-disable-next-line
//   }, [value]);

//   return [value, setValue];
// };

export function useLocalStorage(
  key: string,
  initialValue: string = ""
): [string, (value: string) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item || initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, value);
    } catch (error) {
      // A more advanced implementation would handle the error case
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
