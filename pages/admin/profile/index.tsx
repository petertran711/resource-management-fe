import React, { FC, useEffect, useState } from "react";
import Content from "../../../components/layout/AdminLayout/Content";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Switch,
  Tabs
} from "antd";
import {
  LockFilled,
  MehFilled,
  SafetyCertificateTwoTone,
  UserOutlined
} from "@ant-design/icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserEntity, UsersService } from "../../../services";
import * as yup from "yup";
import { alertError, modifyEntity } from "../../../utils";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/Atoms";
import { useRouter } from "next/router";

interface Inputs {
  user: UserEntity;
  passwordConfirm?: string;
  newPassword?: string;
}

const schema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().nullable(),
    email: yup.string().nullable(),
    tel: yup.string()
  }),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "Mật khẩu không trùng khớp, vui lòng nhập lại mật khẩu"
    )
});
const Index: FC = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {}
  });
  const [keyTabs, setKeyTabs] = useState<string>("form-info");
  const [title, setTitle] = useState<string>("");
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const user = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    UsersService.getOneBase({ id: Number(user.sub) }).then(res => {
      setValue("user", res);
      setSwitchValue(res.isTwoFactorAuthenticationEnabled);
      setValue("user.password", undefined);
    });
  }, []);
  const tabChangeInfo = key => {
    setKeyTabs(key);
    if (key === "form-info") setTitle("Thông tin cá nhân");
    else if (key === "form-resetPassword") setTitle("Đổi mật khẩu");
  };
  const onSubmit: SubmitHandler<Inputs> = data => {
    if (keyTabs === "form-info") {
      if (!data.user.name) return alertError("Vui lòng nhập Tên");
      if (!data.user.tel) {
        return alertError("Vui lòng nhập Số điện thoại");
      } else {
        const re = new RegExp(
          /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
        );
        if (!re.test(data.user.tel))
          return alertError("Số điện thoại không hợp lệ");
      }
      const { password, ...payload } = data.user;
      modifyEntity(UsersService, payload, "Cập nhật", () => {
        return router.push(`/admin/profile`);
      }).then();
    } else {
      if (!data.user.password) return alertError("Vui lòng nhập Mật khẩu");
      modifyEntity(
        UsersService,
        { ...data.user, newPass: data.newPassword },
        "Cập nhật",
        () => {
          return router.push(`/admin/profile`);
        }
      ).then();
    }
  };

  const onChangeSwitch = (value: boolean) => {
    UsersService.userControllerSwitchTwoFactorAuthentication({
      body: {
        id: Number(user.sub),
        value: value
      }
    })
      .then(res => {
        setSwitchValue(res.isTwoFactorAuthenticationEnabled);
        setValue(
          "user.isTwoFactorAuthenticationEnabled",
          res.isTwoFactorAuthenticationEnabled
        );
      })
      .catch(e => alertError(e));
  };

  return (
    <Content>
      <Card>
        <Form layout={"vertical"} onFinish={handleSubmit(onSubmit)}>
          <Tabs
            defaultActiveKey="1"
            tabPosition={"left"}
            style={{ height: 220 }}
            onChange={tabChangeInfo}
          >
            <Tabs.TabPane
              tab={
                <div>
                  <MehFilled />
                  Thông tin cá nhân
                </div>
              }
              key="form-info"
            >
              <div className={"flex items-center"}>
                <div className={"mr-4"}>
                  <Avatar size={50} icon={<UserOutlined />} />
                </div>

                <div>
                  <div className={"mb-1.5"}>
                    <SafetyCertificateTwoTone /> Security
                  </div>
                  <div>
                    <Form.Item className={"m-0"} valuePropName="checked">
                      <Controller
                        control={control}
                        name={"user.isTwoFactorAuthenticationEnabled"}
                        render={({ field }) => (
                          <Switch
                            {...field}
                            onChange={onChangeSwitch}
                            checked={switchValue}
                          />
                        )}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <Row gutter={[32, 0]} className={"mt-4"}>
                <Col xs={24} md={12}>
                  <Form.Item
                    required
                    validateStatus={errors.user?.name && "error"}
                    help={errors.user?.name && errors.user?.name?.message}
                  >
                    <Controller
                      control={control}
                      name={"user.name"}
                      render={({ field }) => (
                        <Input {...field} placeholder={"Tên"} />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    required
                    validateStatus={errors.user?.email && "error"}
                    help={errors.user?.email && errors.user?.email?.message}
                  >
                    <Controller
                      control={control}
                      name={"user.email"}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder={"Email"}
                          addonAfter="@cmcglobal.vn"
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[32, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item>
                    <Controller
                      control={control}
                      name={"user.address"}
                      render={({ field }) => (
                        <Input {...field} placeholder={"Địa chỉ"} />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    required
                    validateStatus={errors.user?.tel && "error"}
                    help={errors.user?.tel && errors.user?.tel?.message}
                  >
                    <Controller
                      control={control}
                      name={"user.tel"}
                      render={({ field }) => (
                        <Input {...field} placeholder={"Số điện thoại"} />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType={"submit"}>
                    Lưu thay đổi
                  </Button>
                  <Button onClick={() => router.push("/admin")}>Hủy bỏ</Button>
                </Space>
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <div>
                  <LockFilled />
                  Đổi mật khẩu
                </div>
              }
              key="form-resetPassword"
            >
              <div className={"text-lg font-semibold font-sans"}>{title}</div>
              <Row gutter={[32, 0]} className={"mt-4"}>
                <Col xs={24} md={12}>
                  <Form.Item
                    className={"font-medium"}
                    validateStatus={errors?.user?.password && "error"}
                    help={
                      errors?.user?.password && errors?.user?.password.message
                    }
                  >
                    <Controller
                      control={control}
                      name={"user.password"}
                      render={({ field }) => (
                        <Input.Password
                          className={"rounded"}
                          {...field}
                          placeholder="Mật khẩu"
                          autoComplete={"off"}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[32, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    className={"font-medium"}
                    validateStatus={errors?.newPassword && "error"}
                    help={errors?.newPassword && errors?.newPassword.message}
                  >
                    <Controller
                      control={control}
                      name={"newPassword"}
                      render={({ field }) => (
                        <Input.Password
                          className={"rounded"}
                          {...field}
                          placeholder="Mật khẩu mới"
                          autoComplete={"off"}
                        />
                      )}
                    />
                    <span className={"text-xs text-gray-400"}>
                      Ít nhất 8 ký tự
                    </span>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    required
                    validateStatus={errors?.passwordConfirm && "error"}
                    help={
                      errors?.passwordConfirm && errors?.passwordConfirm.message
                    }
                  >
                    <Controller
                      control={control}
                      name={"passwordConfirm"}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          placeholder={"Nhập lại mật khẩu"}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType={"submit"}>
                    Lưu thay đổi
                  </Button>
                  <Button onClick={() => router.push("/admin")}>Hủy bỏ</Button>
                </Space>
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Card>
    </Content>
  );
};
export default Index;
