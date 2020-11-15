import styled from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImage from '../../assets/signin-background.png';

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

    form {
        margin: 80px 0;
        width: 340px;

        h1 {
            margin-bottom: 24px;
        }

        input {
            background: #232129;
            border: 2px solid #232129;
            border-radius: 10px;
            color: #f4ede8;
            padding: 16px;
            width: 90%;

            & + input {
                margin-top: 8px;
            }
        }

        button {
            background: #ff9000;
            height: 56px;
            border-radius: 10px;
            border: 0;
            padding: 0 16px;
            color: #312e38;
            font-weight: 500;
            margin: 24px 0;
            width: 100%;

            &:hover {
                background: ${shade(0.2, '#ff9000')};
            }
        }

        a {
            color: #f4ede8;
            display: block;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }

    > a {
        align-items: center;
        color: #ff9900;
        display: flex;
        text-decoration: none;
        transition: color 0.2s;

        svg {
            margin-right: 16px;
        }
        &:hover {
            color: ${shade(0.2, '#ff9900')};
        }
    }
`;

export const Background = styled.div`
    background: url(${signInBackgroundImage}) no-repeat center;
    background-size: cover;
    flex: 1;
`;
