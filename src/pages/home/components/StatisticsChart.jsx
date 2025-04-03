import React, { useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin-bottom: 5.1vw;
`

const ContainerItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2vw;
`

const StatisticsItem = styled.div`
    display: flex;
    h2 {
        font-size: 1.5vw;
        margin: 0 0.4vw;
        color:rgb(147, 185, 222);
    }
`

const NumberContainer = styled.div`
    display: flex;
    div {
        color: #fff;
        background-color: #242d96;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.1vw;
        font-size: 1.3vw;
        font-weight: bold;
        padding: 0.1vw 0.3vw;
    }
`

function numberToArray(num) {
    return num.toString().split('').map(Number)
}

export default () => {

    const [saveElectric, setSaveElectric] = useState(1201)
    const [runTime, setRunTime] = useState(853)

    useEffect(() => {
        const timer = setInterval(() => {
            setSaveElectric(prev => prev + 1)
        }, 1000)

        return () => {
            clearInterval(timer);
        }
    }, [])

    const saveElectricList = useMemo(() => {
        return numberToArray(saveElectric)
    }, [saveElectric])

    const saveRunTimeList = useMemo(() => {
        return numberToArray(runTime)
    })

    return (
        <Container>
            <ContainerItem>
                <StatisticsItem>
                    <h2>已节约电力</h2>
                    <NumberContainer>
                        {saveElectricList.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </NumberContainer>
                    <h2>kWh</h2>
                </StatisticsItem>
                <StatisticsItem>
                    <h2>已运转</h2>
                    <NumberContainer>
                        {saveRunTimeList.map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </NumberContainer>
                    <h2>小时</h2>
                </StatisticsItem>
            </ContainerItem>
            <ContainerItem>
                <StatisticsItem>
                    <h2>设备健康度</h2>
                    <NumberContainer>
                        {([9, 5]).map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </NumberContainer>
                    <h2>分</h2>
                </StatisticsItem>
                <StatisticsItem>
                    <h2>输送物料距离</h2>
                    <NumberContainer>
                        {([6, 4]).map((item, index) => (
                            <div key={index}>{item}</div>
                        ))}
                    </NumberContainer>
                    <h2>米</h2>
                </StatisticsItem>
            </ContainerItem>
        </Container>
    )
}