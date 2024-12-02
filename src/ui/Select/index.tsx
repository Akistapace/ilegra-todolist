import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import style from './style.module.css';

interface Option {
	label: string;
	value: string;
}

interface Props {
	children?: React.ReactNode;
	register?: UseFormRegisterReturn; // Tipo correto para o register
	options: Option[];
	label?: string;
}

export const Select: React.FC<Props> = ({ children, register, options, label }) => {
	return (
		<div className={style.select}>
			{label && <label>{label}</label>}
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

