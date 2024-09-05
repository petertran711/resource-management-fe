import { Layout } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "qs";
import React, { FC } from "react";
import { serviceOptions } from "../../../services/serviceOptions";
import AuthLayoutElement from "../../../common/AuthLayoutElement";

const Index: FC = ({ children }: any) => {
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

  return (
    <Layout>
      <AuthLayoutElement children={children} />
    </Layout>
  );
};

export default Index;
