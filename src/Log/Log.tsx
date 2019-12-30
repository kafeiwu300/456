import { Timeline, List, Typography, Button } from "antd";
import React, { useEffect, useState } from "react";
import useRouter from "use-react-router";
import { getActivities } from "../agent/activityAgent";
import { IActivity } from "./interfaces";
import moment from "moment";

const Log: React.FC<{
  dateActivities: { date: number; activities: IActivity[] }[];
}> = ({ dateActivities }) => {
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
                      (activity.action === "CREATE"
                        ? "创建"
                        : activity.action === "MODIFY"
                        ? "修改"
                        : "删除") +
                      " " +
                      activity.foreignType +
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
