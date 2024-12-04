import { UseFormRegisterReturn } from 'react-hook-form';
import style from './style.module.css';

type Props = {
	placeholder?: string;
	label?: string;
	type: string;
	children?: React.ReactNode;
	register?: UseFormRegisterReturn; // Tipo correto para o register
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	children,
	label,
	placeholder,
	type,
	register,
	...rest
}: Props) => {
	return (
		<div className={style.inputField}>
			<label className={style.label}>{label}</label>
			<input
				className={style.input}
				placeholder={placeholder}
				type={type}
				{...(register || {})}
				{...rest}
			/>
			{children}
		</div>
	);
};

