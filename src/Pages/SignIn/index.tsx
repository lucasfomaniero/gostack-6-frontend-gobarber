import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface LoginData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    function handleOnSubmit(data: LoginData): void {
        console.log(data);
    }
    return (
        <>
            <Container>
                <Content>
                    <img src={logoImg} alt="GoBarber Logo" />

                    <Form onSubmit={handleOnSubmit}>
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
                        <Button type="submit">Entrar</Button>
                        <Link to="/">Esqueci minha senha</Link>
                    </Form>

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
