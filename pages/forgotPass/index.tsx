import { Button, Form, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { alertError } from "../../utils";
import { AuthService } from "../../services";
import { setCookie } from "nookies";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../recoil/Atoms";
import { useRouter } from "next/router";

interface Inputs {
  email: string;
}

const schema: SchemaOf<Inputs> = yup.object().shape({
  email: yup.string().required("Chưa nhập Email.")
});
const ForgotPass = () => {
  const router = useRouter();
  const setIsLoading = useSetRecoilState(loadingState);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  const onsubmit: SubmitHandler<Inputs> = data => {
    setIsLoading(true);

    AuthService.authControllerCheckEmail({
      email: data.email
    })
      .then(response => {
        setIsLoading(false);
        setCookie(null, "email", String(data.email), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/"
        });
        setTimeout(() => {
          router.push(response);
        }, 500);
      })
      .catch(e => alertError(e));
  };

  return (
    <>
      <div className={"auth-main-contentSignup"}>
        <Form onFinish={handleSubmit(onsubmit)}>
          <div className="auth-card-header">
            <div className={"header-signup"} style={{ fontSize: 20 }}>
              Forget Your Password?
            </div>
          </div>
          <div className={"text-center mb-12"}>
            Forget your password? No need to worry. Tell us your email and we
            will send your password.
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
                          validateStatus={errors?.email && "error"}
                          help={errors?.email && errors?.email.message}
                        >
                          <Controller
                            control={control}
                            name={"email"}
                            render={({ field }) => (
                              <Input
                                className={"rounded h-10"}
                                {...field}
                                placeholder={"Email"}
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
                    Send OTP
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="auth-wel-action" style={{ background: "none" }}>
        <div className="auth-wel-content max-w-none">
          <img src="/images/Mediamodifier-Design-Forgot.svg" alt="icon" />
        </div>
      </div>
    </>
  );
};
export default ForgotPass;
