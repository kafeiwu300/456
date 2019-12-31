import {
  Timeline,
  List,
  Typography,
  Avatar
} from "antd";
import React from "react";
import { IActivity } from "./interfaces";
import moment from "moment";

const Log: React.FC<{
  dateActivities: { date: number; activities: IActivity[] }[];
}> = ({ dateActivities }) => {
  const actionType = (type: string) => {
    switch (type) {
      case "CREATE":
        return "创建";
      case "MODIFY":
        return "修改";
      case "DELETE":
        return "删除";
      default:
        return "";
    }
  };

  const objectType = (type: string) => {
    switch (type) {
      case "iteration":
        return "迭代";
      case "story":
        return "故事";
      case "task":
        return "任务";
      case "bug":
        return "缺陷";
      default:
        return "";
    }
  };

  return (
    <List
      dataSource={dateActivities}
      renderItem={({ date, activities }) => (
        <List.Item>
          <List.Item.Meta
            title={
              <Typography.Title level={4}>
                {moment(date).format("YYYY-MM-DD")}
              </Typography.Title>
            }
            description={
              <Timeline>
                {activities.map((activity: IActivity) => (
                  <Timeline.Item>
                    <Avatar shape="square">
                      {activity.createUser[activity.createUser.length - 1]}
                    </Avatar>
                    {activity.createUser +
                      " 于 " +
                      moment(activity.createTime).format("HH:mm:ss") +
                      " " +
                      actionType(activity.action) +
                      " " +
                      objectType(activity.foreignType) +
                      " " +
                      activity.foreignTitle}
                  </Timeline.Item>
                ))}
              </Timeline>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default Log;
