import "../styles/globals.css";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import { useRouter } from "next/router";
import AdminLayout from "../components/layout/AdminLayout";
import AuthLayout from "../components/layout/AuthLayout";
import React, { useEffect } from "react";
import HomeLayout from "../components/layout/HomeLayout";
import "antd/dist/antd.css";
import "../styles/admin.styles.css";
import "../styles/custom-theme.css";
import "../styles/styles.css";
import "../styles/login.css";
import "../styles/qrcode.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const adminLayout = router.pathname.includes("admin");
  const authLayout = [
    "/login",
    "/signup",
    "/forgotPass",
    "/qrcode",
    "/otp",
    "/resetPass"
  ].includes(router.pathname);
  const homeLayout = ["/"].includes(router.pathname);
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
    // initFacebookSdk().then()
  }, []);

  return (
    <>
      <Head>
        <title>DU19</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <RecoilRoot>
        <ConfigProvider locale={viVN}>
          {adminLayout ? (
            <AdminLayout>
              <Component {...pageProps} />
            </AdminLayout>
          ) : authLayout ? (
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          ) : homeLayout ? (
            <HomeLayout>
              <Component {...pageProps} />
            </HomeLayout>
          ) : (
            ""
          )}
        </ConfigProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
