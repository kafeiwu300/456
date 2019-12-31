import React from "react";
import { Chart, Axis, Tooltip, Geom, View } from 'bizcharts';
import { IIterationInfo } from "../components/StoryMap/interfaces";
import moment from "moment";

const BurnDown: React.FC<{ iteration: IIterationInfo }> = ({ iteration }) => {
  const data = [
    { date: moment('2019-11-18', 'YYYY-MM-DD').valueOf(), point: 33 },
    { date: moment('2019-11-19', 'YYYY-MM-DD').valueOf(), point: 33 },
    { date: moment('2019-11-20', 'YYYY-MM-DD').valueOf(), point: 28 },
    { date: moment('2019-11-21', 'YYYY-MM-DD').valueOf(), point: 24 },
    { date: moment('2019-11-22', 'YYYY-MM-DD').valueOf(), point: 19 },
    { date: moment('2019-11-23', 'YYYY-MM-DD').valueOf(), point: 15 },
    { date: moment('2019-11-24', 'YYYY-MM-DD').valueOf(), point: 10 },
    { date: moment('2019-11-25', 'YYYY-MM-DD').valueOf(), point: 3 },
  ];

  const calcPlan = (start: number, end: number) => {
    const length = moment(end).diff(moment(start), 'd');
    const total = data[0].point;

    const result = [];
    for (let m = moment(data[0].date).isBefore(moment(start), 'd') ? moment(data[0].date) : moment(start); m.isSameOrBefore(end, 'd'); m.add(1, 'd')) {
      const date = {
        date: moment(m)
      };
      
      result.push(date);
    }
    console.log(result);

    // console.log(moment(start).format('YYYY-MM-DD'), moment(data[0].date).format('YYYY-MM-DD'));
    return data.map(({ date, point }, index: number) => ({
      date,
      point,
      planPoint: moment(date).isBefore(moment(start), 'd') ? total : (moment(date).isAfter(moment(end), 'd') ? 0 : total * (length - index + 1) / length)
    }));
  };

  const scale = {
    date: { alias: '日期', type: 'time' },
    point: { alias: '实际剩余工作量', min: 0 },
    planPoint: { alias: '计划剩余工作量', min: 0 },
  };

  return (
    <Chart height={400} scale={scale} forceFit>
      <Tooltip crosshairs={{ type: 'rect' }} />
      <View data={data}>
        <Axis name="date" />
        <Axis name="point" />
        <Geom type="line" position="date*point" />
      </View>
      <View data={calcPlan(iteration.startTime!, iteration.endTime!)}>
        <Axis name="planPoint" />
        <Geom type="line" style={{
          lineDash: [4, 4],
        }} color='#54cb72' position="date*planPoint" />
      </View>
    </Chart>
  );
}

export default BurnDown;