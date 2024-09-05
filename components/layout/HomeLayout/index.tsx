import { Layout, Spin } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { stringify } from "qs";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Auth, authState, loadingState } from "../../../recoil/Atoms";
import { serviceOptions } from "../../../services/serviceOptions";
import Login from "../../../pages/login";
import AuthLayoutElement from "../../../common/AuthLayoutElement";

const Index: React.FC = () => {
  const { token } = parseCookies();
  const isLoading = useRecoilValue(loadingState);
  const setUser = useSetRecoilState(authState);
  const axiosConfig: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
    timeout: 60000, // 1 phút
    // paramsSerializer: params => stringify(params, { arrayFormat: "repeat" })
    paramsSerializer: {
      serialize: params => stringify(params, { arrayFormat: "repeat" })
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
  serviceOptions.axios = axios.create(axiosConfig);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      const userTokenData = jwt_decode<Auth>(token);
      if (userTokenData) {
        const currentTime = new Date().getTime() / 1000;
        if (currentTime > userTokenData?.exp) {
          if (window) window.location.href = "/login";
        }

        setUser(userTokenData);
        const axiosConfig: AxiosRequestConfig = {
          baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
          timeout: 60000 // 1 phút
        };

        axiosConfig.headers = {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*"
        };
        // axiosConfig.paramsSerializer = params =>
        //   stringify(params, { arrayFormat: "repeat" });
        axiosConfig.paramsSerializer = {
          serialize: params => stringify(params, { arrayFormat: "repeat" })
        };
        serviceOptions.axios = axios.create(axiosConfig);
      }
    }
  }, [router.pathname]);

  return (
    <Layout>
      <Spin spinning={isLoading} tip="Đang tải...">
        <AuthLayoutElement children={<Login />} />
      </Spin>
    </Layout>
  );
};
export default Index;
