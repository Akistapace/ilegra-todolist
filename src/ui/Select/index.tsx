import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import style from './style.module.css';

interface Option {
	label: string;
	value: string;
}

type Props = {
	children?: React.ReactNode;
	register?: UseFormRegisterReturn; // Tipo correto para o register
	options: Option[];
	label?: string;
} & React.InputHTMLAttributes<HTMLSelectElement>;

export const Select = ({ children, register, options, label, ...rest }: Props) => {
	return (
		<div className={style.select}>
			{label && <label className={style.label}>{label}</label>}
			<select {...(register || {})} {...rest}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{children}
		</div>
	);
};

