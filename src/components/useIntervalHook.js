// This custom hook was developed by Dan Abramov and can be found below:
// https://codesandbox.io/s/329jy81rlm?file=/src/index.js:159-291
// And here is his blogpost about it https://overreacted.io/making-setinterval-declarative-with-react-hooks/

import { useEffect, useRef } from "react";

// Custom hook used to properly poll the API on the home screen.
function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  export default useInterval;