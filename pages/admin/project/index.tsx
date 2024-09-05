import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { countDataTable } from "../../../recoil/Atoms";
import {
  EnumProjectEntityStatus,
  EnumProjectEntityTypeProject,
  ProjectEntity,
  ProjectsService
} from "../../../services";
import { ColumnsType } from "antd/es/table";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ServiceParams } from "../../../utils/interfaces";
import { formatDate, getStatusProject, getTypeProject } from "../../../utils";
import { endOfDay, startOfDay } from "date-fns";
import Content from "../../../components/layout/AdminLayout/Content";
import { Button, Card, Col, Form, Input, Row, Select, Space, Tag } from "antd";
import DatePicker from "../../../common/DatePicker";
import DataTable from "../../../common/DataTable";
import {
  BarcodeOutlined,
  DownloadOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from "@ant-design/icons";
import TableAndModalProject from "./modal";

interface Inputs {
  name?: string;
  date?: [Date, Date];
  status?: string;
  typeProject?: string;
  pic?: string;
}

const Index: FC = () => {
  const router = useRouter();
  const countDatatable = useRecoilValue(countDataTable);
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: ""
    }
  });
  const [idDetail, setIdDetail] = useState();
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [tableServiceParams, setTableServiceParams] = useState<ServiceParams>({
    // filter: ["role||ne||admin"],
    sort: ["createdAt,DESC"]
    // join: ["userLevel", "userWallet", "userWallet.wallet"]
  });

  const columns: ColumnsType<ProjectEntity> = [
    {
      dataIndex: "id",
      title: "STT",
      render: (value, record, index) => {
        return <div>{index + 1}.</div>;
      }
    },
    {
      dataIndex: "name",
      title: "Tên/ Mã dự án",
      render: (value, record) => {
        return (
          <>
            <a
              className={"txt-hover"}
              onClick={() => renderModal(record)}
              style={{ fontSize: 15 }}
            >
              {value}
            </a>
            <div>
              <BarcodeOutlined />
              <span style={{ color: "gray", fontSize: 12 }}>
                {" "}
                {record.code}
              </span>
            </div>
          </>
        );
      }
    },
    {
      dataIndex: "typeProject",
      title: "Loại dự án",
      render: value => {
        switch (value) {
          case "gdc":
            return getTypeProject(value);
          case "nonGDC":
            return getTypeProject(value);
        }
      }
    },
    {
      dataIndex: "pic",
      title: "PIC"
    },
    {
      dataIndex: "member",
      title: "Số thành viên",
      align: "right",
      render: value => {
        return value?.length;
      }
    },
    {
      dataIndex: "startDate",
      title: "Ngày bắt đầu",
      align: "center",
      render: value => (value ? formatDate(value) : "")
    },
    {
      dataIndex: "endDate",
      title: "Ngày kết thúc",
      align: "center",
      render: value => (value ? formatDate(value) : "")
    },
    {
      dataIndex: "status",
      title: "Trạng thái",
      align: "center",
      render: value => {
        switch (value) {
          case "inProgress":
            return <Tag color="yellow">{getStatusProject(value)}</Tag>;
          case "complete":
            return <Tag color="green">{getStatusProject(value)}</Tag>;
          case "pool":
            return <Tag color="blue">{getStatusProject(value)}</Tag>;
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
        or.push(`code||eq||${data?.name}`);

    if (data?.status) filter.push(`status||eq||${data?.status}`);
    if (data?.typeProject) filter.push(`typeProject||eq||${data?.typeProject}`);
    if (data?.pic) filter.push(`pic||$contL||${data?.pic}`);

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
  const renderModal = record => {
    setIdDetail(record.id);
    setIsConfirmVisible(true);
  };

  const onReset = () => {
    setTableServiceParams({
      sort: ["createdAt,DESC"]
    });
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  return (
    <Content
      title={"Dự án"}
      buttons={[
        {
          text: "Thêm mới",
          href: "/admin/project/create",
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
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item label={"Tìm kiếm"}>
                <Controller
                  control={control}
                  name={"name"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"Tên dự án, Mã dự án"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
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
            <Col xs={24} sm={24} md={24} lg={4} xl={4}>
              <Form.Item label={"Trạng thái"}>
                <Controller
                  control={control}
                  name={"status"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Trang thái"
                      allowClear
                      size={"middle"}
                    >
                      <Select.Option value={EnumProjectEntityStatus.inProgress}>
                        Đang triển khai
                      </Select.Option>
                      <Select.Option value={EnumProjectEntityStatus.pool}>
                        Đang chờ
                      </Select.Option>
                      <Select.Option value={EnumProjectEntityStatus.complete}>
                        Hoàn thành
                      </Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4} xl={4}>
              <Form.Item label={"Loại dự án"}>
                <Controller
                  control={control}
                  name={"typeProject"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Loại dự án"
                      allowClear
                      size={"middle"}
                    >
                      <Select.Option value={EnumProjectEntityTypeProject.gdc}>
                        GDC
                      </Select.Option>
                      <Select.Option
                        value={EnumProjectEntityTypeProject.nonGDC}
                      >
                        Non-GDC
                      </Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4} xl={4}>
              <Form.Item label={"PIC"}>
                <Controller
                  control={control}
                  name={"pic"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"PIC"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <Form.Item>
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
                  <Button
                    href="/template/Template.csv"
                    download
                    style={{
                      background: "#2ca72c",
                      backgroundColor: "#2ca72c",
                      color: "white"
                    }}
                    icon={<DownloadOutlined />}
                  >
                    Download
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
          title={<span className={"text-2xl"}>{countDatatable} Dự án</span>}
        >
          <DataTable
            rowKey={"id"}
            service={ProjectsService.getManyBase}
            serviceParams={tableServiceParams}
            deleteService={ProjectsService.deleteOneBase}
            columns={columns}
            action={[
              {
                type: "edit",
                onClick: record => {
                  return router.push(`/admin/project/${record.id}`);
                }
              },
              {
                type: "delete"
              }
            ]}
            path={"/admin/project"}
          />
        </Card>
      </Card>
      <TableAndModalProject
        id={idDetail}
        cardTitle={"Danh sách thành viên"}
        isVisible={isConfirmVisible}
        handle={handleCancel}
      />
    </Content>
  );
};
export default Index;
