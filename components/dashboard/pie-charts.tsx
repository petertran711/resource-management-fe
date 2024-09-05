import React, { Component } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.label}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {value}
      </text>
      {/*<text*/}
      {/*  x={ex + (cos >= 0 ? 1 : -1) * 12}*/}
      {/*  y={ey}*/}
      {/*  dy={18}*/}
      {/*  textAnchor={textAnchor}*/}
      {/*  fill="#999"*/}
      {/*>*/}
      {/*  {`(Rate ${(percent * 100).toFixed(2)}%)`}*/}
      {/*</text>*/}
    </g>
  );
};
const data01 = [
  { label: "1991", value: 3 },
  { label: "1992", value: 4 },
  { label: "1993", value: 3.5 },
  { label: "1994", value: 5 },
  { label: "1995", value: 4.9 },
  { label: "1996", value: 6 },
  { label: "1997", value: 7 },
  { label: "1998", value: 9 },
  { label: "1999", value: 13 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
class CustomActiveShapePieChart extends Component {
  public state = { activeIndex: 0 };
  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height={255}>
        <PieChart>
          <Pie
            dataKey="value"
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={this.onPieEnter}
            data={data01}
            innerRadius={60}
            outerRadius={80}
            fill="#4299E1"
            paddingAngle={5}
          >
            {data01.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default CustomActiveShapePieChart;
