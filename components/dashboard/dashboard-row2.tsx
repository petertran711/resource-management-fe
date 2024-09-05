import { Card, Col, Input, Row } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import React from "react";
import CustomActiveShapePieChart from "./pie-charts";
import DatePicker from "../../common/DatePicker";
import vi_VN from "antd/lib/locale/vi_VN";
import { Controller, useForm } from "react-hook-form";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

interface Inputs {
  tmpDates?: Date[];
}
const DashboardRow2 = () => {
  const { control } = useForm<Inputs>({
    defaultValues: {
      tmpDates: [
        startOfMonth(subMonths(new Date(), 11)),
        endOfMonth(new Date())
      ]
    }
  });
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 }
  ];

  return (
    <>
      <div style={{ textAlign: "right" }} className={"mb-4"}>
        <Controller
          control={control}
          name={"tmpDates"}
          render={({ field }) => (
            <Input.Group compact className={"text-right"}>
              <DatePicker
                inputReadOnly
                picker="year"
                {...field}
                locale={vi_VN}
              />
            </Input.Group>
          )}
        />
      </div>
      <Row gutter={[32, 16]}>
        <Col xs={24} lg={12} md={12} xl={16}>
          <Card title="Statistics">
            <div className="recharts-area-item">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={data}
                  syncId="year"
                  margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#F04F47"
                        stopOpacity="0.7"
                      ></stop>
                      <stop
                        offset="95%"
                        stopColor="#F04F47"
                        stopOpacity="0"
                      ></stop>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    interval="preserveStartEnd"
                    axisLine={false}
                  />
                  {/*<YAxis />*/}
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    dataKey="value"
                    type="monotone"
                    stroke="red"
                    fillOpacity={2}
                    fill="url(#colorUv)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12} md={12} xl={8}>
          <Card>
            <CustomActiveShapePieChart />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardRow2;
