import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
    video {
        display: block;
        width: 100%;
        margin-bottom: 20px;
        height: 373px;
        object-fit: cover;
    }
`

export default ({ source }) => {
    return (
        <Container >
            <video controls autoPlay muted loop>
                <source src={source} type="video/mp4" />
            </video>
        </Container>
    )
}