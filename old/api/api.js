import blocksData from "./sample/blocks.json";
import sampleLookup from "./sample/sampleLookup";
import { useEffect, useState, useReducer } from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
require("dotenv/config");

const consoleLoggingAPI = (message) => {
  console.log("\n---------- API ----------");
  console.log(message);
  console.log("-------------------------\n");
};

const baseUrl = process.env.API_URL || "https://kokihop.herokuapp.com";

const apiCall = async (url, method) => {
  // const response = sampleLookup[url];
  const response = await fetch(baseUrl + url);
  const result = await response.json();
  return result;
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

const useDataApi = (initialUrl, initialData) => {
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
  }, [url, initialUrl]);

  return [state, setUrl];
};

export async function api(url = "", method, data = {}) {
  // Default options are marked with *
  const response = await fetch(baseUrl + url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default useDataApi;
