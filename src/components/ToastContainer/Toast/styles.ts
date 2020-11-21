import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
// eslint-disable-next-line no-shadow
export enum ToastType {
    info = 'info',
    success = 'success',
    error = 'error',
}

interface ToastProps {
    color: ToastType;
    hasDescription: boolean;
}

const toastType = {
    info: css`
        background: '#ebf8f8';
        color: '#3172b7';
    `,
    error: css`
        background: #fddede;
        color: #c53030;
    `,
    success: css`
        background: #e6fffa;
        color: #2e656a;
    `,
};

export const ToastContent = styled(animated.div)<ToastProps>`
    width: 360px;
    display: flex;
    position: relative;
    padding: 16px 30px 16px 16px;
    border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    background: #ebf8f8;
    color: #3172b7;

    & + div {
        margin-top: 8px;
    }

    ${props => toastType[props.color || 'success']}

    > svg {
        margin: 4px 12px 0 0;
    }

    div {
        flex: 1;

        p {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.8;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        right: 16px;
        top: 16px;
        background: transparent;
        color: inherit;
        border: none;
    }

    ${props =>
        !props.hasDescription &&
        css`
            align-items: center;
            svg {
                margin-top: 0;
            }
        `}
`;
