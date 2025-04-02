import React from 'react'
import styled from 'styled-components'
import { Header } from './components/Header'
import { Page } from './components/Page'
import MotorChart from './components/MotorChart'
import WindPressureChart from './components/WindPressureChart'
import SwitchChart from './components/SwitchChart'
import StatisticsChart from './components/StatisticsChart'
import WindElectricChart from './components/WindElectricChart'
import SendingStatus from './components/SendingStatus'
import VideoPlayer from './components/VideoPlayer'
import video1 from '@/assets/video/1.mp4'
import video2 from '@/assets/video/2.mp4'

const Body = styled.div`
    margin: 40px 0px;
    display: flex;
    flex-wrap: wrap;
`

const Column = styled.div`
    width: ${props => props.width};
    box-sizing: border-box;
    padding: 10px;
`

export const Home = () => {

    return (
        <Page>
            <Header />
            <Body>
                <Column width={'32%'}>
                    <SwitchChart />
                    <MotorChart />
                </Column>
                <Column width={'36%'}>
                    <StatisticsChart />
                    <VideoPlayer source={video1} />
                    <VideoPlayer source={video2} />
                </Column>
                <Column width={'32%'}>
                    <SendingStatus />
                    <WindElectricChart />
                    <WindPressureChart />
                </Column>
            </Body>
        </Page>
    )
}
