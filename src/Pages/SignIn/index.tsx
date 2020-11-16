import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
    return (
        <>
            <Container>
                <Content>
                    <img src={logoImg} alt="GoBarber Logo" />

                    <form>
                        <h1>Faça seu logon</h1>
                        <Input
                            type="email"
                            icon={FiMail}
                            name="email"
                            id="email"
                            placeholder="E-mail"
                        />
                        <Input
                            type="password"
                            icon={FiLock}
                            name="password"
                            id="password"
                            placeholder="Senha"
                        />
                        <Button type="button">Entrar</Button>
                        <Link to="/">Esqueci minha senha</Link>
                    </form>

                    <Link to="/signup">
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
