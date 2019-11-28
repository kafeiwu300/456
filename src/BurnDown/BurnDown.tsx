import React from "react";
import { Chart, Axis, Tooltip, Geom, View } from 'bizcharts';

const BurnDown: React.FC = () => {
  const data = [
    {date: 1, point: 30},
    {date: 2, point: 28},
    {date: 3, point: 24},
    {date: 4, point: 19},
    {date: 5, point: 15},
    {date: 6, point: 10},
    {date: 7, point: 3},
  ];
  const calcPlan = (data: {point: number}[]) => {
    const start = data[0].point;
    return data.map((d: {point: number}, index: number) => ({...d, point: start * index / (1 - data.length) + start}));
  }
  const scale = {
    date: {alias: 'date'},
    point: {alias: 'point'},
  };

  return (
    <Chart height={400} scale={scale} forceFit>
      <Tooltip crosshairs={{ type: 'rect' }} />
      <View data={data}>
        <Axis title name="date" />
        <Axis title name="point" />
        <Geom type="line" position="date*point"/>  
      </View>
      <View data={calcPlan(data)}>
        <Axis title name="date" />
        <Axis title name="point" />
        <Geom type="line" style={{
          lineDash: [4, 4]
        }} position="date*point"/>  
      </View>
    </Chart>
  );
}

export default BurnDown;