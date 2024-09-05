import { Button, Form, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { alertError, alertSuccess } from "../../utils";
import { AuthService } from "../../services";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useSetRecoilState } from "recoil";
import { authState, loadingState } from "../../recoil/Atoms";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

interface Inputs {
  password: string;
  retypePassword: string;
}

const passwordReg = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
const schema: SchemaOf<Inputs> = yup.object().shape({
  password: yup
    .string()
    .required("Chưa nhập mật khẩu.")
    .min(8, "Mật khẩu quá ngắn - tối thiểu phải có 8 ký tự.")
    .matches(
      passwordReg,
      "Tối thiểu 8 ký tự, ít nhất 1 ký tự in hoa, 1 số, 1 ký tự thường và 1 ký tự đặc biệt"
    ),
  retypePassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Mật khẩu không trùng khớp, vui lòng nhập lại mật khẩu"
    )
});
const ResetPass = () => {
  const router = useRouter();
  const setAuthState = useSetRecoilState(authState);
  const setIsLoading = useSetRecoilState(loadingState);

  const { email } = parseCookies(null);
  const { redirect = "/admin" } = router.query;

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const onsubmit: SubmitHandler<Inputs> = data => {
    setIsLoading(true);
    AuthService.authControllerResetPassword({
      body: { email: email, password: data.password }
    })
      .then(() => {
        alertSuccess("Reset mật khẩu thành công.");
        setTimeout(() => {
          setIsLoading(true);
          AuthService.authControllerLogin({
            body: { email: email, password: data.password }
          })
            .then(response => {
              setIsLoading(false);
              destroyCookie(null, "email", {
                path: "/"
              });
              setCookie(null, "token", String(response), {
                maxAge: 30 * 24 * 60 * 60,
                path: "/"
              });
              setAuthState(jwt_decode(response));
              if (redirect) router.push(`${redirect}`).then();
              else router.replace("/").then();
            })
            .catch(e => {
              setIsLoading(false);
              alertError(e);
            });
        }, 1000);
      })
      .catch(e => alertError(e));
  };

  return (
    <>
      <div className={"auth-main-contentSignup"}>
        <Form onFinish={handleSubmit(onsubmit)}>
          <div className="auth-card-header">
            <div className={"header-signup"} style={{ fontSize: 20 }}>
              Reset Password
            </div>
          </div>
          <div className="sign">
            <div className="sign-content">
              <div className="ant-form ant-form-horizontal sign-form">
                <div className="ant-row ant-form-item form-field">
                  <div className="ant-col ant-form-item-control">
                    <div className="ant-form-item-control-input">
                      <div className="ant-form-item-control-input-content">
                        <Form.Item
                          className={"mb-2"}
                          required
                          validateStatus={errors?.password && "error"}
                          help={errors?.password && errors?.password.message}
                        >
                          <Controller
                            control={control}
                            name={"password"}
                            render={({ field }) => (
                              <Input.Password
                                className={"rounded h-10"}
                                {...field}
                                placeholder={"New Password"}
                              />
                            )}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ant-row ant-form-item form-field">
                  <div className="ant-col ant-form-item-control">
                    <div className="ant-form-item-control-input">
                      <div className="ant-form-item-control-input-content">
                        <Form.Item
                          className={"mb-2"}
                          required
                          validateStatus={errors?.retypePassword && "error"}
                          help={
                            errors?.retypePassword &&
                            errors?.retypePassword.message
                          }
                        >
                          <Controller
                            control={control}
                            name={"retypePassword"}
                            render={({ field }) => (
                              <Input.Password
                                className={"rounded h-10"}
                                {...field}
                                placeholder={"Retype Password"}
                              />
                            )}
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-btn-field">
                  <Button
                    className={"w-full rounded sign-btn"}
                    type="primary"
                    htmlType="submit"
                    size={"middle"}
                  >
                    Reset My Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="auth-wel-action" style={{ background: "none" }}>
        <div className="auth-wel-content">
          <img src="/images/Mediamodifier-Design-ResetPass.svg" alt="icon" />
        </div>
      </div>
    </>
  );
};
export default ResetPass;
