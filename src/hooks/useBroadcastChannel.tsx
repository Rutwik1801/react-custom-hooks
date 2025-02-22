import { useEffect, useRef, useState } from "react";

export const useBroadcastChannel = (channelName: string) => {
  // Using ref to avoid rerenders
  const bcRef = useRef<BroadcastChannel | null>(null);
  const [message, setMessage] = useState(null);

  const sendMessage = (data: any) => {
    bcRef.current?.postMessage(data);
  };

  useEffect(() => {
    const bc = new BroadcastChannel(channelName);
    bcRef.current = bc;

    bc.onmessage = (event: MessageEvent) => {
      setMessage(event.data);
    };

    return () => {
      // Closing and clearing the event handler explicitly
      bc.onmessage = null;
      bc.close();
    };
  }, [channelName]);

  return { sendMessage, message };
};
