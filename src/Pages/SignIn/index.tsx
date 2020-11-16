import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import background from '../../assets/signin-background.png';
import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => {
    return (
        <>
            <Container>
                <Content>
                    <img src={logoImg} alt="GoBarber Logo" />

                    <form>
                        <h1>Faça seu logon</h1>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Senha"
                        />
                        <button type="submit">Entrar</button>
                        <Link to="/">Esqueci minha senha</Link>
                    </form>

                    <Link to="/">
                        <FiLogIn size={20} />
                        Criar conta
                    </Link>
                </Content>
                <Background />
            </Container>
        </>
    );
};
export default SignIn;
