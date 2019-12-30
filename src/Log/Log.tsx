import { Timeline, List, Typography, Button } from "antd";
import React, { useEffect, useState } from "react";
import useRouter from "use-react-router";
import { getActivities } from "../agent/activityAgent";
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

const L: React.FC = () => {
  const { match } = useRouter<{
    projectId: string;
  }>();
  const { projectId } = match.params;

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLast, setIsLast] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const getDateActivities = () => {
    const dates = activities
      .reduce(
        (d: number[], activity: IActivity) =>
          d.includes(
            moment(activity.createTime)
              .startOf("d")
              .valueOf()
          )
            ? d
            : [
                moment(activity.createTime)
                  .startOf("d")
                  .valueOf(),
                ...d
              ],
        []
      )
      .sort((a: number, b: number) => b - a);
    return dates.map((date: number) => ({
      date,
      activities: activities.filter((activity: IActivity) =>
        moment(activity.createTime).isSame(moment(date), "d")
      )
    }));
  };

  useEffect(() => {
    setPage(0);
  }, [projectId]);

  useEffect(() => {
    getActivities(projectId, { page }, {}).then(res => {
      setIsLast(res.body.last);
      setActivities(activities => [...activities, ...res.body.content]);
    });
  }, [page, projectId]);

  return (
    <>
      <Log dateActivities={getDateActivities()} />
      {activities.length === 0 ? (
        <></>
      ) : isLast ? (
        "没有更多内容了"
      ) : (
        <Button onClick={() => setPage(page + 1)}>loading more</Button>
      )}
    </>
  );
};

export default L;
