import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Container, Content, AnimationContainer, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import getErrorsValidation from '../../utils/getErrorsValidation';
import { ToastType } from '../../components/ToastContainer/Toast/styles';
import api from '../../services/api';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    // const history = useHistory();
    const handleOnSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            setLoading(true);
            formRef.current?.setErrors({});
            try {
                console.log(data.email);
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('O e-mail é obrigatório')
                        .email('Digite um e-mail válido'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await api.post('/password/forgot', { email: data.email });
                addToast({
                    title: 'E-mail de recuperação de senha',
                    description:
                        'Enviamos um e-mail com o link para recuperação de senha. Por favor, cheque sua caixa de entrada.',
                    type: ToastType.success,
                });
                // history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getErrorsValidation(err);
                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    title: 'Erro na recuperação de senha',
                    description: `Houve um erro ao tentar recuperar sua senha. Tente novamente.`,
                    type: ToastType.error,
                });
            } finally {
                setLoading(false);
            }
        },
        [addToast],
    );
    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer>
                        <img src={logoImg} alt="GoBarber Logo" />

                        <Form ref={formRef} onSubmit={handleOnSubmit}>
                            <h1>Recupere sua senha</h1>
                            <Input
                                type="email"
                                icon={FiMail}
                                name="email"
                                id="email"
                                placeholder="E-mail"
                            />
                            <Button loading={loading} type="submit">
                                Recuperar
                            </Button>
                        </Form>

                        <Link to="/">
                            <FiLogIn size={20} />
                            Voltar para o Login
                        </Link>
                    </AnimationContainer>
                </Content>
                <Background />
            </Container>
        </>
    );
};
export default ForgotPassword;
