import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';

interface UserData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    function handleSubmit(data: UserData): void {
        setUser(data);
        console.log(user);
    }

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <img src={logoImg} alt="GoBarber Logo" />

                    <Form onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
                        <Input
                            type="text"
                            icon={FiUser}
                            name="name"
                            id="name"
                            placeholder="Nome"
                        />
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
                        <Button type="submit">Cadastrar</Button>
                        <Link to="/">
                            <FiArrowLeft size={20} />
                            Voltar para o Login
                        </Link>
                    </Form>
                </Content>
            </Container>
        </>
    );
};
export default SignUp;
