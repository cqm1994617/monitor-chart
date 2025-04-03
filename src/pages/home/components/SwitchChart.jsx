import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
    border: 1px solid #3486da;
    box-sizing: border-box;
    padding: 1.02vw;
    background-color: #031d52;
    margin-bottom: 1vw;
    h1 {
        font-size: 1.1vw;
    }
`

const StatuList = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1.7vw 1vw 1vw;
`

const breathHealthy = keyframes`
    0% { opacity: 0.8; box-shadow: 0 0 10px rgba(74, 216, 122, 0.5); }
    50% { opacity: 1; box-shadow: 0 0 30px rgba(74, 216, 122, 0.8); }
    100% { opacity: 0.8; box-shadow: 0 0 10px rgba(74, 216, 122, 0.5); }
`

const breathUnhealthy = keyframes`
    0% { opacity: 0.7; box-shadow: 0 0 15px rgba(255, 68, 68, 0.6); }
    50% { opacity: 1; box-shadow: 0 0 40px rgba(255, 68, 68, 1); }
    100% { opacity: 0.7; box-shadow: 0 0 15px rgba(255, 68, 68, 0.6); }
`

const StatuItem = styled.div`
    h2 {
        font-size: 0.9vw;
        margin-bottom: 0.4vw;
    }
    p {
        font-size: 0.9vw;
    }
    color: #1A233D;
    padding: 0.5vw 0.9vw;
    border-radius: 0.5vw;
    text-align: center;
    background-color: ${props => props.status === 1 ? '#4AD87A' : '#FF4444'};
    animation: 
        ${props => props.status === 1 ? breathHealthy : breathUnhealthy} 
        ${props => props.status === 1 ? '3s' : '1s'} 
        infinite;
`

export default () => {

    const [status, setStatus] = useState([
        { id: 1, name: '左跑偏报警', status: '正常' },
        { id: 2, name: '右跑偏报警', status: '正常' },
        { id: 3, name: '堵料报警', status: '正常' },
        { id: 4, name: '打滑报警', status: '异常' },
    ])

    return (
        <Container>
            <h1>报警开关</h1>
            <StatuList>
                {
                    status.map((item) => {
                        return (
                            <StatuItem key={item.id} status={ item.status === '正常' ? 1 : 0 }>
                                <h2>{item.name}</h2>
                                <p>{item.status}</p>
                            </StatuItem>
                        )
                    })
                }
            </StatuList>
        </Container>
    )
}