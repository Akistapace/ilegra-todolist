import { UseFormRegisterReturn } from 'react-hook-form';
import style from './style.module.css';

interface Props {
	placeholder: string;
	type: string;
	children?: React.ReactNode;
	register?: UseFormRegisterReturn; // Tipo correto para o register
}

export const Input = ({ children, placeholder, type, register }: Props) => {
	return (
		<div className={style.inputField}>
			<input
				className={style.input}
				placeholder={placeholder}
				type={type}
				{...(register || {})}
			/>
			{children}
		</div>
	);
};

