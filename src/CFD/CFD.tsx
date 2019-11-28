import React from 'react';
import { Chart, Tooltip, View, Axis, Geom } from 'bizcharts';

const CFD: React.FC = () => {
  const scale = {
    date: {alias: 'date'},
    point: {alias: 'point', min: 0, max: 20},
  };

  const cfdData = [
    {
      backlog: 1,
      developing: 0,
      finished: 0
    },
    {
      backlog: 2,
      developing: 1,
      finished: 0
    },
    {
      backlog: 3,
      developing: 2,
      finished: 1
    },
    {
      backlog: 5,
      developing: 3,
      finished: 2
    },
    {
      backlog: 8,
      developing: 5,
      finished: 3
    },
    {
      backlog: 13,
      developing: 8,
      finished: 5
    }
  ]

  return (
    <Chart height={400} scale={scale} forceFit>
      <Tooltip crosshairs={{ type: 'rect' }} />
      <View data={cfdData.map((date: {
        backlog: number;
        developing: number;
        finished: number;
      }, index: number) => ({date: index, point: date.backlog}))}>
        <Axis title name="date" />
        <Axis title name="point" />
        <Geom type="line" position="date*point"/>  
      </View>
      <View data={cfdData.map((date: {
        backlog: number;
        developing: number;
        finished: number;
      }, index: number) => ({date: index, point: date.developing}))}>
        <Axis title name="date" />
        <Axis title name="point" />
        <Geom type="line" position="date*point"/>
      </View>
      <View data={cfdData.map((date: {
        backlog: number;
        developing: number;
        finished: number;
      }, index: number) => ({date: index, point: date.finished}))}>
        <Axis title name="date" />
        <Axis title name="point" />
        <Geom type="line" position="date*point"/>  
      </View>
    </Chart>
  );
}

export default CFD;