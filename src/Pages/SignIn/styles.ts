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
