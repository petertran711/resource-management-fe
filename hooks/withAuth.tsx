import axios, { AxiosRequestConfig } from "axios";
import Loading from "../common/Loading";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { stringify } from "qs";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Auth, authState } from "../recoil/Atoms";
import { serviceOptions } from "../services/serviceOptions";
import { alertError } from "../utils";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const { token } = parseCookies(null);

    const [user, setUser] = useRecoilState(authState);

    useEffect(() => {
      if (!token) {
        alertError("Không có quyền truy cập!");
        setTimeout(() => {
          if (window) window.location.href = "/login";
          else console.log("Window");
        }, 1000);
      } else {
        const userTokenData = jwt_decode<Auth>(token);
        if (userTokenData) {
          const currentTime = new Date().getTime() / 1000;
          if (currentTime > userTokenData?.exp) {
            setTimeout(() => {
              alertError("Hết phiên làm việc. Vui lòng đăng nhập lại!");
              if (window) window.location.href = "/login";
              else console.log("Window");
            }, 1000);
          }

          setUser(userTokenData);
          const axiosConfig: AxiosRequestConfig = {
            baseURL:
              process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
            timeout: 60000 // 1 phút
          };

          if (token) {
            axiosConfig.headers = {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*"
            };
          }
          axiosConfig.paramsSerializer = {
            serialize: params => stringify(params, { arrayFormat: "repeat" })
          };
          serviceOptions.axios = axios.create(axiosConfig);
        }
      }
    }, [router.pathname]);

    if (!user?.sub) return <Loading />;

    return <WrappedComponent {...props} />;
  };
};
export default withAuth;
