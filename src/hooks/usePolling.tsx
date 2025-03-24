import { useEffect, useRef, useState } from "react";

export const usePolling = <T,>(pollingFunc: () => Promise<T> | T, intervalTime: number) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [result, setResult] = useState<T | null>(null);
  const timerId = useRef<number | null>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    if (isActive && !timerId.current) {
      timerId.current = window.setInterval(async () => {
        try {
          const res = await Promise.resolve(pollingFunc());
          if (isMounted.current) {
            setResult(res);
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }, intervalTime);
    }

    return () => {
      isMounted.current = false;
      if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    };
  }, [isActive, pollingFunc, intervalTime]);

  return {
    start: () => setIsActive(true),
    pause: () => setIsActive(false),
    stop: () => {
      setIsActive(false);
      if (timerId.current) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    },
    result,
  };
};
