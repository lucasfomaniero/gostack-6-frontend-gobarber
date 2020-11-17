import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    align-items: center;
    background: #232129;
    border: 2px solid #232129;
    border-radius: 10px;
    color: #666360;
    display: flex;
    font-size: 14px;
    height: 56px;
    width: 100%;
    ${props =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `}

    ${props =>
        props.isFocused &&
        css`
            border: 2px solid #ff9000;
            color: #ff9000;
        `}

    ${props =>
        props.isFilled &&
        css`
            color: #ff9000;
        `}

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

export const Error = styled(Tooltip)`
    height: 20px;
    span {
        background-color: #c53030;
        color: #fff;

        &::before {
            border-color: #c53030 transparent;
        }
    }
    svg {
        margin: 0 8px;
    }
`;
