import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import z from 'zod';
import style from './style.module.css';
import useAuthControl from '../../store/userAuthControl';
import { useNavigate } from 'react-router-dom';

const userSchema = z.object({
	name: z
		.string()
		.min(1, 'Nome é obrigatório')
		.transform(
			(name) =>
				name
					.trim()
					.split(' ')
					.map((word) => {
						return word.charAt(0).toUpperCase() + word.slice(1);
					})
					.join(' ') // Transforma em maiusculo cada letra inicial
		),
	email: z.string().email('Formato de email inválido'),
	password: z.string().min(6, 'É necessário no mínimo 6 caracteres'),
});

type formData = z.infer<typeof userSchema>;

export const FormRegister = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<formData>({
		resolver: zodResolver(userSchema),
	});
	const navigate = useNavigate();
	const registerUser = useAuthControl((state) => state.register);

	const onSubmit = (data: formData) => {
		/* istanbul ignore next */
		registerUser(data);
		navigate('/login');
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={style.form}
			data-testid='form-register'
		>
			<Input
				label='Nome'
				placeholder='Digite...'
				type='text'
				register={register('name')}
				data-testid={'name'}
			>
				{errors.name && <span>{errors.name.message}</span>}
			</Input>
			<Input
				label='Email'
				placeholder='Digite...'
				type='email'
				register={register('email')}
				data-testid={'email'}
			>
				{errors.email && <span>{errors.email.message}</span>}
			</Input>
			<Input
				label='Senha'
				placeholder='Digite...'
				type='password'
				register={register('password')}
				data-testid={'password'}
			>
				{errors.password && <span>{errors.password.message}</span>}
			</Input>
			<Button type='submit' variant='large' loading={true}>
				Entrar
			</Button>
		</form>
	);
};

