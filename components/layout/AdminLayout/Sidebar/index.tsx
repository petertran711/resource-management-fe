import {
  ApartmentOutlined,
  DashboardFilled,
  FundProjectionScreenOutlined,
  ShareAltOutlined,
  StarOutlined,
  ToolOutlined,
  UserOutlined
} from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import Menu from "antd/lib/menu";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { FC, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState, sidebarCollapsedState } from "../../../../recoil/Atoms";
import { _findInTree, hasPermission } from "../../../../utils";
import NextLink from "next/link";

export interface SidebarItem {
  title: string;
  icon?: JSX.Element;
  visible?: boolean;
  path?: string;
  key?: string;
  children?: SidebarItem[];
  permissions?: string[];
}

const Sidebar: FC = () => {
  const router = useRouter();
  const user = useRecoilValue(authState);
  const { isSidebarCollapsed } = parseCookies(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(
    sidebarCollapsedState
  );
  const [openKeys, setOpenKeys] = useState<string[] | undefined>([]);
  const routes: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: <DashboardFilled />,
      path: "/admin",
      visible: true
    },
    {
      title: "Nhân viên",
      icon: <UserOutlined />,
      path: "/admin/user",
      visible: hasPermission(user, [
        "users_getOneBase",
        "users_updateOneBase",
        "users_deleteOneBase",
        "users_getManyBase",
        "users_createOneBase"
      ])
    },
    {
      title: "Dự án",
      icon: <FundProjectionScreenOutlined />,
      path: "/admin/project",
      visible: hasPermission(user, [
        "projects_getOneBase",
        "projects_updateOneBase",
        "projects_deleteOneBase",
        "projects_getManyBase",
        "projects_createOneBase"
      ])
    },
    {
      title: "Cấu hình",
      icon: <ToolOutlined />,
      key: "Cấu hình",
      children: [
        {
          title: "Vị trí",
          icon: <ShareAltOutlined />,
          path: "/admin/user-position",
          visible: hasPermission(user, [
            "users-position_getOneBase",
            "users-position_updateOneBase",
            "users-position_deleteOneBase",
            "users-position_getManyBase",
            "users-position_createOneBase"
          ])
        },
        {
          title: "Skill",
          icon: <StarOutlined />,
          path: "/admin/skill",
          visible: hasPermission(user, [
            "skill_getOneBase",
            "skill_updateOneBase",
            "skill_deleteOneBase",
            "skill_getManyBase",
            "skill_createOneBase"
          ])
        },
        {
          title: "Quyền",
          icon: <ApartmentOutlined />,
          key: "/admin/settings/role/root",
          visible: hasPermission(user, []),
          children: [
            {
              title: "Nhóm quyền",
              path: "/admin/settings/role",
              visible: hasPermission(user, [])
            },
            {
              title: "Phân quyền",
              path: "/admin/settings/role/permission",
              visible: hasPermission(user, [])
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    routes.map(route => {
      const tmpOpenKeys = _findInTree(route, router.asPath);
      if (tmpOpenKeys) {
        setOpenKeys(tmpOpenKeys);
      }
    });
  }, [router.asPath]);

  useEffect(() => {
    setSidebarCollapsed(
      isSidebarCollapsed === undefined ? false : isSidebarCollapsed !== "1"
    );
  }, [isSidebarCollapsed]);

  const submenuChild = (obj: SidebarItem) => {
    obj?.permissions?.map(permission => {
      if (user?.permissions?.includes(permission)) obj.visible = true;
    });
    if (user?.roleId == 1) obj.visible = true;
    if (obj.children && obj.children.length > 0) {
      const cHtml = obj.children.map(item => {
        return submenuChild(item);
      });
      return (
        obj.visible && (
          <Menu.SubMenu
            key={obj.path || obj.key}
            title={obj.title}
            icon={obj.icon}
          >
            {cHtml}
          </Menu.SubMenu>
        )
      );
    } else {
      return (
        obj.visible && (
          <Menu.Item key={obj.path || obj.key} icon={obj.icon}>
            <NextLink href={obj?.path || "#"}>{obj.title}</NextLink>
          </Menu.Item>
        )
      );
    }
  };

  const menu = routes.map(obj => {
    obj?.permissions?.map(permission => {
      if (user?.permissions?.includes(permission)) obj.visible = true;
    });
    if (user?.roleId == 1) obj.visible = true;
    if (obj.children && obj.children.length > 0) {
      return submenuChild(obj);
    } else {
      return (
        obj.visible && (
          <Menu.Item key={obj.path || obj.key} icon={obj.icon}>
            <NextLink href={obj?.path || "#"}>{obj.title}</NextLink>
          </Menu.Item>
        )
      );
    }
  });
  const handleOpenChangeMenu = (openKeys: React.Key[]) => {
    setOpenKeys(openKeys as string[]);
  };

  return (
    <>
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsible
        collapsed={sidebarCollapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
      >
        <NextLink
          href={{
            pathname: "/admin"
          }}
        >
          <div className="slider-logo block m-3 text-center">
            <img
              src="/images/logo.47273eea.png"
              alt="Logo"
              width={80}
              className={"mx-auto"}
            />
          </div>
        </NextLink>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[router.asPath]}
          openKeys={openKeys}
          onOpenChange={handleOpenChangeMenu}
        >
          <div className="gx-sidebar-notifications">
            <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
              <span>
                <span className="ant-avatar ant-avatar-circle ant-avatar-image gx-size-40 gx-pointer mr-2">
                  <img src="https://source.unsplash.com/random" alt="" />
                </span>
                <span className="gx-avatar-name">
                  {user?.fullName}
                  <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2"></i>
                </span>
              </span>
            </div>
            <ul className="gx-app-nav">
              <li>
                <i className="icon icon-search-new"></i>
              </li>
              <li>
                <i className="icon icon-notification"></i>
              </li>
              <li>
                <i className="icon icon-chat-new"></i>
              </li>
            </ul>
          </div>
          {menu}
        </Menu>
      </Sider>
    </>
  );
};
export default Sidebar;
