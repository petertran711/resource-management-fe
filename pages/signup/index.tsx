import { Button, Checkbox, Form, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthService, UserEntity } from "../../services";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { setCookie } from "nookies";
import { alertError, alertSuccess } from "../../utils";
import { useSetRecoilState } from "recoil";
import { authState, loadingState } from "../../recoil/Atoms";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

interface Inputs {
  dto: UserEntity;
  retypePassword: string;
  agree: boolean;
}

const passwordReg = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
const phoneRegExp = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
const schema: SchemaOf<Inputs> = yup.object().shape({
  dto: yup.object().shape({
    name: yup.string().required("Chưa nhập Họ và tên."),
    password: yup
      .string()
      .required("Chưa nhập mật khẩu.")
      .min(8, "Mật khẩu quá ngắn - tối thiểu phải có 8 ký tự.")
      .matches(
        passwordReg,
        "Tối thiểu 8 ký tự, ít nhất 1 ký tự in hoa, 1 số, 1 ký tự thường và 1 ký tự đặc biệt"
      ),
    tel: yup
      .string()
      .required("Chưa nhập Số điện thoại.")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
    email: yup.string().required("Chưa nhập Email.")
  }),
  retypePassword: yup
    .string()
    .oneOf(
      [yup.ref("dto.password"), null],
      "Mật khẩu không trùng khớp, vui lòng nhập lại mật khẩu"
    )
});
const Signup = () => {
  const router = useRouter();
  const setIsLoading = useSetRecoilState(loadingState);
  const setAuthState = useSetRecoilState(authState);
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
    if (!data.agree)
      return alertError("Vui lòng tích chọn đồng ý với các điều khoản!");

    AuthService.authControllerRegister({ body: data.dto })
      .then(() => {
        AuthService.authControllerLogin({
          body: { email: data.dto.email, password: data.dto.password }
        })
          .then(response => {
            setIsLoading(false);
            setCookie(null, "token", String(response), {
              maxAge: 30 * 24 * 60 * 60,
              path: "/"
            });
            setAuthState(jwt_decode(response));
            alertSuccess("Đăng ký thành công");
            setTimeout(() => {
              if (redirect) router.push(`${redirect}`).then();
              else router.replace("/").then();
            }, 1000);
          })
          .catch(e => {
            setIsLoading(false);
            alertError(e);
          });
      })
      .catch(e => alertError(e));
  };
  return (
    <>
      <div className={"auth-main-contentSignup"}>
        <Form onFinish={handleSubmit(onsubmit)}>
          <div className="auth-card-header">
            <div className={"header-signup"} style={{ fontSize: 20 }}>
              Signup
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
                          validateStatus={errors?.dto?.name && "error"}
                          help={errors?.dto?.name && errors?.dto?.name.message}
                        >
                          <Controller
                            control={control}
                            name={"dto.name"}
                            render={({ field }) => (
                              <Input
                                className={"rounded h-10"}
                                {...field}
                                placeholder={"Họ và tên"}
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
                          validateStatus={errors?.dto?.email && "error"}
                          help={
                            errors?.dto?.email && errors?.dto?.email.message
                          }
                        >
                          <Controller
                            control={control}
                            name={"dto.email"}
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
                <div className="ant-row ant-form-item form-field">
                  <div className="ant-col ant-form-item-control">
                    <div className="ant-form-item-control-input">
                      <div className="ant-form-item-control-input-content">
                        <Form.Item
                          className={"mb-2"}
                          required
                          validateStatus={errors?.dto?.tel && "error"}
                          help={errors?.dto?.tel && errors?.dto?.tel.message}
                        >
                          <Controller
                            control={control}
                            name={"dto.tel"}
                            render={({ field }) => (
                              <Input
                                className={"rounded h-10"}
                                {...field}
                                placeholder={"Số điện thoại"}
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
                        <span>
                          <Form.Item
                            className={"mb-2"}
                            required
                            validateStatus={errors?.dto?.password && "error"}
                            help={
                              errors?.dto?.password &&
                              errors?.dto?.password.message
                            }
                          >
                            <Controller
                              control={control}
                              name={"dto.password"}
                              render={({ field }) => (
                                <Input.Password
                                  className={"rounded h-10"}
                                  {...field}
                                  placeholder={"Mật khẩu"}
                                />
                              )}
                            />
                          </Form.Item>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ant-row ant-form-item form-field">
                  <div className="ant-col ant-form-item-control">
                    <div className="ant-form-item-control-input">
                      <div className="ant-form-item-control-input-content">
                        <span>
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
                                  placeholder={"Nhập lại mật khẩu"}
                                />
                              )}
                            />
                          </Form.Item>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"mb-8"}>
                  <Controller
                    control={control}
                    name={"agree"}
                    render={({ field }) => (
                      <Checkbox {...field}>
                        I agree <a href="#">to Terms & Conditions</a>
                      </Checkbox>
                    )}
                  />
                </div>

                <div className="form-btn-field">
                  <Button
                    className={"w-full rounded sign-btn"}
                    type="primary"
                    htmlType="submit"
                    size={"middle"}
                  >
                    Signup
                  </Button>
                </div>
                <div className="form-field-action text-center">
                  <span className="sign-text-grey">Already have account?</span>
                  <a className="underlineNone colorTextPrimary" href="/login">
                    Sign in here
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="auth-wel-action" style={{ background: "none" }}>
        <div className="auth-wel-content max-w-none">
          <img src="/images/Mediamodifier-Design.svg" alt="icon" />
        </div>
      </div>
    </>
  );
};
export default Signup;
