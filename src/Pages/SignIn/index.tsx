import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getErrorsValidation from '../../utils/getErrorsValidation';
import { ToastType } from '../../components/ToastContainer/Toast/styles';

interface LoginData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();
    const handleOnSubmit = useCallback(
        async (data: LoginData) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('O e-mail é obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().required('A senha é obrigatória'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await signIn(data.email, data.password);
                addToast({
                    title: 'Login efetuado com sucesso!',
                    type: ToastType.success,
                });
                history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getErrorsValidation(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                addToast({
                    title: 'Erro na autenticação',
                    description:
                        'Ocorreu um erro na autenticação. Tente novamente.',
                    type: ToastType.error,
                });
            }
        },
        [signIn, addToast, history],
    );
    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer>
                        <img src={logoImg} alt="GoBarber Logo" />

                        <Form ref={formRef} onSubmit={handleOnSubmit}>
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
                    </AnimationContainer>
                </Content>
                <Background />
            </Container>
        </>
    );
};
export default SignIn;
