import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch
} from "antd";
import Content from "../../../components/layout/AdminLayout/Content";
import React, { FC, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  EnumUserEntityLocation,
  EnumUserEntityStatus,
  RoleEntity,
  RolesService,
  UserEntity,
  UserPositionEntity,
  UsersPositionService,
  UsersService
} from "../../../services";
import { alertError, filterOption, modifyEntity } from "../../../utils";
import DatePicker from "../../../common/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextArea from "antd/lib/input/TextArea";
import FooterBar from "../../../components/layout/AdminLayout/FooterBar";

interface Inputs {
  user: UserEntity;
}

const phoneRegExp = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
const schema = yup.object().shape({
  user: yup.object().shape({
    name: yup
      .string()
      .required("Chưa nhập Tên thành viên")
      .nullable(),
    email: yup
      .string()
      .required("Chưa nhập Email")
      .nullable(),
    onboardDate: yup
      .date()
      .required("Chưa chọn Ngày Onboard")
      .nullable(),

    userPositionId: yup
      .string()
      .required("Chưa chọn Vị trí")
      .nullable(),
    tel: yup
      .string()
      .required("Chưa nhập Số điện thoại")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ")
  })
});

const UserDetail: FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("Thêm thành viên");
  const [usersPosition, setUsersPosition] = useState<UserPositionEntity[]>([]);
  const [roles, setRoles] = useState<RoleEntity[]>([]);
  const [checked, setChecked] = useState<boolean>();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  useEffect(() => {
    if (router?.query?.id && String(router?.query?.id) != "create") {
      setTitle("Cập nhật thành viên");
      UsersService.getOneBase({
        id: Number(router?.query?.id)
      })
        .then(userResponse => {
          setValue("user", userResponse);
          setChecked(userResponse.isTwoFactorAuthenticationEnabled);
          if (userResponse.dob)
            setValue("user.dob", new Date(userResponse.dob));
          if (userResponse.onboardDate)
            setValue("user.onboardDate", new Date(userResponse.onboardDate));
          if (userResponse.leaveDate)
            setValue("user.leaveDate", new Date(userResponse.leaveDate));
        })
        .catch(e => alertError(e));
    }
  }, [router]);

  useEffect(() => {
    Promise.all([
      UsersPositionService.getManyBase(),
      RolesService.getManyBase({
        sort: ["name,ASC"]
      })
    ])
      .then(([userPositionResponse, roleResponse]) => {
        setUsersPosition(userPositionResponse.data);
        setRoles(roleResponse.data);
      })
      .catch(error => {
        alertError(error);
      });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = data => {
    modifyEntity(UsersService, data.user, title, () => {
      return router.push(`/admin/user`);
    }).then();
  };

  const onChangeSwitch = (value: boolean) => {
    UsersService.userControllerSwitchTwoFactorAuthentication({
      body: {
        id: Number(router?.query?.id),
        value: value
      }
    })
      .then(res => {
        setChecked(res.isTwoFactorAuthenticationEnabled);
        setValue(
          "user.isTwoFactorAuthenticationEnabled",
          res.isTwoFactorAuthenticationEnabled
        );
      })
      .catch(e => alertError(e));
  };

  return (
    <Content title={title} onBack={() => router.push("/admin/user")}>
      <Form layout={"vertical"} onFinish={handleSubmit(onSubmit)}>
        <Card>
          <Row gutter={[32, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Tên thành viên"}
                required
                validateStatus={errors.user?.name && "error"}
                help={errors.user?.name && errors.user?.name?.message}
              >
                <Controller
                  control={control}
                  name={"user.name"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"Tên thành viên"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Số điện thoại"}
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
            <Col xs={24} md={12}>
              <Form.Item label={"Mật khẩu"}>
                <Controller
                  control={control}
                  name={"user.password"}
                  render={({ field }) => (
                    <Input.Password {...field} placeholder={"Mật khẩu"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Ngày sinh"}
                validateStatus={errors.user?.dob && "error"}
                help={errors.user?.dob && errors.user?.dob?.message}
              >
                <Controller
                  control={control}
                  name={"user.dob"}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      allowClear
                      placeholder="Ngày sinh"
                      className="w-full"
                      format={"dd/MM/yyyy"}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Ngày onboard"}
                required
                validateStatus={errors.user?.onboardDate && "error"}
                help={
                  errors.user?.onboardDate && errors.user?.onboardDate?.message
                }
              >
                <Controller
                  control={control}
                  name={"user.onboardDate"}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      allowClear
                      placeholder="Ngày onboard"
                      className="w-full"
                      format={"dd/MM/yyyy"}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Email"}
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
            <Col xs={24} md={12}>
              <Form.Item label={"Ngày nghỉ việc"}>
                <Controller
                  control={control}
                  name={"user.leaveDate"}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      allowClear
                      placeholder="Ngày nghỉ việc"
                      className="w-full"
                      format={"dd/MM/yyyy"}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Vị trí"}
                required
                validateStatus={errors.user?.userPositionId && "error"}
                help={
                  errors.user?.userPositionId &&
                  errors.user?.userPositionId?.message
                }
              >
                <Controller
                  control={control}
                  name={"user.userPositionId"}
                  render={({ field }) => (
                    <Select
                      size={"middle"}
                      filterOption={filterOption}
                      showSearch
                      {...field}
                      placeholder="Chọn Vị trí"
                    >
                      {usersPosition &&
                        usersPosition?.map(userPosition => (
                          <Select.Option
                            key={userPosition.id}
                            value={userPosition.id}
                          >
                            {userPosition.name}
                            {userPosition.experience &&
                              `(${userPosition.experience.toUpperCase()})`}
                          </Select.Option>
                        ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Địa chỉ"}>
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
              <Form.Item label={"Onsite"}>
                <Controller
                  control={control}
                  name={"user.onsite"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"Onsite"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Location"}>
                <Controller
                  control={control}
                  name={"user.location"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Location"
                      allowClear
                      size={"middle"}
                      defaultValue={EnumUserEntityLocation.hanoi}
                    >
                      <Select.Option value={EnumUserEntityLocation.hanoi}>
                        Hà Nội
                      </Select.Option>
                      <Select.Option value={EnumUserEntityLocation.hcm}>
                        Hồ Chí Minh
                      </Select.Option>
                      <Select.Option value={EnumUserEntityLocation.danang}>
                        Đà Nẵng
                      </Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Trạng thái"}>
                <Controller
                  control={control}
                  name={"user.status"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Trạng thái"
                      allowClear
                      size={"middle"}
                      defaultValue={EnumUserEntityStatus.active}
                    >
                      <Select.Option value={EnumUserEntityStatus.inactive}>
                        Không hoạt động
                      </Select.Option>
                      <Select.Option value={EnumUserEntityStatus.active}>
                        Hoạt động
                      </Select.Option>
                      <Select.Option value={EnumUserEntityStatus.waiting}>
                        Chờ onboard
                      </Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Phân quyền"}>
                <Controller
                  control={control}
                  name={`user.roleId`}
                  render={({ field }) => (
                    <Select {...field} placeholder="Phân quyền">
                      {roles.map(role => (
                        <Select.Option value={role.id} key={`role-${role.id}`}>
                          {role.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Bảo mật 2 lớp"} className={"m-0"}>
                <Controller
                  control={control}
                  name={"user.isTwoFactorAuthenticationEnabled"}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={checked}
                      onChange={onChangeSwitch}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Ghi chú"}>
                <Controller
                  control={control}
                  name={"user.note"}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      rows={3}
                      placeholder={"Ghi chú"}
                      showCount
                      maxLength={100}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <FooterBar
            right={
              <>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleSubmit(onSubmit)}
                  >
                    {String(router?.query?.id) != "create" ? "Cập nhật" : "Lưu"}
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => router.push("/admin/user")}
                  >
                    Hủy bỏ
                  </Button>
                </Space>
              </>
            }
          />
        </Card>
      </Form>
    </Content>
  );
};
export default UserDetail;
