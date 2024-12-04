import { Spinner } from '../Spinner';
import style from './style.module.css';

type Props = {
	variant?: 'small' | 'medium' | 'large';
	children: React.ReactNode;
	loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Adiciona atributos padrão de um botão

export const Button = ({ children, loading, variant = 'small', ...rest }: Props) => {
	return (
		<button className={`${style.button} ${style[variant]}`} {...rest}>
			{children}
			{loading && (
				<span className={style.loading}>
					<Spinner />
				</span>
			)}
		</button>
	);
};

