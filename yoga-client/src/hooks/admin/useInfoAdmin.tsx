import { useState } from "react";
import { handleError, useHttpAuth } from "../../utils/http";
import { HttpStatusCode } from "axios";
export interface PayloadDataInfo {
  phone: string;
  email: string;
  address: string;
  linkFanPage: string[];
  logoApp: File | null;
  sloganApp: string;
}
export interface PayloadDataBank {
  bankStk: string;
  bankName: string;
  bankOwnerName: string;
  bankQRCode: File | null;
}
export default function useInfoAdmin() {
  const urlInfo = "/infoApp/admin";
  const [loading, setLoading] = useState<boolean>();
  const { http_auth } = useHttpAuth();
  const updateInfo = async (data: PayloadDataInfo) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("linkFanPage", data.linkFanPage[0]);
      formData.append("linkFanPage", data.linkFanPage[1]);
      formData.append("sloganApp", data.sloganApp);
      if (data.logoApp) {
        formData.append("logoApp", data.logoApp);
      }
      const res = await http_auth.put(`${urlInfo}/info`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == HttpStatusCode.Ok) {
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
  const updateBank = async (data: PayloadDataBank) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("bankName", data.bankName);
      formData.append("bankStk", data.bankStk);
      formData.append("bankOwnerName", data.bankOwnerName);
      if (data.bankQRCode) {
        formData.append("bankQRCode", data.bankQRCode);
      }
      const res = await http_auth.put(`${urlInfo}/bank`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status == HttpStatusCode.Ok) {
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

  return { updateBank, updateInfo, loading };
}
