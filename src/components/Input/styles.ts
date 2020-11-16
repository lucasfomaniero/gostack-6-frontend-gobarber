import styled from 'styled-components';

export const Container = styled.div`
    background: #232129;
    border: 2px solid #232129;
    border-radius: 10px;
    color: #666360;
    display: flex;
    align-items: center;
    height: 56px;
    width: 100%;

    input {
        color: #f4ede8;

        border: 0;
        flex: 1;
        background: transparent;
    }

    svg {
        margin: 16px;
    }

    & + div {
        margin-top: 8px;
    }
`;
