import { ReactNode } from 'react';
import style from './style.module.css';

interface Props {
	children: ReactNode;
	type?: string;
}
export const Cell = ({ children, type = 'tr' }: Props) => {
	return type === 'th' ? (
		<th className={style.th}>{children}</th>
	) : (
		<td className={style.td}>{children}</td>
	);
};

