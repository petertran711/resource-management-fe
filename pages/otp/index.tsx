import { Spin } from "antd";
import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { AuthService } from "../../services";
import { alertError, alertSuccess } from "../../utils";
import { parseCookies } from "nookies";
import OtpInput from "react-otp-input";

const QRCode: FC = () => {
  const router = useRouter();
  const { email } = parseCookies(null);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangeOtp = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      setIsLoading(true);
      AuthService.authControllerTurnOnTwoFactorAuthentication({
        body: {
          twoFactorAuthenticationCode: value,
          email
        }
      })
        .then(() => {
          setIsLoading(false);
          alertSuccess("Xác thực thành công.");
          setTimeout(() => {
            router.push("/resetPass");
          }, 1000);
        })
        .catch(e => {
          setIsLoading(false);
          alertError(e);
        });
    }
  };

  return (
    <>
      <div className={"w-full"}>
        <Spin spinning={isLoading}>
          <div className={"text-center"}>
            <div
              className={"mt-12 mb-4 font-semibold"}
              style={{ fontSize: "1.75rem" }}
            >
              Validate OTP
            </div>
            <img className={"m-auto mb-6"} src="./images/otp-icon.png" alt="" />
            <div className={"mb-6"}>
              Please enter the OTP (one time password) to verify your account.
              The code is saved to your phone when you scan the QR
            </div>
            <OtpInput
              value={otp}
              onChange={handleChangeOtp}
              numInputs={6}
              isInputNum={true}
              shouldAutoFocus={true}
              containerStyle={"justify-center"}
              inputStyle={"border mx-2 text-2xl rounded-md h-14 input-opt mb-8"}
            />
          </div>
        </Spin>
      </div>
    </>
  );
};

export default QRCode;
