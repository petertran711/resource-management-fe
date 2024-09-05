import { FC, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import {
  ProjectEntity,
  ProjectsService,
  UserEntity
} from "../../../../services";
import { Drawer, Table } from "antd";
import { alertError, formatDate } from "../../../../utils";

interface IProps {
  id: number;
  cardTitle?: string;
  isVisible?: boolean;
  handle: () => void;
}

const TableAndModalProject: FC<IProps> = props => {
  const [dataSource, setDataSource] = useState<UserEntity[]>([]);
  useEffect(() => {
    props.id &&
      ProjectsService.projectControllerCustomData({
        id: props.id
      })
        .then(response => {
          setDataSource(response);
        })
        .catch(e => {
          alertError(e);
        });
  }, [props.id]);

  const closeModal = () => {
    props.handle();
  };

  const columns: ColumnsType<ProjectEntity> = [
    {
      title: "Tên thành viên",
      dataIndex: "name"
    },
    {
      title: "Vị trí/Skill",
      colSpan: 2,
      // @ts-ignore
      render: (value, record) => <div>{record?.userPosition?.name}</div>
    },
    {
      title: "Skill",
      dataIndex: "skill",
      colSpan: 0,
      render: value => value
    },
    {
      title: "Ngày tham gia",
      dataIndex: "joinDate",
      render: value => <div>{value ? formatDate(value) : ""}</div>
    },
    {
      title: "Ngày ngừng tham gia",
      dataIndex: "stopDate",
      render: value => <div>{value ? formatDate(value) : ""}</div>
    }
  ];

  return (
    <Drawer
      title={<div className={"font-semibold text-base"}>{props.cardTitle}</div>}
      open={props.isVisible}
      onClose={closeModal}
      closable={false}
      destroyOnClose={true}
      width={1000}
      footer={false}
      placement={"right"}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
      />
    </Drawer>
  );
};
export default TableAndModalProject;
