import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

function useParamsReducer(delay = 500) {
  const [searchParams, setSearchParams] = useSearchParams();
  const timerRef = useRef(null);
  const totalResultsRef = useRef(null);

  function dispatch(action) {
    switch (action.type) {
      case "inputStringChange":
        clearTimeout(timerRef.current);
        totalResultsRef.current = null;
        timerRef.current = setTimeout(() => {
          setSearchParams((prev) => {
            if (action.payload) {
              prev.set("s", action.payload);
            } else {
              prev.delete("s");
            }
            return prev;
          });
        }, delay);
        break;
    }
  }

  return [searchParams, dispatch, totalResultsRef];
}

export { useParamsReducer };
