import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
    background: #ff9000;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    font-weight: 500;
    margin: 24px 0;
    width: 100%;
    transition: background 0.2s;

    &:hover {
        background: ${shade(0.2, '#ff9000')};
    }
`;
