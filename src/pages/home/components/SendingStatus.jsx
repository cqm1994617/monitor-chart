import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { randomInRange } from '@/utils/index'

const Container = styled.div`
    border: 1px solid #3486da;
    box-sizing: border-box;
    padding: 1.02vw;
    background-color: #031d52;
    margin-bottom: 1vw;
    h1 {
        font-size: 1.1vw;
        margin-bottom: 1.2vw;
    }
`

const StatuList = styled.div`
    display: flex;
    justify-content: space-between;
`

const StatuItem = styled.div`
    color: #1A233D;
    padding: 0.64vw 0;
    border-radius: 10px;
    color: rgb(147, 185, 222);
    font-size: 1vw;
`

const getWeight = () => {
    return randomInRange([
        { min: 160, max: 190, weight: 10 },
        { min: 190, max: 210, weight: 80 },
        { min: 210, max: 250, weight: 10 },
    ])
}

export default () => {
    const [weight, setWeight] = useState(getWeight())

    useEffect(() => {
        const interval = setInterval(() => {
            setWeight(getWeight())
        }, 5000)

        return () => clearInterval(interval)
    })

    return (
        <Container>
            <h1>输送物料情况</h1>
            <StatuList>
            <StatuItem>物料输送量：{weight}吨/小时</StatuItem>
                <StatuItem>物料比重：1kg/m³</StatuItem>
            </StatuList>
            <StatuList>
                <StatuItem>物料类型：粉料</StatuItem>
                <StatuItem>输送带宽：1米</StatuItem>
            </StatuList>
        </Container>
    )
}