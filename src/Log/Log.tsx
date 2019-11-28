import { Timeline } from "antd"
import React from "react"
import data from "./store"

const Log: React.FC<{logs: string[]}> = ({logs}) => {
  return (
    <Timeline>
      {
        logs.map((log: string) => <Timeline.Item style={{color: 'white'}}>{log}</Timeline.Item>)
      }
    </Timeline>
  )
}

const L: React.FC = () => {
  return <Log logs={data}/>;
}

export default L;