import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import z from 'zod';
import style from './style.module.css';

const userSchema = z.object({
	name: z
		.string()
		.min(1, 'Nome é obrigatório')
		.transform((name) =>
			name
				.trim()
				.split(' ')
				.map((word) => {
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join(' ')
		),
	email: z.string().email('Formato de email inválido'),
	password: z.string().min(6, 'É necessário no mínimo 6 caracteres'),
});

type formData = z.infer<typeof userSchema>;

export const FormLogin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<formData>({
		resolver: zodResolver(userSchema),
	});

	const createUser = (data: formData) => {
		console.log('createUser', data);
	};

	return (
		<form onSubmit={handleSubmit(createUser)} className={style.form}>
			<Input placeholder='Email' type='email' register={register('email')}>
				{errors.email && <span>{errors.email.message}</span>}
			</Input>
			<Input placeholder='Senha' type='password' register={register('password')}>
				{errors.password && <span>{errors.password.message}</span>}
			</Input>
			<Button type='submit' loading={false}>
				Entrar
			</Button>
		</form>
	);
};

