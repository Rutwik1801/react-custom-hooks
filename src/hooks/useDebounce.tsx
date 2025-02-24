import { useRef } from "react";
import { useRefCallback } from "./useRefCallback";

export const useDebounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  const timerId = useRef<number | null>(null);

  const debouncedFunction = useRefCallback((...args: any[]) => {
    if (timerId.current) clearTimeout(timerId.current)
    timerId.current = setTimeout(() => func(...args), delay)
  }, [func, delay])

  return debouncedFunction;
}