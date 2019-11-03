import React from 'react';
import { GradientTealBlue } from '@vx/gradient';
import { ParentSize } from '@vx/responsive';
import { LinePath } from '@vx/shape';
import { scaleLinear, scaleTime } from '@vx/scale';
import { curveNatural } from '@vx/curve';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Text } from '@vx/text';
import { extent, max } from 'd3-array';


const data = [
  { x: new Date('2019-11-02'), y: 2 },
  { x: new Date('2019-11-03'), y: 5 },
  { x: new Date('2019-11-04'), y: 7 },
  { x: new Date('2019-11-05'), y: 4 },
  { x: new Date('2019-11-06'), y: 2 },
  { x: new Date('2019-11-07'), y: 10 },
  { x: new Date('2019-11-08'), y: 9 },
]

const axisColor = '#282c34';
const leftInset = 75;
const rightInset = 50;
const bottomInset = 60;
const topInset = 50;

const xAccessor = (d) => d.x
const yAccessor = (d) => d.y

function DateLineChart({height, width}) {
  return (
    <div className="DateLineChart" style={{height: height, width: width}}>
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
                <GradientTealBlue id="Background" vertical={false} />
                <rect x={0} y={0} width={width} height={height} rx={10} fill="url(#Background)" />
                <Text verticalAnchor="start" textAnchor="middle" x={width/2} y={10} width={width === 0 ? 1 : width}>Percent of Food Servings That Are MHealthy</Text>
                <LinePath
                  data={data}
                  x={d => xScale(xAccessor(d))}
                  y={d => yScale(yAccessor(d))}
                  stroke={'#282c34'}
                  strokeWidth={4}
                  curve={curveNatural}
                />
                <Group>
                  <AxisLeft
                    left={leftInset}
                    scale={yScale}
                    label="Items Served"
                    labelProps={{
                      fill: { axisColor },
                      textAnchor: 'middle',
                      fontSize: 12,
                    }}
                    stroke={axisColor}
                    tickStroke={axisColor}
                    tickLabelProps={(value, index) => ({
                      fill: { axisColor },
                      textAnchor: 'end',
                      fontSize: 10,
                      dx: '-0.25em',
                      dy: '0.25em'
                    })}
                  />
                  <AxisBottom
                    top={height - bottomInset}
                    scale={xScale}
                    label="Date"
                    labelProps={{
                      fill: { axisColor },
                      textAnchor: 'middle',
                      fontSize: 12,
                    }}
                    stroke={axisColor}
                    tickStroke={axisColor}
                    tickLabelProps={(value, index) => ({
                      fill: { axisColor },
                      textAnchor: 'middle',
                      fontSize: 10,
                      dy: '0.25em'
                    })}
                  />
                </Group>
              </svg>
            );
          }}
        </ParentSize>
    </div>
  );
}

export default DateLineChart;
