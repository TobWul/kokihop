import blocksData from "./sample/blocks.json";
import sampleLookup from "./sample/sampleLookup";
import { useEffect, useState, useReducer } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";

const consoleLoggingAPI = (message) => {
  console.log("\n---------- API ----------");
  console.log(message);
  console.log("-------------------------\n");
};

const baseUrl = "localhost:8000/api/";

const apiCall = async (url, method) => {
  const response = sampleLookup[url];
  // const response = await fetch(baseUrl + url, {
  //   method,
  // })
  return response;
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData, setComponentState) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    url,
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await apiCall(url, "GET");

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result });
          consoleLoggingAPI(result);
        }
        setComponentState && setComponentState(result);
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    url && fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useDataApi;
