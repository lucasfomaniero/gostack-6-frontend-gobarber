import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getErrorsValidation from '../../utils/getErrorsValidation';
import { ToastType } from '../../components/ToastContainer/Toast/styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface UserData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const { addToast } = useToast();
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: UserData) => {
            formRef.current?.setErrors({});
            try {
                const schema = Yup.object().shape({
                    name: Yup.string().required('O nome é obrigatório'),
                    email: Yup.string()
                        .required('O e-mail é obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().min(
                        6,
                        'A senha deve conter o mínimo de 6 dígitos',
                    ),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await api.post<UserData>('/users', data);
                addToast({
                    title: 'Cadastro realizado com sucesso!',
                    description: 'Você já pode fazer login no GoBarber!',
                    type: ToastType.success,
                });
                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getErrorsValidation(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                addToast({
                    title: 'Erro ao realizar o cadastro',
                    description:
                        'Ocorreu um erro ao realizar o cadastro. Tente novamente.',
                    type: ToastType.error,
                });
            }
        },
        [addToast, history],
    );

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <AnimationContainer>
                        <img src={logoImg} alt="GoBarber Logo" />

                        <Form ref={formRef} onSubmit={handleSubmit}>
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
                    </AnimationContainer>
                </Content>
            </Container>
        </>
    );
};
export default SignUp;
