import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload
} from "antd";
import Content from "../../../components/layout/AdminLayout/Content";
import React, { FC, useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form";
import { useRouter } from "next/router";
import {
  CdnService,
  EnumProjectEntityStatus,
  EnumProjectEntityTypeProject,
  ProjectEntity,
  ProjectsService,
  SkillEntity,
  SkillService,
  UserEntity,
  UserPositionEntity,
  UsersPositionService,
  UsersService
} from "../../../services";
import {
  alertError,
  alertSuccess,
  filterOption,
  MAX_FILE_SIZE,
  modifyEntity
} from "../../../utils";
import DatePicker from "../../../common/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextArea from "antd/lib/input/TextArea";
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined
} from "@ant-design/icons";
import FooterBar from "../../../components/layout/AdminLayout/FooterBar";

interface Inputs {
  project: ProjectEntity;
}

const schema = yup.object().shape({
  project: yup.object().shape({
    name: yup.string().required("Chưa nhập Tên dự án"),
    startDate: yup.date().required("Chưa chọn Ngày bắt đầu")
  })
});

const ProjectDetail: FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("Thêm dự án");
  const [usersPositions, setUsersPositions] = useState<UserPositionEntity[]>(
    []
  );
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [skills, setSkills] = useState<SkillEntity[]>([]);

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
      setTitle("Cập nhật dự án");
      ProjectsService.getOneBase({
        id: Number(router?.query?.id)
      })
        .then(projectResponse => {
          setValue("project", projectResponse);
          setValue("project.startDate", new Date(projectResponse.startDate));
          setValue(
            "project.endDate",
            projectResponse.endDate
              ? new Date(projectResponse.endDate)
              : undefined
          );
          setValue("project.member", projectResponse?.member);
          projectResponse?.member?.forEach((item, index) => {
            if (item.joinDate)
              setValue(
                `project.member.${index}.joinDate`,
                new Date(item.joinDate)
              );
            if (item.stopDate)
              setValue(
                `project.member.${index}.stopDate`,
                new Date(item.stopDate)
              );
          });
        })
        .catch(e => alertError(e));
    }
  }, [router]);

  useEffect(() => {
    Promise.all([
      UsersPositionService.getManyBase(),
      UsersService.getManyBase({ limit: 100 }),
      SkillService.getManyBase()
    ])
      .then(([userPositionResponse, userResponse, skillResponse]) => {
        setUsersPositions(userPositionResponse.data);
        setUsers(userResponse.data);
        setSkills(skillResponse.data);
      })
      .catch(e => alertError(e));
  }, []);

  const {
    fields: memberFields,
    append: memberAppend,
    remove: memberRemove
  } = useFieldArray({
    control,
    name: "project.member"
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    let countMember = 0;
    if (data.project.member.length > 0) {
      data.project.member.map((item, index) => {
        if (!item.userId) {
          alertError(`Vui lòng chọn Tên thành viên ở index thứ ${index + 1}`);
          countMember++;
        } else if (!item.joinDate) {
          alertError(`Vui lòng chọn Ngày tham gia ở index thứ ${index + 1}`);
          countMember++;
        }
      });
    }
    if (countMember > 0) return;
    modifyEntity(ProjectsService, data.project, title, () => {
      return router.push(`/admin/project`);
    }).then();
  };

  const handleChange = (info: any) => {
    if (info.file.status !== "removed") {
      if (info && info.file.size > MAX_FILE_SIZE) {
        return alertError(
          "The chosen file exceeds the maximum file size 8 MB. Please check and try again."
        );
      }
      if (info.file.type.indexOf("csv") > -1) {
        CdnService.cdnControllerUploadFile({
          file: info.file
        })
          .then(() => {
            alertSuccess("Upload thành công");
            setTimeout(() => {
              router.push("/admin/project");
            }, 1000);
          })
          .catch(e => {
            alertError(e);
          });
      } else {
        alertError(
          info.fileList?.[0].response?.data?.status?.message ||
            "Tệp bạn đã chọn không hợp lệ. Các loại tệp hợp lệ là .csv"
        );
      }
    }
  };

  return (
    <Content title={title} onBack={() => router.push("/admin/project")}>
      <Form layout={"vertical"} onFinish={handleSubmit(onSubmit)}>
        <Card
          title={"Dự án"}
          extra={
            <Upload
              onChange={handleChange}
              maxCount={1}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />} type="primary">
                Click to Upload
              </Button>
            </Upload>
          }
        >
          <Row gutter={[32, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Tên dự án"}
                required
                validateStatus={errors.project?.name && "error"}
                help={errors.project?.name && errors.project?.name?.message}
              >
                <Controller
                  control={control}
                  name={"project.name"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"Tên dự án"} />
                  )}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label={"Ngày bắt đầu"}
                required
                validateStatus={errors.project?.startDate && "error"}
                help={
                  errors.project?.startDate &&
                  errors.project?.startDate?.message
                }
              >
                <Controller
                  control={control}
                  name={"project.startDate"}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      allowClear
                      placeholder="Ngày bắt đầu"
                      className="w-full"
                      format={"dd/MM/yyyy"}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"Ngày kết thúc"}
                validateStatus={errors.project?.endDate && "error"}
                help={
                  errors.project?.endDate && errors.project?.endDate?.message
                }
              >
                <Controller
                  control={control}
                  name={"project.endDate"}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      allowClear
                      placeholder="Ngày kết thúc"
                      className="w-full"
                      format={"dd/MM/yyyy"}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={"PIC"}
                validateStatus={errors.project?.pic && "error"}
                help={errors.project?.pic && errors.project?.pic?.message}
              >
                <Controller
                  control={control}
                  name={"project.pic"}
                  render={({ field }) => (
                    <Input {...field} placeholder={"PIC"} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Loại dự án"}>
                <Controller
                  control={control}
                  name={"project.typeProject"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Loại dự án"
                      allowClear
                      size={"middle"}
                      defaultValue={EnumProjectEntityTypeProject.gdc}
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
            <Col xs={24} md={12}>
              <Form.Item label={"Trạng thái"}>
                <Controller
                  control={control}
                  name={"project.status"}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Trạng thái"
                      allowClear
                      size={"middle"}
                      defaultValue={EnumProjectEntityStatus.pool}
                    >
                      <Select.Option value={EnumProjectEntityStatus.complete}>
                        Hoàn thành
                      </Select.Option>
                      <Select.Option value={EnumProjectEntityStatus.inProgress}>
                        Đang triển khai
                      </Select.Option>
                      <Select.Option value={EnumProjectEntityStatus.pool}>
                        Đang chờ
                      </Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={"Ghi chú"}>
                <Controller
                  control={control}
                  name={"project.note"}
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
        </Card>
        <Card>
          {memberFields &&
            memberFields?.map((memberField, memberIndex) => (
              <>
                <Divider orientation="left" orientationMargin="0" plain>
                  <span className={"text-base font-semibold"}>
                    Thành viên #{memberIndex + 1}
                  </span>
                </Divider>
                <Row key={memberField.id} gutter={[32, 0]}>
                  <Col xs={24} md={12}>
                    <Form.Item label={"Tên"} required>
                      <Controller
                        control={control}
                        name={`project.member.${memberIndex}.userId`}
                        render={({ field }) => (
                          <Select
                            filterOption={filterOption}
                            showSearch
                            allowClear
                            {...field}
                            placeholder="Vui lòng chọn Tên thành viên"
                          >
                            {users &&
                              users.map(user => (
                                <Select.Option
                                  value={user.id}
                                  key={`project.member-${user.id}`}
                                >
                                  {user.name}
                                </Select.Option>
                              ))}
                          </Select>
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label={"Ngày tham gia"} required>
                      <Controller
                        control={control}
                        name={`project.member.${memberIndex}.joinDate`}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            allowClear
                            placeholder="Ngày tham gia"
                            className="w-full"
                            format={"dd/MM/yyyy"}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label={"Ngày ngừng tham gia"}>
                      <Controller
                        control={control}
                        name={`project.member.${memberIndex}.stopDate`}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            allowClear
                            placeholder="Ngày ngừng tham gia"
                            className="w-full"
                            format={"dd/MM/yyyy"}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label={"Vị trí"}>
                      <Controller
                        control={control}
                        name={`project.member.${memberIndex}.userPositionId`}
                        render={({ field }) => (
                          <Select
                            size={"middle"}
                            allowClear
                            showSearch
                            {...field}
                            placeholder="Chọn Vị trí"
                          >
                            {usersPositions &&
                              usersPositions?.map(position => (
                                <Select.Option
                                  key={position.id}
                                  value={position.id}
                                >
                                  {position.name}
                                  {position.experience &&
                                    `(${position.experience.toUpperCase()})`}
                                </Select.Option>
                              ))}
                          </Select>
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label={"Skill"}>
                      <Controller
                        control={control}
                        name={`project.member.${memberIndex}.skillId`}
                        render={({ field }) => (
                          <Select
                            size={"middle"}
                            mode={"multiple"}
                            filterOption={filterOption}
                            allowClear
                            showSearch
                            {...field}
                            placeholder="Chọn kỹ năng"
                          >
                            {skills &&
                              skills?.map(skill => (
                                <Select.Option key={skill.id} value={skill.id}>
                                  {skill.name}
                                </Select.Option>
                              ))}
                          </Select>
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={2}>
                    <Form.Item>
                      <Button
                        className={"w-full"}
                        onClick={() => memberRemove(memberIndex)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => memberAppend({})}
              className={"w-full"}
            >
              <PlusOutlined /> Thêm thành viên
            </Button>
          </Form.Item>
        </Card>
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
                  onClick={() => router.push("/admin/project")}
                >
                  Hủy bỏ
                </Button>
              </Space>
            </>
          }
        />
      </Form>
    </Content>
  );
};
export default ProjectDetail;
