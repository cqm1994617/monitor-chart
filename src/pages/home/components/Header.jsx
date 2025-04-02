import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Container = styled.div`
    position: relative;
`

const CompanyName = styled.div`
    position: absolute;
    bottom: 15px;
    left: 1vw;
    font-size: 26px;
    background: linear-gradient(to right, #187bcf, #36d9ff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
`

const Title = styled.div`
    box-sizing: border-box;
    padding: 20px 15px 10px;
    font-size: 60px;
    color: rgba(255, 255, 255, 0.85);
    color: #399bff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-weight: bold;
    text-align: center;
`

const Time = styled.div`
    position: absolute;
    bottom: 15px;
    right: 1vw;
    font-size: 36px;
    color: rgba(255, 255, 255, 0.7);
    font-family: electronStyle;
`

export const Header = () => {
    const [time, setTime] = useState(dayjs().format('YYYY/MM/DD HH:mm:ss'))

    useEffect(() => {
        setInterval(() => {
            setTime(dayjs().format('YYYY/MM/DD HH:mm:ss'));
        }, 1000);
    }, []);

    return (
        <Container>
            <CompanyName>璋晟（杭州）机械设备科技有限公司</CompanyName>
            <Title>气悬浮输送系统监控平台</Title>
            <Time>{time}</Time>
        </Container>
    )
}
