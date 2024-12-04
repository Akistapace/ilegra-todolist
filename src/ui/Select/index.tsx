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
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Select = ({ children, register, options, label }: Props) => {
	return (
		<div className={style.select}>
			{label && <label className={style.label}>{label}</label>}
			<select {...(register || {})}>
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

