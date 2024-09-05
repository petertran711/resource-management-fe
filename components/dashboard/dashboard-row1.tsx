import { Card, Col, Input, Row } from "antd";
import vi_VN from "antd/lib/locale/vi_VN";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import DatePicker from "../../common/DatePicker";
import ChartDashboardRow1 from "./chart-dashboardrow1";
import { DashboardService } from "../../services";
interface Inputs {
  tmpDates?: Date;
}

interface IData {
  totalProcessProject?: number;
  totalProject?: number;
  totalUserPool?: number;
}
const DashboardRow1 = () => {
  const { control } = useForm<Inputs>({
    defaultValues: {
      tmpDates: new Date()
    }
  });

  const [data, setData] = useState<IData>();
  const watchTmpDates: string = useWatch({
    control,
    name: "tmpDates"
  });

  useEffect(() => {
    const period = watchTmpDates;
    Promise.all([
      DashboardService.dashboardControllerByMonth({ month: period })
    ]).then(([response]) => {
      setData(response);
    });
  }, [watchTmpDates]);

  return (
    <Row gutter={[32, 16]}>
      <Col xs={24} lg={12} md={12} xl={10}>
        <h2 className={"text-base mb-4 font-semibold uppercase"}>
          Total Revenue
        </h2>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12} md={12} xl={8} className="dashboard-column1">
              <div style={{ padding: "20px 0px 0px 25px" }}>
                <div className={"mb-4"}>
                  <span className={"font-medium text-lg text-black"}>
                    $216,759
                  </span>
                  <p style={{ color: "rgb(107, 114, 128)" }}>YTD Revenue</p>
                </div>
                <div className={"flex mt-8"}>
                  <div className={"pr-5"}>
                    <h3
                      className={"text-lg"}
                      style={{
                        color: "rgb(10, 143, 220)"
                      }}
                    >
                      49
                    </h3>
                    <p style={{ color: "rgb(107, 114, 128)" }}>Clients</p>
                  </div>
                  <div className={"pl-5"}>
                    <h3
                      className={"text-lg"}
                      style={{
                        color: "rgb(73, 189, 101)"
                      }}
                    >
                      09
                    </h3>
                    <p style={{ color: "rgb(107, 114, 128)" }}>Countries</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12} md={12} xl={14}>
              <div className="recharts-responsive-container w-full">
                <svg
                  className="recharts-surface"
                  viewBox="0 0 378 200"
                  version="1.1"
                >
                  <g className="recharts-layer recharts-line">
                    <path
                      stroke="#0A8FDC"
                      strokeWidth="3"
                      fill="none"
                      points="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      width="358"
                      height="190"
                      className="recharts-curve recharts-line-curve"
                      strokeDasharray="391.9869079589844px 0px"
                      type="monotone"
                      d="M10,95C33.86666666666666,79.16666666666667,57.733333333333334,63.33333333333334,81.6,63.33333333333334C105.46666666666665,63.33333333333334,129.33333333333331,79.16666666666666,153.2,79.16666666666666C177.06666666666666,79.16666666666666,200.9333333333333,31.66666666666666,224.79999999999998,31.66666666666666C248.66666666666666,31.66666666666666,272.5333333333333,63.33333333333334,296.4,63.33333333333334C320.26666666666665,63.33333333333334,344.1333333333333,63.33333333333334,368,63.33333333333334"
                    ></path>
                  </g>
                  <g className="recharts-layer recharts-line">
                    <path
                      stroke="#49BD65"
                      strokeWidth="3"
                      fill="none"
                      points="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      width="358"
                      height="190"
                      className="recharts-curve recharts-line-curve"
                      strokeDasharray="425.4674987792969px 0px"
                      type="monotone"
                      d="M10,158.33333333333334C33.86666666666666,145.13888888888889,57.733333333333334,131.94444444444443,81.6,110.83333333333331C105.46666666666665,89.7222222222222,129.33333333333331,31.66666666666666,153.2,31.66666666666666C177.06666666666666,31.66666666666666,200.9333333333333,63.33333333333334,224.79999999999998,63.33333333333334C248.66666666666666,63.33333333333334,272.5333333333333,31.66666666666666,296.4,31.66666666666666C320.26666666666665,31.66666666666666,344.1333333333333,31.66666666666666,368,31.66666666666666"
                    ></path>
                  </g>
                </svg>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} lg={12} md={12} xl={14}>
        <Row className={"mb-2"}>
          <Col xs={24} lg={12} md={12} xl={12}>
            <span className={"text-base mb-4 font-semibold uppercase"}>
              QUICK STATISTICS
            </span>
          </Col>
          <Col xs={24} lg={12} md={12} xl={12}>
            <span style={{ float: "right" }}>
              <Controller
                control={control}
                name={"tmpDates"}
                render={({ field }) => (
                  <Input.Group compact className={"text-right"}>
                    <DatePicker
                      picker="month"
                      inputReadOnly
                      format={"MM/y"}
                      {...field}
                      locale={vi_VN}
                    />
                  </Input.Group>
                )}
              />
            </span>
          </Col>
        </Row>
        <Row gutter={[32, 16]} className={"mb-7"}>
          <Col xs={24} lg={12} md={12} xl={12} className={"dashboard-column2"}>
            <Card>
              <div className={"flex items-center"}>
                <div className={"flex w-2/4"}>
                  <div className={"mr-4"}>
                    <img src="/images/total-clients.svg" alt="icon" />
                  </div>
                  <div>
                    <h3 className={"font-medium text-lg mb-0 text-black"}>
                      {data?.totalUserPool}
                    </h3>
                    <div style={{ color: "rgb(107, 114, 128)" }}>
                      Pool Clients
                    </div>
                  </div>
                </div>
                <ChartDashboardRow1 />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12} md={12} xl={12} className={"dashboard-column2"}>
            <Card>
              <div className={"flex items-center"}>
                <div className={"flex w-2/4"}>
                  <div className={"mr-4"}>
                    <img src="/images/invoices.svg" alt="icon" />
                  </div>
                  <div>
                    <h3 className={"font-medium text-lg mb-0 text-black"}>
                      $ 10,600
                    </h3>
                    <div style={{ color: "rgb(107, 114, 128)" }}>
                      Paid Invoices
                    </div>
                  </div>
                </div>
                <div className={"items-end w-2/4 text-right flex-col flex"}>
                  <div>
                    <h5 className="text-truncate">Since last month</h5>
                    <svg
                      className="recharts-surface"
                      width="120"
                      height="50"
                      viewBox="0 0 165 70"
                      version="1.1"
                    >
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(0, 181, 156)"
                          width="4"
                          height="50"
                          x="15"
                          y="15"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 15,15 h 4 v 50 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(0, 181, 156)"
                          width="4"
                          height="30"
                          x="40.83333333333333"
                          y="35"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 40.83333333333333,35 h 4 v 30 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(0, 181, 156)"
                          width="4"
                          height="55"
                          x="66.66666666666666"
                          y="10"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 66.66666666666666,10 h 4 v 55 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(0, 181, 156)"
                          width="4"
                          height="45"
                          x="92.5"
                          y="20"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 92.5,20 h 4 v 45 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(0, 181, 156)"
                          width="4"
                          height="50"
                          x="118.33333333333333"
                          y="15"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 118.33333333333333,15 h 4 v 50 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(0, 181, 156)"
                          width="4"
                          height="25"
                          x="144.16666666666666"
                          y="40"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 144.16666666666666,40 h 4 v 25 h -4 Z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={[32, 16]}>
          <Col xs={24} lg={12} md={12} xl={12} className={"dashboard-column2"}>
            <Card>
              <div className={"flex items-center"}>
                <div className={"flex w-2/4"}>
                  <div className={"mr-4"}>
                    <img src="/images/total-projects.svg" alt="icon" />
                  </div>
                  <div>
                    <h3 className={"font-medium text-lg mb-0 text-black"}>
                      {data?.totalProject}
                    </h3>
                    <div style={{ color: "rgb(107, 114, 128)" }}>
                      Total Projects
                    </div>
                  </div>
                </div>
                <div className={"items-end w-2/4 text-right flex-col flex"}>
                  <div>
                    <h5 className="text-truncate">Since last month</h5>
                    <svg
                      className="recharts-surface"
                      width="120"
                      height="50"
                      viewBox="0 0 165 70"
                      version="1.1"
                    >
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(183, 69, 255)"
                          width="4"
                          height="50"
                          x="15"
                          y="15"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 15,15 h 4 v 50 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(183, 69, 255)"
                          width="4"
                          height="30"
                          x="40.83333333333333"
                          y="35"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 40.83333333333333,35 h 4 v 30 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(183, 69, 255)"
                          width="4"
                          height="55"
                          x="66.66666666666666"
                          y="10"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 66.66666666666666,10 h 4 v 55 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(183, 69, 255)"
                          width="4"
                          height="45"
                          x="92.5"
                          y="20"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 92.5,20 h 4 v 45 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(183, 69, 255)"
                          width="4"
                          height="50"
                          x="118.33333333333333"
                          y="15"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 118.33333333333333,15 h 4 v 50 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(183, 69, 255)"
                          width="4"
                          height="25"
                          x="144.16666666666666"
                          y="40"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 144.16666666666666,40 h 4 v 25 h -4 Z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12} md={12} xl={12} className={"dashboard-column2"}>
            <Card>
              <div className={"flex items-center"}>
                <div className={"flex w-2/4"}>
                  <div className={"mr-4"}>
                    <img src="/images/open-projects.svg" alt="icon" />
                  </div>
                  <div>
                    <h3 className={"font-medium text-lg mb-0 text-black"}>
                      {data?.totalProcessProject}
                    </h3>
                    <div style={{ color: "rgb(107, 114, 128)" }}>
                      Process Projects
                    </div>
                  </div>
                </div>
                <div className={"items-end w-2/4 text-right flex-col flex"}>
                  <div>
                    <h5 className="text-truncate">Since last month</h5>
                    <svg
                      className="recharts-surface"
                      width="120"
                      height="50"
                      viewBox="0 0 165 70"
                      version="1.1"
                    >
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(247, 117, 104)"
                          width="4"
                          height="50"
                          x="15"
                          y="15"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 15,15 h 4 v 50 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(247, 117, 104)"
                          width="4"
                          height="30"
                          x="40.83333333333333"
                          y="35"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 40.83333333333333,35 h 4 v 30 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(247, 117, 104)"
                          width="4"
                          height="55"
                          x="66.66666666666666"
                          y="10"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 66.66666666666666,10 h 4 v 55 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(247, 117, 104)"
                          width="4"
                          height="45"
                          x="92.5"
                          y="20"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 92.5,20 h 4 v 45 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(247, 117, 104)"
                          width="4"
                          height="50"
                          x="118.33333333333333"
                          y="15"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 118.33333333333333,15 h 4 v 50 h -4 Z"
                        ></path>
                      </g>
                      <g className="recharts-layer recharts-bar-rectangle">
                        <path
                          fill="rgb(247, 117, 104)"
                          width="4"
                          height="25"
                          x="144.16666666666666"
                          y="40"
                          radius="0"
                          className="recharts-rectangle"
                          d="M 144.16666666666666,40 h 4 v 25 h -4 Z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default DashboardRow1;
