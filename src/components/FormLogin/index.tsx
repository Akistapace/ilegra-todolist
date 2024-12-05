import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import useAuthControl from '../../store/userAuthControl';
import z from 'zod';
import style from './style.module.css';

const userSchema = z.object({
	email: z.string().email('Formato de email inválido'),
	password: z.string().min(6, 'É necessário no mínimo 6 caracteres'),
});

type formData = z.infer<typeof userSchema>;

export const FormLogin = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<formData>({
		resolver: zodResolver(userSchema),
	});

	const navigate = useNavigate();
	const login = useAuthControl();

	const onSubmit = (data: formData) => {
		const error = login.login(data.email, data.password);
		if (error) {
			setErrorMessage(error);
		} else {
			navigate('/to-do-list');
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={style.form}
			data-testid='form-login'
		>
			<Input
				label='Email'
				placeholder='Digite...'
				type='email'
				register={register('email')}
				data-testid='email'
			>
				{errors.email && <span className='error'>{errors.email.message}</span>}
			</Input>

			<Input
				label='Senha'
				placeholder='Digite...'
				type='password'
				register={register('password')}
				data-testid='password'
			>
				{errors.password && (
					<span className='error'>{errors.password.message}</span>
				)}
			</Input>

			{errorMessage && <span className='error'>{errorMessage}</span>}

			<Button type='submit' variant='large' loading={false}>
				Entrar
			</Button>
		</form>
	);
};

