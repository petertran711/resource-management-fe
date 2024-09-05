import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { alertError } from "../../utils";
import * as yup from "yup";
import { SchemaOf } from "yup";
import jwt_decode from "jwt-decode";
import { authState, loadingState } from "../../recoil/Atoms";
import { AuthService, LoginDto } from "../../services";

interface Inputs {
  dto: LoginDto;
}

const schema: SchemaOf<Inputs> = yup.object().shape({
  dto: yup.object().shape({
    password: yup.string().required("Chưa nhập mật khẩu."),
    // .min(8, "Mật khẩu quá ngắn - tối thiểu phải có 8 ký tự."),
    email: yup.string().required("Chưa nhập Email.")
    // .matches(phoneRegExp, "Số điện thoại không hợp lệ")
  })
});

const Login: FC = () => {
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
    AuthService.authControllerLogin({
      body: { ...data.dto }
    })
      .then(response => {
        setIsLoading(false);
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
  };

  return (
    <>
      <div className={"auth-main-content"}>
        <Form onFinish={handleSubmit(onsubmit)}>
          <div className="auth-card-header">
            <div className="app-logo">
              <img src={"/images/cmclogin.png"} alt="cmc-global" />
            </div>
          </div>
          <div className="sign">
            <div className="sign-content">
              <div
                id="basic"
                className="ant-form ant-form-horizontal sign-form"
              >
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
                                  placeholder={"Nhập mật khẩu"}
                                />
                              )}
                            />
                          </Form.Item>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="sign-link">
                  <a href="/forgotPass">Forget Your Password?</a>
                </span>
                <div className="form-btn-field">
                  <Button
                    className={"w-full rounded sign-btn"}
                    type="primary"
                    htmlType="submit"
                    size={"middle"}
                  >
                    Login
                  </Button>
                </div>
                <div className="form-field-action">
                  <span className="sign-text-grey">Don't have account?</span>
                  <a className="underlineNone colorTextPrimary" href="/signup">
                    Signup
                  </a>
                </div>
              </div>
            </div>
            <div className="sign-footer">
              <span className="sign-text sign-text-grey">Or Login With</span>
              <div className="sign-socialLink">
                <button
                  type="button"
                  className="ant-btn ant-btn-icon-only sign-icon-btn"
                >
                  <span
                    role="img"
                    aria-label="google"
                    className="anticon anticon-google"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="google"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z"></path>
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  className="ant-btn ant-btn-icon-only sign-icon-btn"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="ant-btn ant-btn-icon-only sign-icon-btn"
                >
                  <span
                    role="img"
                    aria-label="github"
                    className="anticon anticon-github"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="github"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  className="ant-btn ant-btn-icon-only sign-icon-btn"
                >
                  <span
                    role="img"
                    aria-label="twitter"
                    className="anticon anticon-twitter"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="twitter"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0075-94 336.64 336.64 0 01-108.2 41.2A170.1 170.1 0 00672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 00-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 01-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 01-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div className="auth-wel-action">
        <div className="auth-wel-content">
          <h2>Welcome!</h2>
          <p>
            Website is purely based on Ant Design components and follows Ant
            Design guidelines.
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
