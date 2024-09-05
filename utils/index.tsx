import { notification } from "antd";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
import { OptionData, OptionGroupData } from "rc-select/lib/interface";
import {
  EnumProjectEntityStatus,
  EnumProjectEntityTypeProject,
  EnumUserEntityStatus
} from "../services";
import { Auth } from "../recoil/Atoms";

export const alertError = (error: any) => {
  if (typeof error?.response?.data?.message === "object") {
    const messages =
      error?.response?.data?.message?.message || error?.response?.data?.message;
    return notification.error({
      placement: "topRight",
      message: (
        <>
          {messages?.map((errorMsg, index) => (
            <div
              key={`success-msg-${index}`}
              dangerouslySetInnerHTML={{ __html: errorMsg }}
            />
          ))}
        </>
      )
    });
  }
  return notification.error({
    placement: "topRight",
    message: (
      <div
        dangerouslySetInnerHTML={{
          __html: error?.response?.data?.message || error?.message || error
        }}
      />
    )
  });
};

export const _findInTree = (route, path): string[] => {
  // If current node name matches the search name, return
  // empty array which is the beginning of our parent result
  if ([route.path, route.key].includes(path)) {
    return [route.path || route.key];
  }

  // Otherwise, if this node has a tree field/value, recursively
  // process the nodes in this tree array
  if (Array.isArray(route.children)) {
    for (const children of route.children) {
      // Recursively process treeNode. If an array result is
      // returned, then add the treeNode.name to that result
      // and return recursively
      const childResult = _findInTree(children, path);
      if (Array.isArray(childResult)) {
        return [route.path || route.key].concat(childResult);
      }
    }
  }
};

export const formatDate = (date?: number | Date): string => {
  if (!date) date = new Date();
  date = new Date(date);
  return format(date, "dd/MM/Y HH:mm:ss", { locale: viLocale });
};

export const removeVietnamese = value => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

export const filterOption = (
  input: string,
  option: OptionData | OptionGroupData | undefined
) => {
  const inputValue = removeVietnamese(input),
    optionValue =
      typeof option?.children === "string" ? option?.children : option?.title;

  return removeVietnamese(optionValue).indexOf(inputValue) >= 0;
};

export const alertSuccess = (message: string) => {
  return notification.success({
    placement: "topRight",
    message: (
      <div
        dangerouslySetInnerHTML={{
          __html: message
        }}
      />
    )
  });
};

export const formatCurrency = (value: number): string => {
  if (isNaN(value)) value = 0;
  return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(value);
};

export const modifyEntity = (
  service,
  data,
  title = "",
  onSucess: (response) => void
) => {
  return new Promise<any>(resolve => {
    if (Number(data.id))
      return resolve(
        service.updateOneBase({
          id: data.id,
          body: data
        })
      );
    else
      return resolve(
        service.createOneBase({
          body: data
        })
      );
  })
    .then(response => {
      alertSuccess(`${title ? title : ""} thành công`);
      onSucess(response);
    })
    .catch(error => {
      alertError(error);
      return null;
    });
};

export const hasPermission = (user: Auth, permissions: string[]): boolean => {
  if (user.roleId === 1) return true;
  let hasPermission = false;
  permissions?.map(permission => {
    if (user?.permissions?.includes(permission)) hasPermission = true;
  });
  return hasPermission;
};

export const getStatusUser = (status: string): string => {
  switch (status) {
    case EnumUserEntityStatus.waiting:
      return "Chờ onboard";
    case EnumUserEntityStatus.active:
      return "Hoạt động";
    case EnumUserEntityStatus.inactive:
      return "Đã xóa";
    default:
      return "";
  }
};
export const getTypeProject = (status: string): string => {
  switch (status) {
    case EnumProjectEntityTypeProject.nonGDC:
      return "Non-GDC";
    case EnumProjectEntityTypeProject.gdc:
      return "GDC";
    default:
      return "";
  }
};
export const getStatusProject = (status: string): string => {
  switch (status) {
    case EnumProjectEntityStatus.pool:
      return "Đang chờ";
    case EnumProjectEntityStatus.complete:
      return "Hoàn thành";
    case EnumProjectEntityStatus.inProgress:
      return "Đang triển khai";
    default:
      return "";
  }
};
export const MAX_FILE_SIZE = 8000000; // 8MB

export const getRouteName = route => {
  switch (route) {
    case "users":
      return "Thành viên";
    case "projects":
      return "Dự án";
    case "skill":
      return "Kỹ năng";
    case "users-position":
      return "Vị trí";
    case "dashboard":
      return "Tổng quan";
    default:
      return "";
  }
};
