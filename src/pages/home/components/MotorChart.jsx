import React, { useState, useEffect } from 'react'
import Chart from '@/components/Chart'
import * as echarts from 'echarts'
import styled from 'styled-components'
import { randomInRange } from '@/utils/index'
import dayjs from 'dayjs';

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

const getCommonOption = (name, time) => {
    const option = {
        title: {
            text: name,
            left: 'center',
            textStyle: {
                color: '#ccc'
            },
        },
        backgroundColor: '#031d52',
        animation: false,
        grid: {
            top: '60px',
            bottom: '60px',
            left: '80px',
            right: '100px'
        },
        tooltip: { trigger: 'axis' },
        xAxis: {
            type: 'category',
            data: time,
            axisLabel: {
                interval: 15,
                color: '#fff',
                formatter: (value, index) => {
                    // 只显示中间5个标签
                    return index > 10 && index < 50 ? value : '';
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#fff' // X轴线颜色
                }
            }
        },
    }

    return option
}

const getOption = (options) => {
    const EAColor = '#FFD700';
    const frequencyColor = '#00FFAA';
    const option = {
        ...getCommonOption('电流频率监控', options.EA.map(item => item.time)),
        legend: { data: ['频率', '电流'], bottom: 0, textStyle: { color: '#fff', fontSize: 14 } },
        yAxis: [
            { // 左侧第一个轴（如频率）
                type: 'value',
                name: '频率(Hz)',
                position: 'right',
                axisLine: { lineStyle: { color: frequencyColor } },
            },
            { // 左侧第二个轴（如电流）
                type: 'value',
                name: '电流(A)',
                position: 'left',
                axisLine: { lineStyle: { color: EAColor } },
                splitLine: { show: false }
            }
        ],
        series: [
            {
                symbol: 'none',
                name: '频率',
                type: 'line',
                data: options.frequency.map(item => item.value),
                yAxisIndex: 0, // 绑定第一个左侧轴
                lineStyle: { color: frequencyColor },
                itemStyle: { color: frequencyColor },
            },
            {
                symbol: 'none',
                name: '电流',
                type: 'line',
                data: options.EA.map(item => item.value),
                yAxisIndex: 1, // 绑定第二个左侧轴
                lineStyle: { color: EAColor },
                itemStyle: { color: EAColor },
            },
        ]
    };

    return option
}

const getOption2 = (options) => {
    const temperatureColor = '#FF6B6B';
    const speedColor = '#9A7DFF';

    const option = {
        ...getCommonOption('温度速度监控', options.temperature.map(item => item.time)),
        legend: { data: ['温度', '输送速度'], bottom: 0, textStyle: { color: '#fff', fontSize: 14 } },
        yAxis: [
            { // 右侧第一个轴（如温度）
                type: 'value',
                name: '温度\n (°C)',
                position: 'left',
                axisLine: { lineStyle: { color: temperatureColor } },
                splitLine: { show: false },
                min: 0,
                max: 150,
            },
            { // 右侧第二个轴（如速度）
                type: 'value',
                name: '速度\n (m/s)',
                position: 'right',
                axisLine: { lineStyle: { color: speedColor } },
            }
        ],
        series: [
            {
                name: '温度',
                type: 'line',
                data: options.temperature.map(item => item.value),
                yAxisIndex: 0, // 绑定第二个左侧轴
                lineStyle: { color: temperatureColor },
                itemStyle: { color: temperatureColor },
                animationDuration: 0,
                symbol: 'none',
            },
            {
                name: '输送速度',
                type: 'line',
                data: options.speed.map(item => item.value),
                yAxisIndex: 1, // 绑定第二个左侧轴
                lineStyle: { color: speedColor },
                itemStyle: { color: speedColor },
                smooth: true,
                animationDuration: 1000,
                animationEasing: 'linear',
                symbol: 'none',
            },
        ]
    };

    return option
}

const chartStyle = {
    height: '315px',
    marginTop: '30px'
}

const getRandomEA = () => {
    return randomInRange([
        { min: 15, max: 23, weight: 5 },
        { min: 23, max: 28, weight: 80 },
        { min: 28, max: 35, weight: 15 }
    ])
}

const getRandomFrequency = () => {
    return randomInRange([
        { min: 30, max: 40, weight: 5 },
        { min: 40, max: 49, weight: 5 },
        { min: 49, max: 50, weight: 90 }
    ], 0)
}

const getTemperature = () => {
    return randomInRange([
        { min: 0, max: 60, weight: 2 },
        { min: 60, max: 80, weight: 18 },
        { min: 80, max: 100, weight: 75 },
        { min: 100, max: 150, weight: 5 }
    ])
}

const getSpeed = () => {
    return randomInRange([
        { min: 0.5, max: 0.9, weight: 5 },
        { min: 0.9, max: 1.1, weight: 90 },
        { min: 1.1, max: 1.5, weight: 5 }
    ])
}

const timeSplit = 1;

const initialEA = Array.from({ length: 60 }, (_, i) => {
    return {
        value: getRandomEA(),
        time: dayjs().subtract((59 - i) * timeSplit, 'second').format('HH:mm:ss')
    }
})

const initialFrequency = Array.from({ length: 60 }, (_, i) => ({
    value: getRandomFrequency(),
    time: dayjs().subtract((59 - i) * timeSplit, 'second').format('HH:mm:ss')
}))

const initialTemperature = Array.from({ length: 60 }, (_, i) => ({
    value: getTemperature(),
    time: dayjs().subtract((59 - i) * timeSplit, 'second').format('HH:mm:ss')
}))

const initialSpeed = Array.from({ length: 60 }, (_, i) => ({
    value: getSpeed(),
    time: dayjs().subtract((59 - i) * timeSplit, 'second').format('HH:mm:ss')
}))

export default () => {
    const [EA, setEA] = useState(initialEA);
    const [frequency, setFrequency] = useState(initialFrequency);
    const [temperature, setTemperature] = useState(initialTemperature);
    const [speed, setSpeed] = useState(initialSpeed);

    const [option, setOption] = useState(getOption({
        EA: initialEA,
        frequency: initialFrequency,
    }));
    const [option2, setOption2] = useState(getOption2({
        temperature: initialTemperature,
        speed: initialSpeed,
    }));

    useEffect(() => {
        const timer = setInterval(() => {
            setEA((prev) => {
                const newEA = [...prev, { value: getRandomEA(), time: dayjs().format('HH:mm:ss') }]
                return newEA.slice(newEA.length - 60)
            })
            setFrequency((prev) => {
                const newFrequency = [...prev, { value: getRandomFrequency(), time: dayjs().format('HH:mm:ss') }]
                return newFrequency.slice(newFrequency.length - 60)
            })
            setTemperature((prev) => {
                const newTemperature = [...prev, { value: getTemperature(), time: dayjs().format('HH:mm:ss') }]
                return newTemperature.slice(newTemperature.length - 60)
            })
            setSpeed((prev) => {
                const newSpeed = [...prev, { value: getSpeed(), time: dayjs().format('HH:mm:ss') }]
                return newSpeed.slice(newSpeed.length - 60)
            })
        }, timeSplit * 1000);

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        setOption(getOption({
            EA,
            frequency,
        }))
        setOption2(getOption2({
            temperature,
            speed,
        }))
    }, [EA, frequency, temperature, speed])

    return (
        <Container>
            <h1>电动机状态</h1>
            <Chart option={option} style={chartStyle} />
            <Chart option={option2} style={chartStyle} />
        </Container>
    )
}