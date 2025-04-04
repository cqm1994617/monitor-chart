import React, { useState, useEffect } from 'react'
import Chart from '@/components/Chart'
import styled from 'styled-components'
import { randomInRange } from '@/utils/index'

const Container = styled.div`
    border: 1px solid #3486da;
    box-sizing: border-box;
    padding: 1vw;
    background-color: #031d52;
    margin-bottom: 1vw;
    h1 {
        font-size: 1.1vw;
    }
`

const ChartList = styled.div`
    display: flex;
`

const getOption = ({ title, data }) => {
    const option = {
        title: {
            text: title,
            bottom: '5%',
            left: 'center',
            textStyle: {
                color: '#1bb4f9',
                fontSize: '0.8rem',
            }
        },
        series: [
            {
                min: data.min,
                max: data.max,
                splitNumber: 10,
                type: 'gauge',
                axisLine: {
                    lineStyle: {
                        width: 7,
                        color: [
                            [data.range[0] / data.max, '#FAC858'],
                            [data.range[1] / data.max, '#91cc75'],
                            [1, '#fd666d']
                        ]
                    }
                },
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    distance: 0,
                    lineStyle: {
                        color: 'auto',
                        width: 1
                    }
                },
                axisTick: {
                    distance: 0,
                    lineStyle: {
                        color: 'auto',
                        width: 1
                    }
                },
                axisLabel: {
                    color: 'inherit',
                    distance: -42,
                    fontSize: 12,
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} Pa',
                    color: 'inherit',
                    fontSize: '1rem',
                },
                data: [
                    {
                        value: data.value
                    }
                ]
            }
        ]
    };

    return option;
}

const getUpPressure = () => randomInRange(
    [
        { min: 3000, max: 7000, weight: 5 },
        { min: 7000, max: 8000, weight: 90 },
        { min: 8000, max: 12000, weight: 5 },
    ],
    0
)

const getDownPressure = () => randomInRange(
    [
        { min: 3000, max: 5000, weight: 5 },
        { min: 5000, max: 5800, weight: 90 },
        { min: 5800, max: 9000, weight: 5 },
    ],
    0
)

export default () => {
    const [option, setOption] = useState(getOption({
        title: '上气箱压力',
        data: {
            min: 0,
            max: 12000,
            range: [7000, 8000],
            value: getUpPressure(),
        }
    }));
    const [option2, setOption2] = useState(getOption({
        title: '下气箱压力',
        data: {
            min: 0,
            max: 10000,
            range: [5000, 5800],
            value: getDownPressure(),
        }
    }));

    useEffect(() => {
        const timer = setInterval(() => {
            setOption(getOption({
                title: '上气箱压力',
                data: {
                    min: 0,
                    max: 12000,
                    range: [7000, 8000],
                    value: getUpPressure(),
                }

            }))
            setOption2(getOption({
                title: '下气箱压力',
                data: {
                    min: 0,
                    max: 10000,
                    range: [5000, 5800],
                    value: getDownPressure(),
                }
            }))
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, [])
    return (
        <Container>
            <h1>气箱压力</h1>
            <ChartList>
                <Chart option={option} height='14vw' />
                <Chart option={option2} height='14vw' />
            </ChartList>
        </Container>
    )
}