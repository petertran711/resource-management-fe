import React, { FC, useEffect, useState } from "react";
import { Button, Image } from "antd";
import { useRouter } from "next/router";
import { AuthService } from "../../services";
import { alertError } from "../../utils";
import { parseCookies } from "nookies";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const QRCode: FC = () => {
  const router = useRouter();
  const { email } = parseCookies(null);
  const [qr, setQR] = useState<string>("error");

  useEffect(() => {
    email &&
      AuthService.authControllerGenerateQrCode({
        email: email
      })
        .then(res => {
          setQR(res);
        })
        .catch(e => alertError(e));
  }, [email]);

  return (
    <>
      <div className={"auth-main-contentSignup demo-wrap"}>
        <a href="/" title="cmc">
          <img
            src="/images/bannerlogo.ico"
            alt="cmc"
            width={200}
            style={{ position: "relative" }}
          />
        </a>
        <div className={"demo-content my-auto"}>
          <h1
            className="text-white text-uppercase mb-4 font-bold"
            style={{ fontSize: "2rem" }}
          >
            We care about your account security.
          </h1>
          <div className={"text-base mb-12 font-medium text-white"}>
            We are glad to see you again!
          </div>
        </div>
        <div>
          <span className={"text-right float-left"}>
            <Button className={"rounded-2xl"} onClick={() => router.push("/")}>
              <ArrowLeftOutlined />
              Quay lại
            </Button>
          </span>
          <span className={"text-left float-right"}>
            <Button
              type="primary"
              className={"rounded-2xl"}
              onClick={() => router.push("/otp")}
            >
              Tiếp theo <ArrowRightOutlined />
            </Button>
          </span>
        </div>
      </div>
      <div className="auth-wel-action" style={{ background: "none" }}>
        <div className="auth-wel-content">
          <div
            style={{
              backgroundColor: "black",
              padding: 7,
              borderRadius: 15
            }}
            className={"text-center"}
          >
            <img className={"rounded-lg"} src={qr} alt="icon" />
          </div>
        </div>
        <div className={"text-black text-center"}>
          <div className={"mt-4 font-semibold text-lg"}>Scan with QR Code</div>
          <div className={"flex"}>
            Download
            <span className={"ml-1"}>
              <Image
                src="/images/Google_Authenticator.svg"
                alt="Google_Authenticator"
                preview={false}
              />
            </span>
            and Scan this with your camera or our mobile app to get OTP
            instantly.
          </div>
        </div>
      </div>
    </>
  );
};

export default QRCode;
