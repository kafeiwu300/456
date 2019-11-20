import {
  useReducer,
  Reducer,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { message } from 'antd';
import agent from 'superagent';

const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

interface Action {
  type: typeof FETCH_START | typeof FETCH_SUCCESS | typeof FETCH_ERROR;
  payload?: any;
}

export interface ResponseType<P = any> {
  statusCode: number | null;
  message: string | null;
  payload: P | null;
}

export interface State<P = any> {
  loading: boolean;
  error: ResponseType | null;
  response: ResponseType<P>;
}

function getReducer<P = any>() {
  const reducer: Reducer<State<P>, Action> = (
    state: State<P>,
    action: Action,
  ) => {
    switch (action.type) {
      case FETCH_START:
        return { ...state, loading: true, error: null };
      case FETCH_SUCCESS:
        return { loading: false, error: null, response: action.payload };
      case FETCH_ERROR:
        return {
          loading: false,
          error: action.payload,
          response: { ...action.payload, payload: null },
        };
      default:
        return state;
    }
  };
  return reducer;
}

/**
 * 用于注入请求数据的hook。
 * @param fetchFunc 请求函数
 * @param params 函数参数
 * @param execute 是否在参数改变时自动执行函数
 * @param executeOnMount 是否在组件挂载时就执行函数
 * @param bumpErrorMessage 是否自动弹出错误信息
 */
function useFetch<P = {}, Q = any>(
  fetchFunc: (payload: P) => agent.Request,
  params?: P,
  execute = false,
  executeOnMount = true,
  bumpErrorMessage = true,
) {
  const [state, dispatch] = useReducer<Reducer<State<Q>, Action>>(
    getReducer<Q>(),
    {
      loading: false,
      response: { statusCode: null, message: null, payload: null },
      error: null,
    },
  );
  const [paramsState, setParams] = useState(params);
  const isFirstRun = useRef(true);
  const doFetch = (payload: P) => {
    dispatch({ type: FETCH_START });
    return fetchFunc(payload)
      .then(res => {
        dispatch({ type: FETCH_SUCCESS, payload: res.body });
        return res;
      })
      .catch(err => {
        // 统一处理错误消息
        if (err.response && err.response.body) {
          dispatch({
            type: FETCH_ERROR,
            payload: err.response.body,
          });
        } else {
          dispatch({
            type: FETCH_ERROR,
            payload: { message: err.message, statusCode: null, payload: err },
          });
        }

        // 重新抛出
        throw err;
      });
  };

  /* eslint-disable */
  // 如果不加disable的画我就要把doFetch原封不动的抄写一遍然后把dispatch和fetchFunc加到deps里
  const doFetchWithMemo = useCallback(() => doFetch(paramsState!), [
    paramsState,
  ]);
  /* eslint-enable */

  useEffect(() => {
    if (!executeOnMount && isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    execute && doFetchWithMemo();
  }, [doFetchWithMemo, execute, executeOnMount]);

  useEffect(() => {
    if (bumpErrorMessage && state.error) {
      const err = state.error as any;
      if (err.error_description) {
        message.error(err.error_description);
      } else if (err.message) {
        message.error(err.message);
      } else if (err.payload) {
        message.error(err.payload);
      } else {
        message.error('网络错误');
      }
    }
  }, [bumpErrorMessage, state.error]);

  return {
    state,
    doFetch,
    setParams,
    doFetchWithMemo,
  };
}

export default useFetch;
