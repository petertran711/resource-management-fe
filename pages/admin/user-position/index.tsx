import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { countDataTable } from "../../../recoil/Atoms";
import {
  EnumUserPositionEntityExperience,
  UserPositionEntity,
  UsersPositionService
} from "../../../services";
import { ColumnsType } from "antd/es/table";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ServiceParams } from "../../../utils/interfaces";
import {
  alertError,
  filterOption,
  formatDate,
  modifyEntity
} from "../../../utils";
import { endOfDay, startOfDay } from "date-fns";
import Content from "../../../components/layout/AdminLayout/Content";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space
} from "antd";
import DatePicker from "../../../common/DatePicker";
import DataTable from "../../../common/DataTable";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined
} from "@ant-design/icons";

interface Inputs {
  name?: string;
  date?: [Date, Date];
  dto: UserPositionEntity;
}

const schema = yup.object().shape({
  dto: yup.object().shape({
    name: yup.string().required("Chưa nhập Tên Vị trí")
  })
});

const Index: FC = () => {
  const countDatatable = useRecoilValue(countDataTable);
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: ""
    }
  });
  const [tableServiceParams, setTableServiceParams] = useState<ServiceParams>({
    // filter: ["role||ne||admin"],
    sort: ["createdAt,DESC"]
    // join: ["userLevel", "userWallet", "userWallet.wallet"]
  });
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [title, setTitle] = useState<string>("Thêm Vị trí");
  const [positionId, setPositionId] = useState<number>(0);

  useEffect(() => {
    if (positionId && positionId > 0) {
      UsersPositionService.getOneBase({
        id: Number(positionId)
      })
        .then(response => {
          setTitle("Cập nhật Vị trí");
          setValue("dto", response);
        })
        .catch(e => {
          alertError(e);
        });
    }
  }, [positionId]);

  const columns: ColumnsType<UserPositionEntity> = [
    {
      dataIndex: "id",
      title: "STT",
      render: (value, record, index) => {
        return <div>{index + 1}.</div>;
      }
    },
    {
      dataIndex: "name",
      title: "Tên vị trí"
    },
    {
      dataIndex: "experience",
      title: "Kinh nghiệm",
      render: value => value?.toUpperCase()
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
    if (data?.name) filter.push(`name||$contL||${data?.name}`);

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

  const onSubmitModal: SubmitHandler<Inputs> = data => {
    modifyEntity(UsersPositionService, data.dto, title, () => {
      onReset();
      setPositionId(0);
      return setIsDetailVisible(false);
    }).then();
  };

  const onReset = () => {
    setTableServiceParams({
      sort: ["createdAt,DESC"]
    });
  };

  return (
    <Content
      title={"Vị trí"}
      buttons={[
        {
          text: "Thêm mới",
          type: "primary",
          icon: <PlusOutlined />,
          onClick: () => {
            reset();
            setTitle("Thêm vị trí");
            return setIsDetailVisible(true);
          }
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
                    <Input {...field} placeholder={"Tên vị trí"} />
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
          title={<span className={"text-2xl"}>{countDatatable} Vị trí</span>}
        >
          <DataTable
            rowKey={"id"}
            service={UsersPositionService.getManyBase}
            serviceParams={tableServiceParams}
            deleteService={UsersPositionService.deleteOneBase}
            columns={columns}
            action={[
              {
                type: "edit",
                onClick: record => {
                  setPositionId(record.id);
                  reset();
                  return setIsDetailVisible(true);
                }
              },
              {
                type: "delete"
              }
            ]}
            path={"/admin/user-position"}
          />
        </Card>
      </Card>
      <Modal
        title={title}
        open={isDetailVisible}
        footer={null}
        onCancel={() => {
          setPositionId(0);
          setIsDetailVisible(false);
        }}
        destroyOnClose={true}
      >
        <Form layout={"vertical"} onFinish={handleSubmit(onSubmitModal)}>
          <Row gutter={[32, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Tên Vị trí"}
                required
                validateStatus={errors.dto?.name && "error"}
                help={errors.dto?.name && errors.dto?.name?.message}
              >
                <Controller
                  control={control}
                  name={"dto.name"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"Tên Vị trí"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Kinh nghiệm"}>
                <Controller
                  control={control}
                  name={"dto.experience"}
                  render={({ field }) => (
                    <Select
                      size={"middle"}
                      filterOption={filterOption}
                      {...field}
                      placeholder="Chọn Kinh nghiệm"
                      defaultValue={EnumUserPositionEntityExperience.se01}
                    >
                      <Select.Option
                        value={EnumUserPositionEntityExperience.se01}
                      >
                        SE01
                      </Select.Option>
                      <Select.Option
                        value={EnumUserPositionEntityExperience.se02}
                      >
                        SE02
                      </Select.Option>
                      <Select.Option
                        value={EnumUserPositionEntityExperience.se03}
                      >
                        SE03
                      </Select.Option>
                      <Select.Option
                        value={EnumUserPositionEntityExperience.se04}
                      >
                        SE04
                      </Select.Option>
                      <Select.Option
                        value={EnumUserPositionEntityExperience.se05}
                      >
                        SE05
                      </Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <div className={"text-right"}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSubmit(onSubmitModal)}
            >
              Xác nhận
            </Button>
          </div>
        </Form>
      </Modal>
    </Content>
  );
};
export default Index;
