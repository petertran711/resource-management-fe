import { atom } from "recoil";
import { JwtPayload } from "jwt-decode";

export interface Auth extends JwtPayload {
  tel: string;
  email: string;
  fullName?: string;
  referralCode?: string;
  permissions: string[];
  roleId: number;
  type: string;
}

export const authState = atom<Auth>({
  key: "AuthState",
  default: null
});

// export const drawerVisibleState = atom<boolean>({
//   key: "DrawerVisible",
//   default: false
// });

export const loadingState = atom<boolean>({
  key: "LoadingState",
  default: false
});

export const sidebarCollapsedState = atom<boolean>({
  key: "SidebarCollapsedState",
  default: false
});
// export const leftDrawerState = atom<boolean>({
//   key: "LeftDrawerState",
//   default: false
// });
export const countDataTable = atom<number>({
  key: "CountDataTable",
  default: 0
});
