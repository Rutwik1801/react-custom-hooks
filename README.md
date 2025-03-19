# react-beautiful-hooks-library

Super useful react + ts hooks all in one place

## Installation

Install this package with npm

```bash
  npm i react-beautiful-hooks-library
```
    

## Hooks list

### useDebounce

Delays updating a value until a specified amount of time has passed

```javascript
import {useDebounce} from 'react-beautiful-hooks-library'

export default function App() {
    const func = () => {
        console.log("this needs to be debounced");
    }
    const debouncedFunction = useDebounce(func, 100);
  return (<YourComponents />);
}
```

### useBroadcastChannel
Leverages the BroadcastChannel API to enable real-time communication between 
different tabs or windows of the same origin

```javascript
import {useBroadcastChannel} from 'react-beautiful-hooks-library'

export default function App() {
    const {messages, sendMessage, isConnected} = useBroadcastChannel("channel name")
  return (<YourComponents />);
}
```

### useRefCallback

Combines useRef and useCallback to dynamically assign and track a reference (ref) to a DOM element or component instance. It is useful when you need to perform actions when a ref changes

```javascript
import {useRefCallback} from 'react-beautiful-hooks-library'

export default function App() {
    const [message, sendMessage] = useState("");
    const func = () => {
        setMessage("hello world");
    }
    const refCallbackFunc = useRefCallback(func, [message]);
  return (<YourComponents onClick={refCallbackFunc} />);
}
```

### usePrevious

Tracks the previous value of a state.

```javascript
import {usePrevious} from 'react-beautiful-hooks-library'

export default function App() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount ?? "N/A"}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
}
```