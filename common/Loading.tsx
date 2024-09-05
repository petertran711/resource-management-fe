import React from 'react'
import { Spin } from 'antd'

const Loading = (): JSX.Element => {
  return <Spin tip="Đang tải..." className={"text-sub-title"} />
}
export default Loading
