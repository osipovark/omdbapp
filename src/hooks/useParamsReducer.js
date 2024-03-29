import { useRef } from "react";
import { useSearchParams } from "react-router-dom";

function useParamsReducer(delay = 500) {
  const [searchParams, setSearchParams] = useSearchParams();
  const stringTimerRef = useRef(null);
  const yearTimerRef = useRef(null);
  const totalResultsRef = useRef(null);

  function dispatch(action) {
    switch (action.type) {
      case "inputStringChange":
        clearTimeout(stringTimerRef.current);
        totalResultsRef.current = null;
        stringTimerRef.current = setTimeout(() => {
          setSearchParams((prev) => {
            prev.delete("page");
            if (action.payload) {
              prev.set("s", action.payload);
            } else {
              prev.delete("s");
            }
            return prev;
          });
        }, delay);
        break;
      case "inputYearChange":
        clearTimeout(yearTimerRef.current);
        totalResultsRef.current = null;
        yearTimerRef.current = setTimeout(() => {
          setSearchParams((prev) => {
            prev.delete("page");
            if (action.payload) {
              prev.set("y", action.payload);
            } else {
              prev.delete("y");
            }
            return prev;
          });
        }, delay);
        break;
      case "selectTypeChange":
        totalResultsRef.current = null;
        setSearchParams((prev) => {
          prev.delete("page");
          if (action.payload) {
            prev.set("type", action.payload);
          } else {
            prev.delete("type");
          }
          return prev;
        });
        break;
      case "prevPageBtnClick":
        if (!totalResultsRef.current) {
          console.warn("pending");
          return;
        }
        setSearchParams((prev) => {
          if (!prev.has("page")) {
            console.log("you are on the first page");
          }
          if (Number(prev.get("page")) === 2) {
            prev.delete("page");
          }
          if (Number(prev.get("page")) >= 3) {
            prev.set("page", Number(prev.get("page")) - 1);
          }
          return prev;
        });
        break;
      case "nextPageBtnClick":
        if (!totalResultsRef.current) {
          console.warn("pending");
          return;
        }
        setSearchParams((prev) => {
          if (
            prev.has("page") &&
            Number(prev.get("page")) * 10 >= totalResultsRef.current
          ) {
            console.log("you are on the last page");
          }
          if (
            prev.has("page") &&
            totalResultsRef.current > Number(prev.get("page")) * 10
          ) {
            prev.set("page", Number(prev.get("page")) + 1);
          }
          if (!prev.has("page") && totalResultsRef.current > 10) {
            prev.set("page", 2);
          }
          if (!prev.has("page") && totalResultsRef.current <= 10) {
            console.log("first page contains all of the search results");
          }
          return prev;
        });
        break;
    }
  }

  return [searchParams, dispatch, totalResultsRef];
}

export { useParamsReducer };
