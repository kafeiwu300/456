import { Timeline, List, Typography } from "antd";
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

  const [dateActivities, setDateActivities] = useState<
    { date: number; activities: IActivity[] }[]
  >([]);

  useEffect(() => {
    getActivities(projectId, {}, {}).then(res => {
      const activities: IActivity[] = res.body.content;
      const dates = activities.reduce(
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
      );
      setDateActivities(
        dates.reduce(
          (d: { date: number; activities: IActivity[] }[], date: number) => [
            ...d,
            {
              date,
              activities: activities.filter((activity: IActivity) =>
                moment(activity.createTime).isSame(moment(date), "d")
              )
            }
          ],
          []
        )
      );
    });
  }, [dateActivities, projectId]);

  return <Log dateActivities={dateActivities} />;
};

export default L;
