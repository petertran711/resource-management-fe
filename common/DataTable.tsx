import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  PaginationProps,
  Popconfirm,
  Space,
  Table,
  Tooltip
} from "antd";
import { ColumnsType, ColumnType, TableProps } from "antd/es/table";
import { TablePaginationConfig } from "antd/lib/table/interface";
import {
  CheckOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { alertError, alertSuccess, formatCurrency, formatDate } from "../utils";
import { useSetRecoilState } from "recoil";
import { countDataTable } from "../recoil/Atoms";
import ExcelJS from "exceljs";
import { format } from "date-fns";
import NextLink from "next/link";
import { EnumUserEntityStatus } from "../services";

interface ActionProps<T> extends ColumnType<T> {
  buttons?: string[] | Record<string, unknown>[];
}

interface Props<T> extends TableProps<T> {
  service?: (params?: Record<string, unknown>) => Promise<any>;
  deleteService?: any;
  serviceParams?: {
    filter?: string[] | Record<string, unknown>;
    sort?: string[];
    join?: string[];
  };
  columns: ColumnsType<T>;
  expandableColumns?: ColumnsType<T>;
  options?: TableProps<T>;
  sort?: {
    [key: string]: "asc" | "desc" | "none";
  };
  action?: ActionProps<T> | string[] | Record<string, unknown>[];
  loadDataOnMount?: boolean;
  cardTitle?: string;
  fileName?: string;
  downloadable?: boolean;
  path?: string;
  selectable?: boolean;
  sumKey?: string;
}

const DataTable: NextPage<Props<any>> = props => {
  const {
    service,
    serviceParams,
    action,
    columns,
    cardTitle,
    downloadable,
    path,
    fileName,
    sumKey
  } = props;
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tableColumns, setTableColumns] = useState<ColumnsType<any>>();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [sum, setSum] = useState(0);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
    disabled: false
  });
  const setCountDatatable = useSetRecoilState(countDataTable);
  useEffect(() => {
    // Add column actions
    if (action) {
      let tmpAction: ActionProps<any> = {};
      // Nếu là mảng các button thì thêm các giá trị mặc định
      if (Array.isArray(action)) {
        tmpAction = {
          title: "Thao tác",
          key: "operation",
          buttons: action,
          align: "center"
        };
      } else {
        tmpAction = { ...action, title: "Thao tác", align: "center" };
      }
      const actionColumn: ColumnType<any> = {
        ...tmpAction,
        render: (_, record) => {
          const handleDelete = () => {
            if (props?.deleteService)
              props
                ?.deleteService({
                  id: record.id
                })
                .then(() => {
                  return Promise.all([
                    alertSuccess(
                      `${
                        record.status === EnumUserEntityStatus.inactive
                          ? "Khôi phục"
                          : "Đã xóa"
                      } thành công`
                    ),
                    getData()
                  ]);
                })
                .catch(error => {
                  return alertError(error);
                });
            else
              return alertError(
                "Không thể xoá do cấu hình sai. Vui lòng liên hệ Admin"
              );
          };

          return (
            <Space>
              {tmpAction?.buttons &&
                tmpAction.buttons?.map((button, index: number) => {
                  if (typeof button === "object") {
                    switch (button.type) {
                      case "view":
                        return (
                          <Tooltip title={"Xem chi tiết"}>
                            <Button
                              shape={"circle"}
                              icon={<EyeOutlined />}
                              onClick={() => button.onClick(record.id)}
                            />
                          </Tooltip>
                        );
                      case "edit":
                        return (
                          <Tooltip title={"Sửa"} key={`edit_${index}`}>
                            <Button
                              shape={"circle"}
                              icon={<EditOutlined />}
                              onClick={() => button.onClick(record)}
                            />
                          </Tooltip>
                        );
                      case "delete":
                        if (record.status === EnumUserEntityStatus.inactive) {
                          return (
                            <Popconfirm
                              title={"Bạn chắc chắn muốn khôi phục mục này?"}
                              onConfirm={handleDelete}
                            >
                              <Button
                                shape={"circle"}
                                key={index}
                                icon={<CheckOutlined />}
                              />
                            </Popconfirm>
                          );
                        }
                        return (
                          <Popconfirm
                            title={"Bạn chắc chắn muốn xoá mục này?"}
                            onConfirm={handleDelete}
                          >
                            <Button
                              shape={"circle"}
                              key={index}
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        );
                      default:
                        return (
                          <Button
                            key={index}
                            onClick={() => button.onClick(record.id)}
                            title={button?.title}
                            shape={"circle"}
                            icon={button?.icon}
                          />
                        );
                    }
                  } else
                    switch (button) {
                      case "edit":
                        return (
                          <NextLink
                            key={`edit_${index}`}
                            href={`${path}/${record.id}`}
                          >
                            <Button shape={"circle"} icon={<EditOutlined />} />
                          </NextLink>
                        );
                      case "view":
                        return (
                          <Tooltip title={"Xem chi tiết"} key={`view_${index}`}>
                            <NextLink href={`${path}/view/${record.id}`}>
                              <Button shape={"circle"} icon={<EyeOutlined />} />
                            </NextLink>
                          </Tooltip>
                        );
                      case "delete":
                        if (record.status === EnumUserEntityStatus.inactive) {
                          return (
                            <Popconfirm
                              title={"Bạn chắc chắn muốn khôi phục mục này?"}
                              onConfirm={handleDelete}
                            >
                              <Button
                                shape={"circle"}
                                key={index}
                                icon={<CheckOutlined />}
                              />
                            </Popconfirm>
                          );
                        }
                        return (
                          <Popconfirm
                            title={"Bạn chắc chắn muốn xoá mục này?"}
                            onConfirm={handleDelete}
                          >
                            <Button
                              shape={"circle"}
                              key={index}
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        );
                    }
                })}
            </Space>
          );
        }
      };
      columns.push(actionColumn);
    }
    setTableColumns(columns);
  });

  useEffect(() => {
    if (serviceParams) {
      if (!Array.isArray(serviceParams.filter)) {
        const filters: string[] = [];
        serviceParams?.filter &&
          Object.keys(serviceParams.filter).map(key => {
            const filter = serviceParams.filter?.[key];
            if (Array.isArray(filter)) {
              if (filter.length > 0) {
                if (["createdAt", "updatedAt"].includes(key))
                  filters.push(`${key}||between||${filter.join(",")}`);
                else filters.push(`${key}||in||${filter.join(",")}`);
              }
            } else if (filter && filter !== "") {
              const matchCont = String(filter).match(
                new RegExp("\\/(\\w+)\\/")
              );
              if (matchCont) {
                filters.push(`${key}||$contL||${matchCont[1]}`);
              } else {
                filters.push(`${key}||eq||${filter}`);
              }
            }
          });
        serviceParams.filter = filters;
      }
      getData(serviceParams).then();
    }
  }, [serviceParams]);

  const getData = (props?: any) => {
    setIsLoading(true);

    if (!props) {
      props = {
        page: pagination.current,
        limit: pagination.pageSize
      };
    }

    const params: any = { ...props };

    return (
      service &&
      service({ ...serviceParams, ...params })
        .then((response: any) => {
          setIsLoading(false);
          setData(response.data);
          if (sumKey) setSum(response?.[sumKey] || 0);
          setPagination({
            total: response.total,
            current: response.page,
            pageSize: pagination.pageSize,
            disabled: response.pageCount === 1
          });
          setCountDatatable(response.total);
        })
        .catch(e => alertError(e.message))
    );
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    return getData({
      page: pagination.current,
      limit: pagination.pageSize
    });
  };

  const onDownload = () => {
    setIsDownloading(true);
    service &&
      service({ ...serviceParams, limit: 0 })
        .then((response: any) => {
          if (response.data.length > 0 && tableColumns) {
            setIsDownloading(false);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Sheet 1");
            let filename = `${fileName || cardTitle} - ${format(
              new Date(),
              "d_m_Y_h_i_s"
            )}`;
            const headerRows = ["STT"];
            tableColumns.map(column => {
              if (column.key !== "operation")
                headerRows.push(column.title as string);
            });
            worksheet.addRow(headerRows);

            response.data.map((data: any, index: number) => {
              const row = [index + 1];
              tableColumns.map(column => {
                // @ts-ignore
                if (column.key !== "operation" && column?.dataIndex) {
                  if (column.render) {
                    row.push(
                      // @ts-ignore
                      column.render(data?.[column.dataIndex], data, index)
                    );
                  } else {
                    // @ts-ignore
                    row.push(data?.[column?.dataIndex]);
                  }
                }
              });
              worksheet.addRow(row);
            });
            workbook.xlsx.writeBuffer().then(xls64 => {
              const a = document.createElement("a");
              const data = new Blob([xls64], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              });

              const url = URL.createObjectURL(data);
              a.href = url;
              a.download = `${filename} - ${formatDate(new Date())}`;
              document.body.appendChild(a);
              a.click();
              setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
              }, 0);
            });
          } else {
            alertError("Không có dữ liệu! Không thể tải");
          }
        })
        .catch(e => {
          setIsDownloading(false);
          alertError(e);
        });
  };
  return (
    <>
      {downloadable ? (
        <Card
          title={cardTitle || ""}
          extra={
            <Tooltip title={"Tải về"}>
              <Button
                type={"primary"}
                onClick={onDownload}
                loading={isDownloading}
              >
                <DownloadOutlined />
              </Button>
            </Tooltip>
          }
        >
          <Table
            dataSource={data}
            loading={isLoading}
            pagination={{
              ...pagination,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${Intl.NumberFormat(
                  "vi-VN"
                ).format(total)}`
            }}
            onChange={handleTableChange}
            scroll={{ x: 1000 }}
            size={"small"}
            {...props}
            columns={tableColumns}
          />
        </Card>
      ) : (
        <>
          <Table
            bordered
            rowKey={"id"}
            dataSource={data}
            loading={isLoading}
            pagination={pagination}
            onChange={handleTableChange}
            scroll={{ x: 1000 }}
            {...props}
            columns={tableColumns}
            size={"small"}
            summary={() =>
              sumKey && (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>Tổng</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={10}>
                    <strong>{formatCurrency(sum)}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )
            }
          />
        </>
      )}
    </>
  );
};

export default DataTable;
