import React, { FC, useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Button, Card, Checkbox, Form, Table } from "antd";
import { groupBy } from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useWindowDimensions } from "../../../../../hooks";
import { loadingState } from "../../../../../recoil/Atoms";
import Content from "../../../../../components/layout/AdminLayout/Content";
import FooterBar from "../../../../../components/layout/AdminLayout/FooterBar";
import { alertError, alertSuccess, getRouteName } from "../../../../../utils";
import { RolesService } from "../../../../../services";

interface Inputs {
  role: [];
}

const Permission: FC = () => {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const setIsLoading = useSetRecoilState(loadingState);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState<ColumnsType>([
    {
      dataIndex: "title",
      title: <div className={"font-bold text-center"}>Chức năng</div>,
      width: 300,
      fixed: "left"
    }
  ]);
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      role: []
    }
  });

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      RolesService.getManyBase({
        filter: ["id||ne||1"],
        sort: ["createdAt,DESC"]
      }),
      RolesService.roleControllerRoutes()
    ])
      .then(([roleResponse, routeResponse]) => {
        const tmpRoles = groupBy(roleResponse.data, "id");
        const tmpData = [];
        Object.keys(routeResponse).map((route, index) => {
          const title = getRouteName(route);
          if (title != "") {
            const row = {
              key: index,
              title: <span className={"font-bold"}>{getRouteName(route)}</span>,
              rowSpan: 4
            };
            tmpData.push(row);
            Object.keys(routeResponse[route]).map(routeKey => {
              const children = {
                key: `${route}_${routeKey}`,
                title: (
                  <span className={"ml-4"}>
                    {routeResponse[route][routeKey]}
                  </span>
                ),
                isChild: true
              };
              roleResponse.data.map(role => {
                children[role.id] = `${route}_${routeKey}`;
              });
              tmpData.push(children);
            });
          }
        });
        setColumns(prevState => {
          return [
            ...prevState,
            ...roleResponse.data.map(role => {
              return {
                dataIndex: role.id,
                title: role.name,
                render: (text, record) => {
                  if (record.isChild) {
                    const checked = tmpRoles[
                      role.id
                    ]?.[0]?.permissions.includes(record[2]);
                    return (
                      <Controller
                        control={control}
                        // @ts-ignore
                        name={`role[${role.id}][${record[2]}]`}
                        defaultValue={checked}
                        render={({ field }) => (
                          <Checkbox {...field} defaultChecked={checked} />
                        )}
                      />
                    );
                  }
                  return null;
                }
              };
            })
          ];
        });
        setData(tmpData);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
        alertError(e);
      });
  }, []);

  const onSubmit = data => {
    setIsLoading(true);
    const submitData = [];
    Object.keys(data.role).map(roleId => {
      const permissions = [];
      Object.keys(data.role[roleId]).map(permission => {
        if (data.role[roleId][permission]) {
          permissions.push(permission);
        }
      });
      submitData.push({
        id: Number(roleId),
        permissions
      });
    });
    RolesService.roleControllerUpdateMany({
      body: submitData
    })
      .then(() => {
        setIsLoading(false);
        alertSuccess("Cập nhật quyền thành công");
        return router.push("/admin/settings/role/permission");
      })
      .catch(error => {
        setIsLoading(false);
        alertError(error);
      });
  };

  return (
    <Content title={"Phân quyền"}>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Card>
          <Table
            scroll={{ y: height - 300, x: 1500 }}
            size={"small"}
            pagination={false}
            columns={columns}
            dataSource={data}
            expandable={{
              defaultExpandAllRows: true
            }}
          />
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
export default Permission;
