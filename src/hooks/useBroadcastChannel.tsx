import { useEffect, useRef, useState } from "react";
import { useRefCallback } from "./useRefCallback";

interface BroadcastMessage<T = any> {
  senderId?: string,
  data: T,
  timeStamp: number 
}

export const useBroadcastChannel = <T = any>(channelName: string, onMessage?: (message: BroadcastMessage<T>) => void) => {
  // Using ref to avoid rerenders
  const bcRef = useRef<BroadcastChannel | null>(null);
  const [messages, setMessages] = useState<BroadcastMessage<T>[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const sendMessage = useRefCallback((data: T, senderId?: string) => {
    bcRef.current?.postMessage({data, timeStamp: Date.now(), senderId});
  }, []);

  useEffect(() => {
    const bc = new BroadcastChannel(channelName);
    bcRef.current = bc;
    setIsConnected(true);

    bc.onmessage = (e: MessageEvent<BroadcastMessage<T>>) => {
      if(onMessage) {
        onMessage(e.data);
      }
    setMessages(prev => [...prev, e.data])
  }

  bc.onmessageerror = () => {
    console.log("bc Channel not connected")
    setIsConnected(false)
  }
    return () => {
      // Closing and clearing the event handler explicitly
      bc.onmessageerror = null;
      bc.onmessage = null;
      bc.close();
      setIsConnected(false);
    };
  }, [channelName, onMessage]);

  return { sendMessage, messages, isConnected };
};
