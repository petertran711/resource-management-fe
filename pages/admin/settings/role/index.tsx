import React, { FC, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Card } from "antd";
import Content from "../../../../components/layout/AdminLayout/Content";
import { ServiceParams } from "../../../../utils/interfaces";
import DataTable from "../../../../common/DataTable";
import { RoleEntity, RolesService } from "../../../../services";

const Index: FC = () => {
  const [tableServiceParams] = useState<ServiceParams>({
    sort: ["createdAt,DESC"]
  });

  const columns: ColumnsType<RoleEntity> = [
    {
      dataIndex: "name",
      title: "Tên"
    }
  ];
  return (
    <Content
      title={"Quản lý Nhóm quyền"}
      endButtons={[
        {
          text: "Thêm mới",
          href: "/admin/settings/role/create",
          type: "primary",
          visible: true
        }
      ]}
    >
      <Card>
        <DataTable
          rowKey={"id"}
          service={RolesService.getManyBase}
          serviceParams={tableServiceParams}
          columns={columns}
          action={["edit"]}
          path={"/admin/settings/role"}
        />
      </Card>
    </Content>
  );
};
export default Index;
