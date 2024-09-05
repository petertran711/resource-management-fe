import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { sidebarCollapsedState } from "../../../recoil/Atoms";
interface Props {
  left?: JSX.Element;
  right?: JSX.Element;
}

const FooterBar: FC<Props> = ({ left, right }) => {
  const sidebarCollapsed = useRecoilValue(sidebarCollapsedState);
  return (
    <div
      className={"ant-pro-footer-bar"}
      style={{
        width: `calc(100% - ${sidebarCollapsed ? "500px" : "200px"})`
      }}
    >
      <div className={"ant-pro-footer-bar-left"}>{left}</div>
      <div className={"ant-pro-footer-bar-right"}>{right}</div>
    </div>
  );
};
export default FooterBar;
