import useRouter from "use-react-router";
import { useState, useEffect } from "react";
import { IActivity } from "../../components/Log/interfaces";
import moment, { Moment } from "moment";
import { getActivities } from "../../agent/activityAgent";
import React from "react";
import { Layout, PageHeader, DatePicker, Button } from "antd";
import VisibleLog from '../../components/Log/Log';

const Log: React.FC = () => {
  const { match } = useRouter<{
    projectId: string;
  }>();
  const { projectId } = match.params;

  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLast, setIsLast] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>();
  const [endTime, setEndTime] = useState<number>();

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
    setActivities([]);
  }, [projectId, startTime, endTime]);

  useEffect(() => {
    getActivities(projectId, { page }, { from: startTime, to: endTime }).then(
      res => {
        setIsLast(res.body.last);
        setActivities(activities => [...activities, ...res.body.content]);
      }
    );
  }, [endTime, page, projectId, startTime]);

  return (
    <Layout style={{ height: "100%" }}>
      <PageHeader
        title="项目日志"
        extra={
          <>
            <DatePicker
              onChange={(date: Moment | null) =>
                date ? setStartTime(date.valueOf()) : setStartTime(undefined)
              }
              placeholder="开始日期"
            />
            <DatePicker
              onChange={(date: Moment | null) =>
                date ? setEndTime(date.clone().add(1, 'd').valueOf()) : setEndTime(undefined)
              }
              placeholder="结束日期"
            />
          </>
        }
      />
      <Layout style={{ margin: "0 24px", height: "100%", overflow: "auto" }}>
        <VisibleLog dateActivities={getDateActivities()} />
        {activities.length === 0 ? (
          <></>
        ) : isLast ? (
          "没有更多内容了"
        ) : (
          <Button onClick={() => setPage(page + 1)}>loading more</Button>
        )}
      </Layout>
    </Layout>
  );
};

export default Log;