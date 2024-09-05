import React, { FC, useEffect, useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import FooterBar from "../../../../components/layout/AdminLayout/FooterBar";
import { alertError, modifyEntity } from "../../../../utils";
import Content from "../../../../components/layout/AdminLayout/Content";
import { RoleEntity, RolesService } from "../../../../services";

interface Inputs {
  role: RoleEntity;
}

const schema = yup.object().shape({
  role: yup.object().shape({
    name: yup.string().required("Chưa nhập tên nhóm")
  })
});
const Detail: FC = () => {
  const [title, setTitle] = useState("Thêm mới Nhóm quyền");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (Number(router?.query?.id)) {
      setTitle("Cập nhật Nhóm quyền");
      RolesService.getOneBase({
        id: Number(router?.query?.id)
      })
        .then(response => {
          setValue("role", response);
        })
        .catch(e => alertError(e));
    }
  }, [router]);

  const onSubmit: SubmitHandler<Inputs> = data => {
    modifyEntity(RolesService, data.role, title, response => {
      return router.push(`/admin/settings/role/${response.id}`);
    }).then();
  };

  return (
    <Content title={title} onBack={() => router.push("/admin/settings/role")}>
      <Form
        onFinish={handleSubmit(onSubmit)}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Card>
          <Form.Item
            label={<span>Tên Nhóm</span>}
            required={true}
            validateStatus={errors.role?.name && "error"}
            help={errors.role?.name && errors.role?.name?.message}
          >
            <Controller
              control={control}
              name={"role.name"}
              render={({ field }) => (
                <Input {...field} size="middle" placeholder="Tên Nhóm" />
              )}
            />
          </Form.Item>
        </Card>
        <FooterBar
          right={
            <Button htmlType={"submit"} type={"primary"}>
              Lưu
            </Button>
          }
        />
      </Form>
    </Content>
  );
};
export default Detail;
