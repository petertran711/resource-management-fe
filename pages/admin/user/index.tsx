import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { authState, countDataTable } from "../../../recoil/Atoms";
import { UserEntity, UsersService } from "../../../services";
import { ColumnsType } from "antd/es/table";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ServiceParams } from "../../../utils/interfaces";
import { formatDate, getStatusUser, hasPermission } from "../../../utils";
import { endOfDay, startOfDay } from "date-fns";
import Content from "../../../components/layout/AdminLayout/Content";
import { Button, Card, Col, Form, Input, Row, Space, Tag } from "antd";
import DatePicker from "../../../common/DatePicker";
import DataTable from "../../../common/DataTable";
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from "@ant-design/icons";

interface Inputs {
  name?: string;
  date?: [Date, Date];
}

const Index: FC = () => {
  const router = useRouter();
  const countDatatable = useRecoilValue(countDataTable);
  const user = useRecoilValue(authState);
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: ""
    }
  });
  const [tableServiceParams, setTableServiceParams] = useState<ServiceParams>({
    filter: ["roleId||ne||1"],
    sort: ["createdAt,DESC"]
  });

  const columns: ColumnsType<UserEntity> = [
    {
      dataIndex: "id",
      title: "STT",
      render: (value, record, index) => {
        return <div>{index + 1}.</div>;
      }
    },
    {
      dataIndex: "name",
      title: "Họ Tên"
    },
    {
      dataIndex: "tel",
      title: "Điện thoại",
      align: "right"
    },
    {
      dataIndex: "email",
      title: "Email"
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      align: "center",
      render: value => {
        switch (value) {
          case "inactive":
            return <Tag color="red">{getStatusUser(value)}</Tag>;
          case "active":
            return <Tag color="green">{getStatusUser(value)}</Tag>;
          case "waiting":
            return <Tag color="blue">{getStatusUser(value)}</Tag>;
        }
      }
    },
    {
      dataIndex: "createdAt",
      title: "Ngày tạo",
      align: "center",
      render: value => formatDate(value)
    },
    {
      dataIndex: "updatedAt",
      title: "Ngày cập nhật",
      align: "center",
      render: value => formatDate(value)
    }
  ];

  const onSubmit: SubmitHandler<Inputs> = data => {
    const filter = [];
    const or = [];
    if (data?.name)
      filter.push(`name||$contL||${data?.name}`) &&
        or.push(`tel||$contL||${data?.name}`);

    Object.keys(data).map(key => {
      if (data?.[key]) {
        if (key === "date") {
          if (data?.date) {
            filter.push(
              `createdAt||between||${startOfDay(
                data?.date[0]
              ).toISOString()},${endOfDay(data?.date[1]).toISOString()}`
            );
          }
        }
      }
    });
    setTableServiceParams(prevState => ({
      ...prevState,
      filter: filter,
      or: or
    }));
  };

  const onReset = () => {
    setTableServiceParams({
      sort: ["createdAt,DESC"]
    });
  };

  return (
    <Content
      title={"Thành viên"}
      buttons={[
        {
          text: "Thêm mới",
          href: "/admin/user/create",
          type: "primary",
          icon: <PlusOutlined />
        }
      ]}
    >
      <Card>
        <Form
          autoComplete={"off"}
          onFinish={handleSubmit(onSubmit)}
          onReset={onReset}
          layout={"vertical"}
        >
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <Form.Item label={"Tìm kiếm"}>
                <Controller
                  control={control}
                  name={"name"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"Số điện thoại, Tên"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} xl={6} lg={6}>
              <Form.Item label={"Từ ngày"}>
                <Controller
                  control={control}
                  name={"date"}
                  render={({ field }) => (
                    <DatePicker.RangePicker
                      placeholder={["Bắt đầu", "Kết thúc"]}
                      format={"d/MM/y"}
                      {...field}
                      style={{
                        width: "100%"
                      }}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <Form.Item label>
                <Space>
                  <Button htmlType={"reset"} icon={<ReloadOutlined />}>
                    Đặt lại
                  </Button>
                  <Button
                    type={"primary"}
                    htmlType={"submit"}
                    icon={<SearchOutlined />}
                  >
                    Tìm kiếm
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card>
        <Card
          bordered={false}
          title={
            <span className={"text-2xl"}>{countDatatable} Thành viên</span>
          }
        >
          <DataTable
            rowKey={"id"}
            service={UsersService.getManyBase}
            serviceParams={tableServiceParams}
            deleteService={UsersService.deleteOneBase}
            columns={columns}
            action={[
              hasPermission(user, ["users_updateOneBase"]) && {
                type: "edit",
                onClick: record => {
                  return router.push(`/admin/user/${record.id}`);
                }
              },
              {
                type: "delete"
              }
            ]}
            path={"/admin/user"}
          />
        </Card>
      </Card>
    </Content>
  );
};
export default Index;
