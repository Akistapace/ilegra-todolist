import { Spinner } from '../Spinner';
import style from './style.module.css';

type Props = {
	children: React.ReactNode;
	loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Adiciona atributos padrão de um botão

export const Button = ({ children, loading, ...rest }: Props) => {
	return (
		<button className={style.button} {...rest}>
			{children}
			{loading && (
				<span className={style.loading}>
					<Spinner />
				</span>
			)}
		</button>
	);
};

