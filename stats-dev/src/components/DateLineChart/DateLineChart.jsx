import React from 'react';
import Tilt from 'react-tilt';
import { GradientPinkBlue, GradientOrangeRed } from '@vx/gradient';
import { ParentSize } from '@vx/responsive';
import { LinePath } from '@vx/shape';
import { scaleLinear, scaleTime } from '@vx/scale';
import { curveCatmullRom } from '@vx/curve';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Text } from '@vx/text';
import { extent, max } from 'd3-array';

const axisColor = '#FFFFFF';//'#282c34';
const graphBackgroundColor = '#32deaa';
const leftInset = 75;
const rightInset = 50;
const bottomInset = 60;
const topInset = 70;

const xAccessor = (d) => d.x
const yAccessor = (d) => d.y

function DateLineChart({ height, width, data, title, yLabel }) {
  return (
    <div className="DateLineChart" style={{ height: height, minWidth: '300px', flexBasis: '0px', margin: '15px', flexGrow: 1, flexShrink: 1 }}>
      <Tilt className="Tilt" options={{ max : 5, scale: 1.05 }} style={{width: '100%', height: '100%'}}>
        <ParentSize className="graph-container">
          {({ width, height }) => {
            // bounds
            const xMax = width - rightInset;
            const xMin = leftInset;
            const yMax = height - bottomInset;
            const yMin = topInset;

            // scales
            const xScale = scaleTime({
              range: [xMin, xMax],
              domain: extent(data, xAccessor)
            });
            const yScale = scaleLinear({
              range: [yMax, yMin],
              domain: [0, max(data, yAccessor)]
            });
            return (
              <svg width={width} height={height}>
                <GradientOrangeRed id="Background" vertical={true} />
                <GradientPinkBlue id="Title" vertical={false} />
                <rect x={0} y={0} width={width} height={height} rx={10} fill={graphBackgroundColor} />
                <Text style={{ fontFamily: 'Arial', fontWeight: 600, fontSize: '22px' }} fill={'#FFFFFF'} verticalAnchor="start" textAnchor="middle" x={width / 2} y={20} width={width === 0 ? 1 : width}>{title}</Text>
                <LinePath
                  data={data}
                  x={d => xScale(xAccessor(d))}
                  y={d => yScale(yAccessor(d))}
                  stroke={axisColor}
                  strokeWidth={2}
                  curve={curveCatmullRom}
                />
                <Group>
                  <AxisLeft
                    left={leftInset}
                    scale={yScale}
                    label={yLabel}
                    labelProps={{
                      fill: axisColor,
                      textAnchor: 'middle',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                    numTicks={5}
                    stroke={axisColor}
                    tickStroke={axisColor}
                    tickLabelProps={(value, index) => ({
                      fill: axisColor,
                      textAnchor: 'end',
                      fontSize: 12,
                      fontWeight: 600,
                      dx: '-0.25em',
                      dy: '0.25em'
                    })}
                  />
                  <AxisBottom
                    top={height - bottomInset}
                    scale={xScale}
                    label="Date"
                    labelProps={{
                      fill: axisColor,
                      textAnchor: 'middle',
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                    stroke={axisColor}
                    tickStroke={axisColor}
                    numTicks={5}
                    tickLabelProps={(value, index) => ({
                      fill: axisColor,
                      textAnchor: 'middle',
                      fontSize: 8,
                      fontWeight: 600,
                      dy: '0.25em'
                    })}
                  />
                </Group>
              </svg>
            );
          }}
        </ParentSize>
      </Tilt>
    </div>
  );
}

export default DateLineChart;
