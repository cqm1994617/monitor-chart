import React from 'react'
import styled from 'styled-components'

const Container = styled.div `
    video {
        display: block;
        width: 100%;
        margin-bottom: 1vw;
        height: 18vw;
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