import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    box-sizing: border-box;
    padding: 0 30px;
`;

export const Page = ({ children }) => {

    return (
        <Container>
            {children}
        </Container>
    )

}