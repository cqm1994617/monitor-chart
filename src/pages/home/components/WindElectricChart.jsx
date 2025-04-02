import React, { useState, useEffect } from 'react'
import Chart from '@/components/Chart'
import styled from 'styled-components'
import { randomInRange } from '@/utils/index'

const Container = styled.div`
    border: 1px solid #3486da;
    box-sizing: border-box;
    padding: 20px;
    background-color: #031d52;
    margin-bottom: 20px;
    h1 {
        font-size: 24px;
    }
`

const Wrapper = styled.div`
    display: flex;
`

const StatusPanel = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 0 30px 0;
`

const StatuItem = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 18px;
`

const getOption = (data) => {
    const option = {
        xAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisLabel: {
                color: '#eee',
                fontWeight: 'bold' // 加粗标签
            }
        },
        yAxis: {
            min: 0,
            max: 25,
            type: 'value',
            name: '电流 (A)',
            axisLine: { show: false },
            splitLine: {
                lineStyle: { color: '#999' } // 淡化网格线
            },
            axisLabel: {
                color: '#eee'
            },
            nameTextStyle: {
                color: '#eee'
            }
        },
        series: [{
            type: 'bar',
            data,
            itemStyle: {
                color: (item) => {
                    if (item.data.value < item.data.min) {
                        return '#fac858'
                    }
                    if (item.data.value > item.data.max) {
                        return '#ff4d4f'
                    }
                    return '#2cde85'
                }, // 动态颜色
                borderRadius: [5, 5, 0, 0],  // 顶部圆角
                shadowBlur: 10,              // 立体阴影
                shadowColor: 'rgba(0,0,0,0.3)'
            },
            label: {  // 柱顶标签
                show: true,
                position: 'top',
                formatter: ({ value }) => `${value}A`, // 显示数值+状态
                color: '#fff',  // 白色文字
                fontWeight: 'bold'
            },
            barWidth: '40%',  // 柱子宽度
            animationDelay: (idx) => idx * 200  // 顺序动画
        }],
        grid: {  // 图表边距
            top: 50,
            bottom: 30,
            containLabel: true
        }
    };

    return option
}

const getMachine1 = () => randomInRange(
    [
        { min: 5, max: 8, weight: 5 },
        { min: 8, max: 10, weight: 90 },
        { min: 10, max: 16, weight: 5 },
    ]
)

const getMachine2 = () => randomInRange(
    [
        { min: 5, max: 10, weight: 5 },
        { min: 10, max: 15, weight: 90 },
        { min: 15, max: 23, weight: 5 },
    ]
)

const initialMachine1 = getMachine1()
const initialMachine2 = getMachine2()

export default () => {
    const [statuList, setStatuList] = useState([
        { name: '1号下风机', min: 8, max: 10, statu: initialMachine1 >= 8 && initialMachine1 <= 10 ? '正常' : '异常', value: initialMachine1 },
        { name: '2号上风机', min: 10, max: 15, statu: initialMachine2 >= 10 && initialMachine2 <= 15 ? '正常' : '异常', value: initialMachine2 },
        { name: '3号上风机', statu: '未开启', value: 0 }
    ]);
    const [option, setOption] = useState(getOption(statuList));

    useEffect(() => {
        const timer = setInterval(() => {
            const machine1 = getMachine1()
            const machine2 = getMachine2()
            setStatuList([
                { name: '1号下风机', min: 8, max: 10, statu: machine1 >= 8 && machine1 <= 10 ? '正常' : '异常', value: machine1 },
                { name: '2号上风机', min: 10, max: 15, statu: machine2 >= 10 && machine2 <= 15 ? '正常' : '异常', value: machine2 },
                { name: '3号上风机', statu: '未开启', value: 0 }
            ])
        }, 2000);

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        setOption(getOption(statuList))
    }, [statuList])

    return (
        <Container>
            <h1>风机状态</h1>
            <Wrapper>
                <Chart option={option} />
                <StatusPanel>
                    {
                        statuList.map((item, index) => (
                            <StatuItem key={index}>
                                <span style={{ color: item.statu === '正常' || item.statu === '未开启' ? '#2cde85' : '#ff4d4f' }}>
                                    {item.name}：{item.statu}
                                </span>
                            </StatuItem>
                        ))
                    }
                </StatusPanel>
            </Wrapper>
        </Container>
    )
}