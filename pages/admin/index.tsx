import React, { FC } from "react";
import Content from "../../components/layout/AdminLayout/Content";
import DashboardRow1 from "../../components/dashboard/dashboard-row1";
import DashboardRow2 from "../../components/dashboard/dashboard-row2";

const Index: FC = () => {
  return (
    <>
      <Content title={`Dashboard`}>
        <DashboardRow1 />
        <DashboardRow2 />
      </Content>
    </>
  );
};
export default Index;
