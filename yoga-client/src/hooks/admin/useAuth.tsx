import { useState } from "react";
import http, { handleError, useHttpAuth } from "../../utils/http";
import { useDispatch } from "react-redux";
import { HttpStatusCode } from "axios";
import { loginStore, logoutStore } from "../../context/slice.user";
import toast from "react-hot-toast";

export default function useAuth() {
  const urlAuth = "/auth";
  const { http_auth } = useHttpAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const res = await http.post(urlAuth, formData);
      if (res.status == HttpStatusCode.Ok) {
        dispatch(loginStore({ isSigned: true, accessToken: res.data }));
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const changePassword = async ({
    email,
    oldPassword,
    newPassword,
  }: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      const res = await http_auth.post(`${urlAuth}/change-password`, formData);
      if (res.status == HttpStatusCode.Ok) {
        toast.success("change password success");
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await http_auth.get(`${urlAuth}/logout`);
      if (res.status == HttpStatusCode.Ok) {
        dispatch(logoutStore());
        return true;
      }
    } catch (error) {
      handleError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
    return false;
  };
  return { loading, login, changePassword, logout };
}
