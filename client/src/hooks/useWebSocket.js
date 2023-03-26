import { useState, useEffect } from "react";

// define a custom hook
// accept the url to connect to
// the interval between retries
export default function useWebSocket({ socketUrl }) {
  const [data, setData] = useState();
  const [send, setSend] = useState(() => () => undefined);
  const [readyState, setReadyState] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      console.log("Connecting to socket...");
      setReadyState(true);

      setSend(() => {
        return (data) => {
          try {
            const d = JSON.stringify(data);
            ws.send(d);
            return true;
          } catch (err) {
            return false;
          }
        };
      });

      ws.onmessage = (event) => {
        const msg = formatMessage(event.data);
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    ws.onclose = () => {
      setReadyState(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { send, data, readyState };
}

// small utilities that we need
// handle json messages
function formatMessage(data) {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    return data;
  }
}

// get epoch timestamp
function getTimestamp() {
  return new Date().getTime();
}
