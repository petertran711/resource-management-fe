import {
  ArrowUpOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Avatar,
  BackTop,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  Spin
} from "antd";
import Sidebar from "../../../components/layout/AdminLayout/Sidebar";
import { withAuth } from "../../../hooks";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  authState,
  loadingState,
  sidebarCollapsedState
} from "../../../recoil/Atoms";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig } from "axios";
import { serviceOptions } from "../../../services/serviceOptions";
import { stringify } from "qs";

const { Header, Content, Footer } = Layout;
const Index: React.FC = ({ children }: any) => {
  const user = useRecoilValue(authState);
  const isLoading = useRecoilValue(loadingState);
  const router = useRouter();
  const { token } = parseCookies(null);
  const [sidebarCollapsed, setsidebarCollapsed] = useRecoilState(
    sidebarCollapsedState
  );

  const handleCollapse = () => {
    setCookie(null, "isSidebarCollapsed", sidebarCollapsed ? "1" : "0");
    setsidebarCollapsed(!sidebarCollapsed);
  };

  const style: React.CSSProperties = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: 4,
    backgroundColor: "#1088e9",
    color: "#fff",
    textAlign: "center",
    fontSize: 14
  };

  if (token) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/",
      timeout: 60000 // 1 phút
    };
    axiosConfig.headers = {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*"
    };
    axiosConfig.paramsSerializer = {
      serialize: params => stringify(params, { arrayFormat: "repeat" })
    };
    serviceOptions.axios = axios.create(axiosConfig);
  }

  return (
    <Spin spinning={isLoading} tip="Đang tải...">
      <Layout className={"antd-pro-layout"} style={{ height: "100vh" }}>
        <Sidebar />
        <Layout
          style={{
            marginLeft: sidebarCollapsed ? 80 : 200,
            transition: "all 0.2s"
          }}
        >
          <Header className="header">
            <Row
              justify="space-between"
              style={{
                boxShadow: "0 1px 4px rgb(0 21 41 / 8%)",
                padding: "0 28px"
              }}
            >
              <Col>
                {React.createElement(
                  sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: handleCollapse
                  }
                )}
              </Col>
              <Col>
                <Space
                  direction="horizontal"
                  size={[24, 12]}
                  wrap
                  style={{ cursor: "pointer" }}
                >
                  <Dropdown
                    trigger={["click"]}
                    arrow={{ pointAtCenter: true }}
                    overlay={
                      <Menu>
                        <Menu.Item key="setting:1">
                          <a
                            href={"#"}
                            onClick={() => {
                              router.push("/admin/profile");
                            }}
                          >
                            <UserOutlined /> Tài khoản
                          </a>
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                          <a
                            href={"#"}
                            onClick={() => {
                              destroyCookie(null, "token", {
                                path: "/"
                              });
                              window.location.href = "/login";
                            }}
                          >
                            <LogoutOutlined /> Đăng xuất
                          </a>
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottomRight"
                  >
                    <span>
                      <Space>
                        <Avatar size="default" icon={<UserOutlined />} />
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </span>
                  </Dropdown>
                </Space>
              </Col>
            </Row>
          </Header>
          <Content>
            <div className="site-layout-background">{children}</div>
          </Content>
          <Footer style={{ textAlign: "center" }}>DU19 ©2022</Footer>
        </Layout>
        <BackTop visibilityHeight={500}>
          <div style={style}>
            <ArrowUpOutlined />
          </div>
        </BackTop>
      </Layout>
    </Spin>
  );
};

export default withAuth(Index);
