import { useRef, useEffect, useCallback } from "react";
// T represents a function type ((...args: any[]) => any),
// meaning T can be any function that takes any number of arguments and returns anything.

export const useRefCallback = <T extends (...args: any[]) => any>(
  func: T,
  deps: React.DependencyList = [],
  defaultValue: T = (() => {}) as T
): T => {
  // A ref initialized with the default value
  const callBackRef = useRef<T>(defaultValue);

  // A function that will be called when the dependencies change
  const memoizedCallback = useCallback(func, deps);

  useEffect(() => {
    // useEffect ensures the update happens after the render phase, preventing side effects.
    callBackRef.current = memoizedCallback;
  }, [memoizedCallback]);

  // Returning the ref to the latest function
  return callBackRef.current;
};