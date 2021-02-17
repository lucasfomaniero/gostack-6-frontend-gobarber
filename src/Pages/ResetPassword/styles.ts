import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpImageBackground from '../../assets/signup-background.png';

export const Container = styled.div`
    align-items: stretch;
    display: flex;
    height: 100vh;
`;

export const Content = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: 700px;
    place-content: center;
    text-align: center;
    width: 100%;
`;

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    },
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    place-content: center;
    text-align: center;
    animation: ${appearFromRight} 1s;

    form {
        margin: 80px 0;
        width: 340px;

        h1 {
            margin-bottom: 24px;
        }

        a {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            color: #f4ede8;
            text-decoration: none;
            transition: color 0.2s;

            svg {
                display: block;
                margin-right: 16px;
            }
            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }
`;

export const Background = styled.div`
    background: url(${signUpImageBackground}) no-repeat center;
    background-size: cover;
    flex: 1;
`;
