import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { randomInRange } from '@/utils/index'

const Container = styled.div`
    border: 1px solid #3486da;
    box-sizing: border-box;
    padding: 20px;
    background-color: #031d52;
    margin-bottom: 20px;
    h1 {
        font-size: 24px;
        margin-bottom: 10px;
    }
`

const StatuList = styled.div`
    display: flex;
    justify-content: space-between;
`

const StatuItem = styled.div`
    h2 {
        font-size: 16px;
        margin-bottom: 4px;
    }
    color: #1A233D;
    padding: 10px 0;
    border-radius: 10px;
    color: rgb(147, 185, 222);
    font-size: 20px;
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