import React from "react";

const ChartDashboardRow1 = () => {
  return (
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
              fill="rgb(10, 143, 220)"
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
              fill="rgb(10, 143, 220)"
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
              fill="rgb(10, 143, 220)"
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
              fill="rgb(10, 143, 220)"
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
              fill="rgb(10, 143, 220)"
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
              fill="rgb(10, 143, 220)"
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
  );
};
export default ChartDashboardRow1;
