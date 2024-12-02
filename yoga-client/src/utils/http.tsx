import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import toast from "react-hot-toast";
import { logoutStore, setAccessTokenStore } from "../context/slice.user";
class Http {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      withCredentials: true,
    });
  }
}
class HttpAuth {
  instance: AxiosInstance;
  constructor(
    accessToken: string | null | undefined,
    handleRefresh: () => Promise<null | string>
  ) {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      withCredentials: true,
      // timeout: 1000000,
    });
    this.instance.interceptors.request.use(
      async (config) => {
        const date = new Date();
        if (accessToken != null) {
          const decodeToken: JwtPayload = jwtDecode<JwtPayload>(accessToken);
          if (decodeToken.exp && decodeToken.exp < date.getTime() / 1000) {
            const newAccessToken = await handleRefresh();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (err) => {
        // console.log("error refresh token", err);
        return Promise.reject(err);
      }
    );
  }
}
const useHttpAuth = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const handleRefreshToken = async (): Promise<string | null> => {
    try {
      const res = await http.get("/auth");
      if (res.status == HttpStatusCode.Ok && res.data) {
        dispatch(setAccessTokenStore(res.data));
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(logoutStore());
    return null;
  };
  const http_auth = new HttpAuth(accessToken, handleRefreshToken).instance;
  return { http_auth, handleRefreshToken };
};
const http = new Http().instance;
export { useHttpAuth };
export default http;
export function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorHttp = error as AxiosError<ResultUtil<null>>;
    toast.error(errorHttp.response?.data.message as string, {
      duration: 3000,
    });
  }
}
export interface ResultUtil<T> {
  model?: T | null;
  message?: string | null;
  status?: boolean;
}
